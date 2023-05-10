let touches: Position[] = []
let lastTouches: Position[] = []

const toPosition = (ev: Touch | MouseEvent): Position => ({
  x: ev.clientX / window.innerWidth,
  y: ev.clientY / window.innerHeight
})

export function onMove(cb: (cb: Position[]) => void) {
  document.body.addEventListener("touchstart", ev => {
    touches = Array.from(ev.touches).map(toPosition)
  })

  document.body.addEventListener("mousedown", ev => {
    if (ev.buttons === 1) {
      touches = [toPosition(ev)]
    } else {
      touches = []
    }
  })

  document.body.addEventListener("touchmove", ev => {
    touches = Array.from(ev.touches).map(toPosition)
  })

  document.body.addEventListener("mousemove", ev => {
    if (ev.buttons === 1) {
      touches = [toPosition(ev)]
    } else {
      touches = []
    }
  })

  document.body.addEventListener("touchend", ev => {
    touches = Array.from(ev.touches).map(toPosition)
  })
  document.body.addEventListener("mouseup", ev => {
    if (ev.button === 0) {
      touches = []
    }
  })

  setInterval(() => {
    if (JSON.stringify(touches) !== JSON.stringify(lastTouches)) {
      cb(touches)
      lastTouches = touches
    }
  }, 15)
}
