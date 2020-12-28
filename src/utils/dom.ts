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

export function getClientInfo() {
  return {
    clientWidth:
      window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    clientHeight:
      window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }
}

export function getOMRect(target: HTMLElement) {
  return target.getBoundingClientRect()
}
