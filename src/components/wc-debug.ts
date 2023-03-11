import { html, css, createWCElements } from "../lib/dom"
import { WcElement } from "./wc-element"

const template = html`<div class="box"></div>`

const style = css`
  .box {
    white-space: pre;
    background: linear-gradient(to bottom, green 25%, brown 100%);
    box-shadow: inset 0 0 15px #000;
    border: 3px solid black;
    border-radius: 4px;
    font-size: 1.2rem;
    font-weight: 250;
    color: yellow;
    position: absolute;
    top: 2px;
    left: 2px;
    resize: both;
    overflow: auto;
    padding: 8px;
    width: 320px;
    height: 200px;
    min-width: 100px;
    min-height: 80px;
  }
`

interface Packet {
  type: string
  payload: any
}

class WcDebug extends WcElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" }).append(...Array.from(createWCElements({ template, style })))

    this.socket.addEventListener("error", () => this.addMessage("WS Error!"))
    this.socket.addEventListener("message", ({ data }) => {
      console.log("NEW MESSAGE DEBUG", data)
      let msg: Packet
      try {
        msg = JSON.parse(data)
      } catch {
        return console.log("Invalid message", data)
      }
      this.addMessage(msg)
    })
  }

  addMessage(msg: string | object) {
    if (typeof msg === "object") {
      msg = JSON.stringify(msg, null, 2)
    }
    this.shadowRoot!.querySelector(".box")!.innerHTML = msg
  }

  disconnectedCallback() {
    this.socket.close()
  }
}

customElements.define("wc-debug", WcDebug)

export {}
