import type { Axes } from "./ws"

declare global {
  interface ElementEventMap {
    PlayerPositionChanged: CustomEvent<Axes>
  }

  type Fn = () => void
}

export {}
