/// <reference types="vite/client" />
declare global {
  declare namespace NodeJS {
    export interface ProcessEnv {
      /** WebSocket server */
      WS: string
    }
  }
}

export {}
