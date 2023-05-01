/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** WebSocket URL with port */
  readonly VITE_WSPP: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
