import { html, css, createWCElements } from "../lib/dom"

const template = html`<div class="box"></div>`

const style = css`
  .box {
    opacity: 0.8;
    white-space: pre;
    background: linear-gradient(to bottom, green 25%, brown 100%);
    box-shadow: inset 0 0 15px #000;
    border: 3px solid black;
    border-radius: 4px;
    font-size: 0.6rem;
    font-weight: 250;
    color: yellow;
    position: absolute;
    top: 2px;
    left: 2px;
    resize: both;
    overflow: auto;
    padding: 8px;
    min-width: 100px;
    min-height: 80px;
    max-width: 80%;
  }
`

class WcDebug extends HTMLElement {
  static get observedAttributes() {
    return ["sessions"]
  }

  constructor() {
    super()
    this.attachShadow({ mode: "open" }).append(...Array.from(createWCElements({ template, style })))
  }

  attributeChangedCallback(_name: string, _old: string, value: string) {
    this.addMessage(value)
  }

  addMessage(msg: string | object) {
    if (typeof msg === "object") {
      msg = JSON.stringify(msg, null, 2)
    }
    this.shadowRoot!.querySelector(".box")!.innerHTML = msg
  }
}

customElements.define("wc-debug", WcDebug)

export {}
