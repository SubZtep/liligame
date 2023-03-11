import { html, css, createWCElements } from "../lib/dom"

const template = html`<button>Play</button>`

const style = css`
  button {
    opacity: 0.9;
    padding: 8px;
    font-size: 2rem;
    position: absolute;
    bottom: 8px;
    right: 8px;
    box-shadow: inset 0 0 15px #000;
    text-shadow: 0 0 2px #000;
    border: 3px solid black;
    border-radius: 50%;
    aspect-ratio: 1;
    font-weight: 100;
    color: #ff0a;
    cursor: pointer;
    border: 3px solid black;
  }
`

class PlayButton extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" }).append(...Array.from(createWCElements({ template, style })))
  }

  connectedCallback() {
    this.shadowRoot!.querySelector("button")!.addEventListener(
      "click",
      () => void this.dispatchEvent(new CustomEvent("StartPlaying")),
      { once: true }
    )
  }
}

customElements.define("play-button", PlayButton)

export {}
