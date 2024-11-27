const API_URL = import.meta.env.VITE_API_URL;
const MAX_RETRIES = parseInt(import.meta.env.VITE_MAX_RETRIES || '3');
const RETRY_DELAY = parseInt(import.meta.env.VITE_RETRY_DELAY || '1000');

export interface ComponentProps {
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export interface ComponentSpec {
  type: string;
  props: ComponentProps;
  children: (ComponentSpec | string)[];
}

export interface GenerateComponentRequest {
  text: string;
}

export interface GenerateComponentResponse {
  reactElement: ComponentSpec;
  confidence: number;
}

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries: number = MAX_RETRIES
): Promise<Response> {
  try {
    const response = await fetch(url, options);
    if (!response.ok && retries > 0) {
      await delay(RETRY_DELAY);
      return fetchWithRetry(url, options, retries - 1);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      await delay(RETRY_DELAY);
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error instanceof Error ? error : new Error('Network error');
  }
}

export async function generateComponent(request: GenerateComponentRequest): Promise<GenerateComponentResponse> {
  const response = await fetchWithRetry(`${API_URL}/api/process`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to generate component');
  }

  return response.json();
}

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetchWithRetry(`${API_URL}/api/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.ok;
  } catch {
    return false;
  }
}
