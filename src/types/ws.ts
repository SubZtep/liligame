export type Axes = {
  x: number
  y: number
}

export interface SocketMessage {  // type: "login" | "position"
  uuid?: string
  position?: Axes
  sessions?: [string, object][]
}

export interface PlayerSession {
  position?: Axes
}
