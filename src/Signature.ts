import { Options, OptionsConstructor } from './Options'
import { sleep } from './utils/sleep'
import { base64ToBlob } from './utils/base64ToBlob'
import {
  $,
  addEvent,
  addClass,
  appendChild,
  createElem,
  getClientInfo,
  getDOMRect
} from './utils/dom'

type StartType = 'touchstart' | 'mousedown'
type MoveType = 'touchmove' | 'mousemove'
type EndType = 'touchend' | 'mouseup'

interface CavasParams {
  type?: string
  quality?: number
}

interface EventType {
  start: StartType
  move: MoveType
  end: EndType
}

interface Point {
  x: number
  y: number
}

const defaultPoint = {
  x: 0,
  y: 0
}

export class IfSignature {
  public options: Options
  public canvas: HTMLCanvasElement
  public ctx: CanvasRenderingContext2D
  public isMoving: boolean = false
  public pointStart: Point = defaultPoint
  public pointMove: Point = defaultPoint
  public canvasWidth: number = 0
  public canvasHeight: number = 0
  constructor(options: Partial<Options>) {
    if (!options?.target) {
      throw new Error(
        `The option [target] must be a dom class name or id which is the parent container of canvas.\nRecommend type an id. e.g: #app`
      )
    }

    this.options = new OptionsConstructor().merge(options)
    const canvas = createElem('canvas') as HTMLCanvasElement
    const canvasContainer = $(options?.target) as HTMLElement
    if (!canvasContainer) {
      throw new Error('Please provide a container for canvas')
    }
    appendChild(canvasContainer, canvas)
    addClass(canvas, this.options.className)
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D

    this.render()
    this.reset(this.options.degree)
    this.initialCtxStyle()
    this.bindEvent()

    // Custom handler function
    if (this.options.canvasProcessor && typeof this.options.canvasProcessor === 'function') {
      this.options.canvasProcessor(this.canvas)
    }
    // Custom handler function
    if (this.options.ctxProcessor && typeof this.options.ctxProcessor === 'function') {
      this.options.ctxProcessor(this.ctx)
    }
  }

  public render() {
    const { fullPage } = this.options
    const { width, height } = window.getComputedStyle(this.ctx.canvas, null)
    try {
      this.canvasWidth = parseInt(width.replace('px', ''), 10)
      this.canvasHeight = parseInt(height.replace('px', ''), 10)
    } catch (e) {
      throw e.message
    }

    const { clientHeight, clientWidth } = getClientInfo()
    const pageWidth = fullPage ? clientWidth : this.canvasWidth
    const pageHeight = fullPage ? clientHeight : this.canvasHeight
    this.canvas.style.width = `${pageWidth}px`
    this.canvas.style.height = `${pageHeight}px`
    this.canvas.width = Math.floor(pageWidth * this.options.devicePixelRatio)
    this.canvas.height = Math.floor(pageHeight * this.options.devicePixelRatio)
    this.ctx.scale(this.options.devicePixelRatio, this.options.devicePixelRatio)
  }

  public reset(degree: number) {
    this.ctx.rotate((degree * Math.PI) / 180)
    switch (degree) {
      case -90:
        this.ctx.translate(-this.canvasHeight, 0)
        break
      case 90:
        this.ctx.translate(0, -this.canvasWidth)
        break
      case -180:
      case 180:
        this.ctx.translate(-this.canvasWidth, -this.canvasHeight)
        break
      default:
    }
  }

  private initialCtxStyle(): void {
    this.canvas.style.cursor = 'crosshair'
    this.ctx.lineJoin = this.options.lineJoin
    this.ctx.lineCap = this.options.lineCap
    this.ctx.lineWidth = this.options.lineWidth
    this.ctx.strokeStyle = this.options.strokeStyle
    if (!this.options.isMobile) {
      this.ctx.shadowBlur = 1
      this.ctx.shadowColor = this.options.strokeStyle as string
    }
  }

  private adaptEventType(): EventType {
    if (this.options.isMobile) {
      return {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend'
      }
    }
    return {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup'
    }
  }

  private getOffset(e: Event) {
    const { left, top } = getDOMRect(this.canvas)
    if (this.options.isMobile) {
      return {
        left: (e as TouchEvent).touches[0].clientX - left,
        top: (e as TouchEvent).touches[0].clientY - top
      }
    }
    return {
      left: (e as MouseEvent).clientX - left,
      top: (e as MouseEvent).clientY - top
    }
  }

