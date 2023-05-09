export const css = String.raw
export const html = String.raw

export function createSVGCircle(x: number, y: number, color: string) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "circle")
  el.setAttribute("cx", x.toString())
  el.setAttribute("cy", y.toString())
  el.setAttribute("r", "10")
  el.setAttribute("fill", color)
  return el
}
