/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** WebSocket URL with port */
  readonly VITE_WS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
