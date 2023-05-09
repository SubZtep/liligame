export function onTouch(start: (x: number, y: number) => HTMLElement, end: (el: HTMLElement) => void) {
  let el: HTMLElement

  const moveEl = (x: number, y: number) => {
    el.setAttribute("cx", x.toString())
    el.setAttribute("cy", y.toString())
    // document.body.style.setProperty("--cursor-pos", `translate(${ev.clientX}px, ${ev.clientY}px)`)
  }

  document.body.addEventListener("touchstart", ev => {
    const { clientX, clientY } = ev.touches[0]
    el = start(clientX, clientY)
  })
  document.body.addEventListener("touchmove", ev => {
    const { clientX: x, clientY: y } = ev.touches[0]
    el.style.setProperty("--pos", `translate(${x}px, ${y}px)`)
  })
  document.body.addEventListener("touchend", _ev => {
    // const { clientX, clientY } = ev.touches[0]
    end(el)
  })
  document.body.addEventListener("mousedown", ev => {
    const { clientX, clientY } = ev
    el = start(clientX, clientY)
    // setTimeout(() => end(el), 150)
  })
  document.body.addEventListener("mousemove", ev => {
    const { clientX: x, clientY: y } = ev
    el.style.setProperty("--pos", `translate(${x}px, ${y}px)`)
  })
  document.body.addEventListener("mouseup", _ev => {
    end(el)
    // const { clientX, clientY } = ev
    // el = start(clientX, clientY)
    // setTimeout(() => end(el), 150)
  })
}
