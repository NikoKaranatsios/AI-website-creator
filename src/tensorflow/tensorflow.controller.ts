import { Controller, Post, Get, Body } from '@nestjs/common';
import { TensorflowService } from './tensorflow.service';

class ProcessTextDto {
  text: string;
}

@Controller('api')
export class TensorflowController {
  constructor(private readonly tensorflowService: TensorflowService) {}

  @Post('process')
  async processText(@Body() processTextDto: ProcessTextDto) {
    const result = await this.tensorflowService.processText(processTextDto.text);
    return {
      reactElement: result.component,
      confidence: result.similarity,
    };
  }

  @Get('health')
  getHealth() {
    return this.tensorflowService.getHealth();
  }
}
