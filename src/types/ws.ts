export interface SocketMessage {
  // type: "login" | "position"
  uuid?: string
  // payload?: any
  position?: {
    x: number
    y: number
  }

  sessions?: [string, object][]
}

export interface PlayerSession {
  position?: {
    x: number
    y: number
  }
}
