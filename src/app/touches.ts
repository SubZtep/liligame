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

// export function onMove(cb: (cb: MyTouch[]) => void) {
//   let touches: MyTouch[] = []
//   let pause = false
//   document.body.addEventListener(
//     "touchmove",
//     ev => {
//       ev.preventDefault()
//       touches = Array.from(ev.touches).map(touch => ({ x: touch.clientX, y: touch.clientY }))
//     },
//     { passive: false }
//   )
//   document.body.addEventListener(
//     "mousemove",
//     ev => {
//       ev.preventDefault()
//       if (ev.button === 0) {
//         const { clientX: x, clientY: y } = ev
//         cb([x, y])
//       }
//     },
//     { passive: false }
//   )
//   setInterval(() => {
//     if (touches.length === 0) {
//       if (pause) {
//         return
//       } else {
//         pause = true
//       }
//     } else {
//       pause = false
//     }

//     if (touches.length > 0) {
//       const { x, y } = touches[0]
//       cb(x, y)
//     }
//   }, 15)
// }

export function onEnd(cb: Fn) {
  document.body.addEventListener("touchend", ev => {
    cb()
  })
  document.body.addEventListener("mouseup", ev => {
    if (ev.button === 0) {
      cb()
    }
  })
}
