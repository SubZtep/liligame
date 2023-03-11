import { createWCElements, css, html } from "../lib/dom"
import Confetti from "canvas-confetti"

class CanvasConfetti extends HTMLElement {
  static get observedAttributes() {
    return ["origin"]
  }

  #confetti!: ReturnType<typeof Confetti.create> // typeof Confetti
  options: Confetti.Options = {
    // particleCount: 150,
    // startVelocity: 60,
    // spread: 90,
    // angle: 120
    // origin: { x: 1, y: 1 }
  }

  constructor() {
    super()

    const template = document.createElement("canvas")
    template.classList.add("confetti")

    this.attachShadow({ mode: "open" }).append(
      ...Array.from(
        createWCElements({
          // @ts-ignorez
          // template: html`<canvas class="confetti"></canvas>`,
          template,
          style: css`
            .confetti {
              pointer-events: none;
              position: absolute;
              top: 0;
              left: 0;
              /* width: 100%;
              height: 100%; */
              z-index: 2;
            }
          `
        })
      )
    )
  }

  connectedCallback() {
    this.#confetti = Confetti.create(this.shadowRoot!.querySelector("canvas")!, {
      resize: true,
      useWorker: true
    })
  }

  attributeChangedCallback(name: string, _old: string, value: string) {
    // this.addMessage(value)
    const options = { ...this.options, [name]: JSON.parse(value) }
    this.#confetti(options)
  }
}

customElements.define("canvas-confetti", CanvasConfetti)

export {}
