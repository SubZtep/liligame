import "./components/joy-stick"
import "./components/wc-debug"
import "./components/play-button"
import "./styles/index.css"
import "./lib/socket"
import { play } from "./lib/socket"

// Set current time day/night gradient
document.body.classList.add(`sky-gradient-${new Date().getHours()}`)

document.querySelector("play-button")?.addEventListener(
  "StartPlaying",
  ev => {
    ;(ev.target as HTMLElement).remove()
    play()
  },
  { once: true }
)

export {}
