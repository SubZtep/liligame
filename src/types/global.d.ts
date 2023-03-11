import type { Axes } from "./ws"

declare global {
  interface ElementEventMap {
    StartPlaying: CustomEvent<void>
    AxisChange: CustomEvent<Axes>
  }

  type Fn = () => void
}

export {}
