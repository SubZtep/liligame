import type { Axes } from "./ws"

declare global {
  interface ElementEventMap {
    StartPlaying: CustomEvent<void>
    AxisChange: CustomEvent<Axes>
    TimeIsUp: CustomEvent<void>
  }

  type Fn = () => void
}

export {}
