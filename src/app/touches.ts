let touches: Position[] = []
let lastTouches: Position[] = []

export function onMove(cb: (cb: Position[]) => void) {
  document.body.addEventListener("touchstart", ev => {
    cb(Array.from(ev.touches).map(touch => ({ x: touch.clientX, y: touch.clientY })))
    touches = Array.from(ev.touches).map(touch => ({ x: touch.clientX, y: touch.clientY }))
  })

  document.body.addEventListener("mousedown", ev => {
    if (ev.buttons === 1) {
      touches = [{ x: ev.clientX, y: ev.clientY }]
    } else {
      touches = []
    }
  })

  document.body.addEventListener(
    "touchmove",
    ev => {
      ev.preventDefault()
      touches = Array.from(ev.touches).map(touch => ({ x: touch.clientX, y: touch.clientY }))
    },
    { passive: false }
  )

  document.body.addEventListener(
    "mousemove",
    ev => {
      ev.preventDefault()
      if (ev.buttons === 1) {
        touches = [{ x: ev.clientX / window.innerWidth, y: ev.clientY / window.innerHeight }]
      } else {
        touches = []
      }
    },
    { passive: false }
  )

  setInterval(() => {
    if (JSON.stringify(touches) !== JSON.stringify(lastTouches)) {
      cb(touches)
      lastTouches = touches
    }
  }, 15)
}

export function onEnd(cb: Fn) {
  document.body.addEventListener("touchend", ev => {
    touches = Array.from(ev.touches).map(touch => ({
      x: touch.clientX / window.innerWidth,
      y: touch.clientY / window.innerWidth
    }))
  })
  document.body.addEventListener("mouseup", ev => {
    if (ev.button === 0) {
      cb([])
    }
  })
}
