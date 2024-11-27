import { useState, useCallback } from 'react';
import { generateComponent as apiGenerateComponent } from '../services/api';
import type { GenerateComponentResponse } from '../services/api';

export interface ModelInput {
  text: string;
}

export type ModelOutput = GenerateComponentResponse;

export function useComponentGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateComponent = useCallback(async (input: ModelInput): Promise<ModelOutput | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiGenerateComponent(input);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate component';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    generateComponent,
    isLoading,
    error
  };
}