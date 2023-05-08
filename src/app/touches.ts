export function onTouch(cb: (x: number, y: number) => void) {
  document.body.addEventListener("touchstart", ev => {
    const { clientX, clientY } = ev.touches[0]
    cb(clientX, clientY)
  })
  document.body.addEventListener("touchmove", ev => {
    const { clientX, clientY } = ev.touches[0]
    cb(clientX, clientY)
  })
  document.body.addEventListener("touchend", ev => {
    const { clientX, clientY } = ev.touches[0]
    cb(clientX, clientY)
  })
  document.body.addEventListener("click", ev => {
    const { clientX, clientY } = ev
    cb(clientX, clientY)
  })
}
