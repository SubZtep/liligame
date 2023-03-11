import Confetti from "canvas-confetti"
import { getRandomArbitrary } from "../lib/misc"

class CanvasConfetti extends HTMLElement {
  static get observedAttributes() {
    return ["origin"]
  }

  #confetti!: ReturnType<typeof Confetti.create>
  options: Confetti.Options = {
    shapes: ["star", "circle"],
    particleCount: 30,
    startVelocity: 20,
    spread: 40
  }

  constructor() {
    super()

    const canvas = document.createElement("canvas")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.style.position = "absolute"
    this.attachShadow({ mode: "open" }).append(canvas)

    this.#confetti = Confetti.create(canvas, {
      resize: true,
      useWorker: true
    })
  }

  attributeChangedCallback(name: string, _old: string, value: string) {
    const options = {
      ...this.options,
      angle: getRandomArbitrary(0, 360),
      [name]: JSON.parse(value)
    }
    this.#confetti(options)
  }
}

customElements.define("canvas-confetti", CanvasConfetti)

export {}
