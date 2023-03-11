import Hammer from "hammerjs"
import debounce from "lodash/debounce"
import throttle from "lodash/throttle"
import VanillaTilt from "vanilla-tilt"
import { clamper } from "../lib/misc"
import { html, css, createWCElements } from "../lib/dom"

const style = css`
  :host {
    --max-size: min(min(100vw, 100vh), 400px);
    --pointer-size: calc(var(--max-size) / 4);
    place-self: end;
  }
  .device > * {
    box-sizing: inherit;
  }
  .device {
    box-sizing: border-box;
    overflow: hidden;
    pointer-events: none;
    background: rgba(0 0 0 / 0.5);
    border-radius: 20px;
    padding: 30px;
    width: var(--max-size);
    height: var(--max-size);
  }
  .device-screen {
    clip-path: inset(1px);
    box-shadow: inset -5px 5px 40px #000d;
    background: rgba(190 226 234 / 0.5);
    position: relative;
    border-radius: 12px;
    perspective: 500px;
    height: 100%;
    width: 100%;
  }
  #hitarea {
    top: 0;
    left: 0;
    position: absolute;
    width: var(--pointer-size);
    height: var(--pointer-size);
    box-shadow: 4px -4px 12px #3336, inset 1px -1px 2px #eeea;
    pointer-events: auto;
    background: rebeccapurple;
    -ms-touch-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    border-radius: 50%;
    cursor: move;
  }
  @media (orientation: portrait) {
    .device {
      border-radius: 20px 20px 0 0;
    }
  }
  @media (orientation: landscape) {
    .device {
      border-radius: 20px 0 0 20px;
    }
  }
  #hitarea.animate {
    transition: all 0.3s;
  }
`

let startX = 0
let startY = 0

class JoyStick extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" }).append(
      ...Array.from(
        createWCElements({
          template: html`
            <div class="device-screen">
              <div id="hitarea"></div>
            </div>
          `,
          className: "device",
          style
        })
      )
    )
  }

  connectedCallback() {
    const root = this.shadowRoot!
    const joyEl = root.querySelector<HTMLElement>("#hitarea")!
    const setStartPos = setStartPosShadow(root)
    setStartPos()
    window.addEventListener("resize", debounce(setStartPos, 100))

    VanillaTilt.init(root.querySelector<HTMLElement>(".device-screen")!, {
      max: 5,
      speed: 250,
      glare: true,
      reset: false,
      reverse: true,
      "max-glare": 0.5
    })

    // hammerweb from here
    let ticking = false
    let transform: CSSRuleList | any
    let timer: NodeJS.Timeout
    const norm = normShadow(root)
    const clamp = clamper(-1, 1)

    const hammer = new Hammer.Manager(joyEl)

    hammer.add(new Hammer.Pan({ threshold: 0, pointers: 0 }))
    hammer.add(new Hammer.Swipe()).recognizeWith(hammer.get("pan"))
    hammer.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(hammer.get("pan"))
    hammer.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([hammer.get("pan"), hammer.get("rotate")])
    hammer.add(new Hammer.Tap({ event: "doubletap", taps: 2 }))
    hammer.add(new Hammer.Tap())

    hammer.on("panstart panmove", onPan)
    hammer.on("rotatestart rotatemove", onRotate)
    hammer.on("pinchstart pinchmove", onPinch)
    hammer.on("swipe", onSwipe)
    hammer.on("tap", onTap)
    hammer.on("doubletap", onDoubleTap)
    hammer.on(
      "hammer.input",
      throttle(ev => {
        if (ev.isFinal) {
          resetElement()
        } else {
          const x = clamp(norm(ev.deltaX))
          const y = clamp(-norm(ev.deltaY))

          const event = new CustomEvent("AxisChange", {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: { x, y }
          })
          this.shadowRoot!.dispatchEvent(event)
        }
      }, 1_000 / 30)
    )

    function logEvent(ev: any) {
      throttle(() => console.log("hammer event", ev), 1_000)
    }

    function resetElement() {
      joyEl.className = "animate"
      transform = {
        translate: { x: startX, y: startY },
        scale: 1,
        angle: 0,
        rx: 0,
        ry: 0,
        rz: 0
      }
      requestElementUpdate()
    }

    function updateElementTransform() {
      let value: any = [
        "translate3d(" + transform.translate.x + "px, " + transform.translate.y + "px, 0)",
        "scale(" + transform.scale + ", " + transform.scale + ")",
        "rotate3d(" + transform.rx + "," + transform.ry + "," + transform.rz + "," + transform.angle + "deg)"
      ]

      value = value.join(" ")
      joyEl.style.transform = value
      ticking = false
    }

    function requestElementUpdate() {
      if (!ticking) {
        requestAnimationFrame(updateElementTransform)
        ticking = true
      }
    }

    function onPan(ev) {
      joyEl.className = ""
      transform.translate = {
        x: startX + ev.deltaX,
        y: startY + ev.deltaY
      }

      logEvent(ev)
      requestElementUpdate()
    }

    var initScale = 1
    function onPinch(ev: any) {
      if (ev.type == "pinchstart") {
        initScale = transform.scale || 1
      }

      joyEl.className = ""
      transform.scale = initScale * ev.scale

      logEvent(ev)
      requestElementUpdate()
    }

    var initAngle = 0
    function onRotate(ev: any) {
      if (ev.type == "rotatestart") {
        initAngle = transform.angle || 0
      }

      joyEl.className = ""
      transform.rz = 1
      transform.angle = initAngle + ev.rotation

      logEvent(ev)
      requestElementUpdate()
    }

    function onSwipe(ev: any) {
      var angle = 50
      transform.ry = ev.direction & Hammer.DIRECTION_HORIZONTAL ? 1 : 0
      transform.rx = ev.direction & Hammer.DIRECTION_VERTICAL ? 1 : 0
      transform.angle = ev.direction & (Hammer.DIRECTION_RIGHT | Hammer.DIRECTION_UP) ? angle : -angle

      clearTimeout(timer)
      timer = setTimeout(function () {
        resetElement()
      }, 300)

      logEvent(ev)
      requestElementUpdate()
    }

    function onTap(ev) {
      transform.rx = 1
      transform.angle = 25

      clearTimeout(timer)
      timer = setTimeout(function () {
        resetElement()
      }, 200)

      logEvent(ev)
      requestElementUpdate()
    }

    function onDoubleTap(ev) {
      transform.rx = 1
      transform.angle = 80

      clearTimeout(timer)
      timer = setTimeout(function () {
        resetElement()
      }, 500)

      logEvent(ev)
      requestElementUpdate()
    }

    resetElement()
  }
}

function setStartPosShadow(doc: ShadowRoot) {
  return () => {
    const screen = doc.querySelector<HTMLElement>(".device-screen")
    const el = doc.querySelector<HTMLElement>("#hitarea")
    // let x = 0
    // let y = 0
    if (screen && el) {
      startX = Math.round((screen.offsetWidth - el.offsetWidth) / 2)
      startY = Math.round((screen.offsetHeight - el.offsetHeight) / 2)
    }
    // return { x, y }
  }
}

function normShadow(doc: ShadowRoot) {
  return (v: number) => {
    const screen = doc.querySelector<HTMLElement>(".device-screen")
    const size = screen ? Math.min(screen.offsetWidth, screen.offsetHeight) : 800
    return +((v / size) * 2)
  }
}

customElements.define("joy-stick", JoyStick)

export {}
