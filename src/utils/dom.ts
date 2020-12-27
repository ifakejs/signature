export function $(target: string) {
  return document.querySelector(target)
}

export function addEvent(
  dom: HTMLElement,
  type: string,
  listener: EventListenerOrEventListenerObject
): void {
  return dom.addEventListener(type, listener, false)
}
