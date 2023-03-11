import "./components/joy-stick"
import "./components/wc-debug"
import "./components/play-button"
import "./components/canvas-confetti"
import "./components/physics-matter"
import { play } from "./lib/socket"
import "./styles/index.css"

// Set current time day/night gradient
document.body.classList.add(`sky-gradient-${new Date().getHours()}`)

const confetti = document.querySelector("canvas-confetti")

document.body.addEventListener("click", ({ clientX, clientY }) => {
  const { innerWidth, innerHeight } = window
  const normalAxes = { x: clientX / innerWidth, y: clientY / innerHeight }

  confetti?.setAttribute("origin", JSON.stringify(normalAxes))
  console.log("Click", normalAxes)
})

document.querySelector("play-button")?.addEventListener(
  "StartPlaying",
  ({ target }) => {
    ;(target as HTMLElement).remove()
    play()
  },
  { once: true }
)

export {}
