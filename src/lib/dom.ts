export const html = String.raw
export const css = String.raw

export function* createWCElements({
  template,
  style,
  canvas
}: {
  /** HTML */
  template?: string
  /** CSS */
  style?: string
  /** create canvas html element with value as class name */
  canvas?: string
}) {
  if (style) {
    const styleEl = document.createElement("style")
    styleEl.textContent = style
    yield styleEl
  }
  if (template) {
    const wrapperEl = document.createElement("div")
    wrapperEl.innerHTML = template
    yield wrapperEl
  }
  if (canvas) {
    const canvasEl = document.createElement("canvas")
    canvasEl.classList.add(canvas)
    yield canvasEl
  }
}
