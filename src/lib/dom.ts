export const html = String.raw
export const css = String.raw

export function* createWCElements({
  template,
  style
}: {
  /** HTML */
  template?: string
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
    yield wrapperEl
  }
}
