export interface DefOptions {
  [key: string]: any
  className: string
  lineWidth: number
  lineCap: CanvasLineCap
  lineJoin: CanvasLineJoin
  strokeStyle: string | CanvasGradient | CanvasPattern
  fullPage: boolean
  isMobile: boolean
  devicePixelRatio: number
}

export class CustomOptions {}
export interface Options extends DefOptions, CustomOptions {}

export class OptionsConstructor extends CustomOptions implements DefOptions {
  [key: string]: any
  className: string
  lineWidth: number
  lineCap: CanvasLineCap
  lineJoin: CanvasLineJoin
  strokeStyle: string | CanvasGradient | CanvasPattern
  fullPage: boolean
  isMobile: boolean
  devicePixelRatio: number
  constructor() {
    super()
    this.className = 'ifake-signature'
    this.lineWidth = 4
    this.lineCap = 'round'
    this.lineJoin = 'round'
    this.strokeStyle = '#333'
    this.fullPage = false
    this.isMobile = /phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(
      navigator.userAgent
    )
    this.devicePixelRatio = Math.max(window.devicePixelRatio || 1, 1)
  }

  merge(options?: Options) {
    if (!options) return this
    for (const key in options) {
      this[key] = options[key]
    }
    return this
  }
}
