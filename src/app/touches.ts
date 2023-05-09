export function onStart(cb: (x: number, y: number) => void) {
  document.body.addEventListener("touchstart", ev => {
    const { clientX: x, clientY: y } = ev.touches[0]
    cb(x, y)
  })
  document.body.addEventListener("mousedown", ev => {
    if (ev.button === 0) {
      const { clientX: x, clientY: y } = ev
      cb(x, y)
    }
  })
}

export function onMove(cb: (x: number, y: number) => void) {
  document.body.addEventListener("touchmove", ev => {
    if (ev.touches.length > 1) {
      const { clientX: x, clientY: y } = ev.touches[0]
      cb(x, y)
    }
  })
  document.body.addEventListener("mousemove", ev => {
    if (ev.button === 0) {
      const { clientX: x, clientY: y } = ev
      cb(x, y)
    }
  })
}

export function onEnd(cb: Fn) {
  document.body.addEventListener("touchend", ev => {
    const { clientX: x, clientY: y } = ev.touches[0]
    cb(x, y)
  })
  document.body.addEventListener("mouseup", ev => {
    if (ev.button === 0) {
      const { clientX: x, clientY: y } = ev
      cb(x, y)
    }
  })
}
