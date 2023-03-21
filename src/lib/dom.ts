export const html = String.raw
export const css = String.raw

export function* createWCElements({
  template,
  className,
  style
}: {
  /** HTML */
  template?: string
  /** Add given classname to the created root element */
  className?: string
  /** CSS */
  style?: string
}) {
  if (style) {
    const styleEl = document.createElement("style")
    styleEl.textContent = style
    yield styleEl
  }
  if (template) {
    const wrapperEl = document.createElement("div")
    wrapperEl.innerHTML = template
    if (className) wrapperEl.classList.add(className)
    yield wrapperEl
  }
}
