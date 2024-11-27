/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_MAX_RETRIES: string
  readonly VITE_RETRY_DELAY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