  private bindEvent(): void {
    const { start, move, end } = this.adaptEventType()
    const requestAnimationFrame = window.requestAnimationFrame
    const optimizedMove = requestAnimationFrame
      ? (e: Event) => {
          requestAnimationFrame(() => {
            this.handleMove(e)
          })
        }
      : this.handleMove
    addEvent(this.canvas, start, this.handleStart.bind(this))
    addEvent(this.canvas, move, optimizedMove.bind(this))
    addEvent(this.canvas, end, this.handleEnd.bind(this))

    if (!this.options.isMobile) {
      addEvent(this.canvas, 'mouseleave', () => {
        this.isMoving = false
      })
    }
  }

  private handleStart(e: Event): void {
    e.preventDefault()
    this.isMoving = true
    const { left, top } = this.getOffset(e)
    this.pointStart = {
      x: left,
      y: top
    }
    this.ctx.beginPath()
    this.ctx.moveTo(this.pointStart.x, this.pointStart.y)
    this.ctx.lineTo(this.pointStart.x, this.pointStart.y)
    this.ctx.stroke()
  }

  private handleMove(e: Event): void {
    e.preventDefault()
    if (this.isMoving) {
      const { left, top } = this.getOffset(e)
      this.pointMove = {
        x: left,
        y: top
      }
      this.ctx.lineTo(this.pointMove.x, this.pointMove.y)
      this.ctx.stroke()
    }
  }

  private handleEnd(e: Event): void {
    e.preventDefault()
    this.isMoving = false
  }

  public async getPngImage(quality: any = 1): Promise<string> {
    await sleep(10)
    return Promise.resolve(this.canvas.toDataURL('image/png', quality))
  }

  public async getJpgImage(quality: any = 0.5): Promise<string> {
    await sleep(10)
    return Promise.resolve(this.canvas.toDataURL('image/jpeg', quality))
  }

  public async getBlob({ type = 'image/png', quality = 0.92 }: CavasParams): Promise<Blob> {
    return new Promise(resolve => {
      if (!HTMLCanvasElement.prototype.toBlob) {
        resolve(base64ToBlob(this.canvas.toDataURL(type, quality)))
      } else {
        this.canvas.toBlob(
          blob => {
            resolve(blob as Blob)
          },
          type,
          quality
        )
      }
    })
  }

  public async getBlobWithWhiteBG({
    type = 'image/jpeg',
    quality = 0.92
  }: CavasParams): Promise<Blob> {
    await sleep(10)
    const tempCanvas = createElem('canvas') as HTMLCanvasElement
    const tempCtx = tempCanvas.getContext('2d') as CanvasRenderingContext2D
    const { width, height } = window.getComputedStyle(this.ctx.canvas, null)
    let tempCanvasWidth, tempCanvasHeight
    try {
      tempCanvasWidth = parseInt(width.replace('px', ''), 10)
      tempCanvasHeight = parseInt(height.replace('px', ''), 10)
    } catch (e) {
      throw new Error(e.message)
    }

    tempCanvas.style.width = `${tempCanvasWidth}px`
    tempCanvas.style.height = `${tempCanvasHeight}px`
    tempCanvas.width = Math.floor(tempCanvasWidth * this.options.devicePixelRatio)
    tempCanvas.height = Math.floor(tempCanvasHeight * this.options.devicePixelRatio)
    tempCtx.scale(this.options.devicePixelRatio, this.options.devicePixelRatio)
    const imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
    const data = imgData.data
    // Saved image antialiasing are not handled very well, still need to find a new solution
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 255) {
        data[i] = 255
        data[i + 1] = 255
        data[i + 2] = 255
        data[i + 3] = 255
      }
    }
    tempCtx.putImageData(imgData, 0, 0)

    return new Promise(resolve => {
      if (!HTMLCanvasElement.prototype.toBlob) {
        resolve(base64ToBlob(tempCanvas.toDataURL(type, quality)))
      } else {
        tempCanvas.toBlob(
          blob => {
            resolve(blob as Blob)
          },
          type,
          quality
        )
      }
    })
  }

  public destory() {
    this.canvas?.parentNode?.removeChild(this.canvas)
  }

  public clear() {
    let width, height
    if (this.options.degree === -90 || this.options.degree === 90) {
      width = this.canvasHeight
      height = this.canvasWidth
    } else {
      width = this.canvasWidth
      height = this.canvasHeight
    }
    this.ctx.clearRect(0, 0, width, height)
  }
}
