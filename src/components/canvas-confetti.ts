import { createWCElements, css, html } from "../lib/dom"
import Confetti from "canvas-confetti"
import { getRandomArbitrary } from "../lib/misc"

class CanvasConfetti extends HTMLElement {
  static get observedAttributes() {
    return ["origin"]
  }

  #confetti!: ReturnType<typeof Confetti.create>
  options: Confetti.Options = {
    particleCount: 30,
    startVelocity: 20,
    spread: 40,
    shapes: ["star", "circle"]
    // angle: getRandomArbitrary(0, 360)
    // origin: { x: 1, y: 1 }
  }

  constructor() {
    super()

    const template = document.createElement("canvas")
    template.width = window.innerWidth
    template.height = window.innerHeight
    template.classList.add("confetti")
    this.attachShadow({ mode: "open" }).append(template)

    this.#confetti = Confetti.create(template, {
      // resize: true,
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
