import "./components/joy-stick"
// import "./components/wc-debug"
import "./components/canvas-confetti"
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
    parent?.append(createJoystick())
  },
  { once: true }
)

countdown?.setAttribute("wait", "3")
countdown?.addEventListener(
  "TimeIsUp",
  () => {
    location.assign("./games/black/")
  },
  { once: true }
)

export {}
