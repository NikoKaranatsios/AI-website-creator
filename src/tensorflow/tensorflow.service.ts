import { Injectable, OnModuleInit } from '@nestjs/common';
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import * as fs from 'fs/promises';
import * as path from 'path';

enum ComponentColors {
  BLUE = 'bg-blue-500 hover:bg-blue-600',
  RED = 'bg-red-500 hover:bg-red-600',
  GREEN = 'bg-green-500 hover:bg-green-600',
  YELLOW = 'bg-yellow-500 hover:bg-yellow-600',
}

interface TrainingPair {
  prompt: string;
  component: any;
}

interface ProcessResult {
  component: any;
  similarity: number;
}

@Injectable()
export class TensorflowService implements OnModuleInit {
  private useModel: any;
  private trainingData: TrainingPair[] = [];
  private promptEmbeddings: number[][] = [];
  private componentMap: Map<number, any> = new Map();

  async onModuleInit() {
    // Initialize TensorFlow backend
    await tf.setBackend('cpu');
    await tf.ready();
    console.log('TensorFlow backend initialized:', tf.getBackend());
    
    await this.loadTrainingData();
    await this.initializeModel();
  }

  private async loadTrainingData(): Promise<void> {
    try {
      const rawData = await fs.readFile(
        path.join(__dirname, '..', 'data', 'trainingData.json'),
        'utf8',
      );
      this.trainingData = JSON.parse(rawData).pairs;
      console.log('Training data loaded successfully');
    } catch (error) {
      console.error('Error loading training data:', error);
      throw error;
    }
  }

  private async initializeModel(): Promise<void> {
    try {
      this.useModel = await use.load();
      console.log('Universal Sentence Encoder loaded successfully');

      const prompts = this.trainingData.map((pair) => pair.prompt);
      const embeddings = await this.useModel.embed(prompts);
      this.promptEmbeddings = await embeddings.array();

      this.trainingData.forEach((pair, index) => {
        this.componentMap.set(index, pair.component);
      });

      console.log('Training data processed successfully');
    } catch (error) {
      console.error('Error initializing model:', error);
      throw error;
    }
  }

  private findMostSimilarComponent(
    inputEmbedding: number[],
  ): { component: any; similarity: number } {
    let maxSimilarity = -1;
    let mostSimilarIndex = 0;

    this.promptEmbeddings.forEach((embedding, index) => {
      const similarity = this.cosineSimilarity(inputEmbedding, embedding);
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        mostSimilarIndex = index;
      }
    });

    return {
      component: this.componentMap.get(mostSimilarIndex),
      similarity: maxSimilarity,
    };
  }

  private customizeComponent(component: any, text: string): any {
    const customized = JSON.parse(JSON.stringify(component));

    const textMatch = text.match(/["']([^"']+)["']/);
    if (textMatch && customized.children) {
      customized.children = [textMatch[1]];
    }

    Object.entries(ComponentColors).forEach(([color, className]) => {
      if (text.toLowerCase().includes(color.toLowerCase())) {
        if (customized.props.className) {
          customized.props.className = customized.props.className.replace(
            /bg-\w+-500/g,
            className,
          );
        }
      }
    });

    return customized;
  }

  async processText(text: string): Promise<ProcessResult> {
    const embedding = await this.useModel.embed([text]);
    const inputEmbedding = (await embedding.array())[0];
    const { component, similarity } = this.findMostSimilarComponent(inputEmbedding);

    const customized = similarity > 0.5 ? this.customizeComponent(component, text) : component;

    return {
      component: customized,
      similarity: similarity,
    };
  }

  getHealth(): { status: string; modelLoaded: boolean; trainingDataLoaded: boolean } {
    return {
      status: 'healthy',
      modelLoaded: !!this.useModel,
      trainingDataLoaded: this.trainingData.length > 0,
    };
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }
}
