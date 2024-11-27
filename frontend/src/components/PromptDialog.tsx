import React, { useState } from 'react';
import { useComponentGenerator } from '../hooks/useComponentGenerator';
import { ErrorMessage } from './ErrorMessage';
import { LoadingSpinner } from './LoadingSpinner';

interface PromptDialogProps {
  onClose: () => void;
  onGenerate: (prompt: string) => Promise<void>;
}

export function PromptDialog({ onClose, onGenerate }: PromptDialogProps) {
  const [prompt, setPrompt] = useState('');
  const { isLoading, error } = useComponentGenerator();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onGenerate(prompt);
    setPrompt('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit Component</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-32 p-2 border rounded mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe what you want this component to contain..."
            disabled={isLoading}
          />

          {error && <ErrorMessage message={error} />}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <LoadingSpinner /> : 'Generate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
