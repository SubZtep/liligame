import { css } from "../lib/dom"

class CountDown extends HTMLElement {
  static get observedAttributes() {
    /** in seconds */
    return ["wait"]
  }

  #progress: HTMLProgressElement
  #timer: NodeJS.Timer | undefined

  constructor() {
    super()

    this.#progress = document.createElement("progress")
    const styleEl = document.createElement("style")
    styleEl.textContent = css`
      progress {
        top: 0;
        left: 30px;
        width: 90vh;
        position: fixed;
        transform-origin: left;
        transform: scaleX(3) rotateZ(90deg);
        accent-color: #bc1919;
      }
    `
    this.attachShadow({ mode: "open" }).append(styleEl, this.#progress)
  }

  attributeChangedCallback(_name: string, _old: string, value: string) {
    clearInterval(this.#timer)
    this.#progress.max = Number(value)
    this.#progress.value = 0
    this.#timer = setInterval(() => {
      this.#progress.value++
      if (this.#progress.value >= this.#progress.max) {
        clearInterval(this.#timer)

        const event = new CustomEvent("TimeIsUp", {
          bubbles: true,
          cancelable: true,
          composed: true
        })
        this.shadowRoot!.dispatchEvent(event)

      }
    }, 1_000)
  }
}

customElements.define("count-down", CountDown)

export {}
