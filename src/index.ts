import "./components/joy-stick"
// import "./components/wc-debug"
import "./components/canvas-confetti"
import "./components/physics-matter"
import "./components/count-down"
import { createJoystick } from "./lib/socket"
import "./styles/index.css"

const countdown = document.querySelector("count-down")
const confetti = document.querySelector("canvas-confetti")
const playButton = document.querySelector(".play-button")

document.body.addEventListener("click", ({ clientX, clientY }) => {
  const { innerWidth, innerHeight } = window
  const normalAxes = { x: clientX / innerWidth, y: clientY / innerHeight }

  confetti?.setAttribute("origin", JSON.stringify(normalAxes))
})

playButton?.addEventListener(
  "click",
  ({ target }) => {
    const tEl = target as HTMLElement
    const parent = tEl.parentElement!
    tEl.remove()
    countdown?.setAttribute("wait", "10")
    parent?.append(createJoystick())
  },
  { once: true }
)

countdown?.addEventListener(
  "TimeIsUp",
  () => {
    countdown.remove()
    document.body.classList.remove("square-bg")
    const el = document.createElement("physics-matter")
    document.body.prepend(el)
  },
  { once: true }
)

export {}
