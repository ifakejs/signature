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

export function addClass(target: HTMLElement, className: string) {
  const cName = target.className.trim().split(/\s/)

  if (cName.length > 0) {
    target.className = [...cName, className].join(' ').trim()
  } else {
    target.className = className
  }
}

export function appendChild(parent: HTMLElement, target: HTMLElement) {
  parent.appendChild(target)
}

export function createElem(tag: string) {
  return document.createElement(tag)
}

export function getClientInfo() {
  return {
    clientWidth:
      window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    clientHeight:
      window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }
}

export function getDOMRect(target: HTMLElement) {
  return target.getBoundingClientRect()
}
