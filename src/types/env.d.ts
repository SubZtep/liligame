/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** WebSocket connection — host:port */
  readonly VITE_WS_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare namespace NodeJS {
  interface ProcessEnv {
    /** WebSocket connection — port */
    VITE_WS_PORT: string
  }
}
