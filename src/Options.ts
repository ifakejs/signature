export interface GuideLine {
  enable: boolean
  step: number
  lineColor: string
  lineWidth: number
}

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
  guideLine: GuideLine
}

export interface Options extends DefOptions {}
const blockProperties = ['devicePixelRatio', 'isMobile']

export class OptionsConstructor implements DefOptions {
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
  guideLine: GuideLine
  constructor() {
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
    this.guideLine = {
      enable: false,
      lineColor: '#f5f5f5',
      lineWidth: 0.5,
      step: 20
    }
  }

  merge(options?: Partial<Options>) {
    if (!options) return this
    for (const key in options) {
      if (!blockProperties.includes(key)) {
        if (key === 'guideLine') {
          this[key] = { ...this[key], ...options[key] }
        } else {
          this[key] = options[key]
        }
      }
    }
    return this
  }
}
