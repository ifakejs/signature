export interface DefOptions {
  [key: string]: any
  readonly className: string
  readonly lineWidth: number
  readonly lineCap: CanvasLineCap
  readonly lineJoin: CanvasLineJoin
  readonly strokeStyle: string | CanvasGradient | CanvasPattern
  readonly fullPage: boolean
  readonly isMobile: boolean
  readonly devicePixelRatio: number
  readonly degree: number
  ctxProcessor?: (canvas: CanvasRenderingContext2D) => void
  canvasProcessor?: (ctx: HTMLCanvasElement) => void
}

export class CustomOptions {}
export interface Options extends DefOptions, CustomOptions {}
const blockProperties = ['devicePixelRatio', 'isMobile']

export class OptionsConstructor extends CustomOptions implements DefOptions {
  [key: string]: any
  readonly className: string
  readonly lineWidth: number
  readonly lineCap: CanvasLineCap
  readonly lineJoin: CanvasLineJoin
  readonly strokeStyle: string | CanvasGradient | CanvasPattern
  readonly fullPage: boolean
  readonly isMobile: boolean
  readonly devicePixelRatio: number
  readonly degree: number
  ctxProcessor?: (ctx: CanvasRenderingContext2D) => void
  canvasProcessor?: (ctx: HTMLCanvasElement) => void
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
    this.degree = 0
  }

  merge(options?: Partial<Options>) {
    if (!options) return this
    for (const key in options) {
      if (!blockProperties.includes(key)) {
        this[key] = options[key]
      }
    }
    return this
  }
}
