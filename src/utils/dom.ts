export function $(target: string) {
  return document.querySelector(target)
}

export function create(name: string) {
  return document.createElement(name)
}
