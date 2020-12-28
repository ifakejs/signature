import { Options, OptionsConstructor } from './Options'
import { sleep } from './utils/sleep'
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
  constructor(options: Options) {
    const { target } = options
    if (!target) {
      throw `The option [target] must be a dom class name or id which is the parent container of canvas.\nRecommend type an id. e.g: #app`
    }

    this.options = new OptionsConstructor().merge(options)
    const canvas = createElem('canvas') as HTMLCanvasElement
    appendChild($(target) as HTMLElement, canvas)
    addClass(canvas, this.options.className)
    this.canvas = $(`.${canvas.className}`) as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D

    this.render()
    this.reset(this.options.degree)
    this.initialCtxStyle()
    this.bindEvent()

    // custom implementation
    if (this.options.canvasProcessor && typeof this.options.canvasProcessor === 'function') {
      this.options.canvasProcessor(this.canvas)
    }
    // custom implementation
    if (this.options.ctxProcessor && typeof this.options.ctxProcessor === 'function') {
      this.options.ctxProcessor(this.ctx)
    }
  }

  public destory() {
    this.canvas?.parentNode?.removeChild(this.canvas)
  }

  public render() {
    const { fullPage } = this.options
    this.canvas.style.cursor = 'crosshair'
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

  private initialCtxStyle(): void {
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

  public bindEvent(): void {
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

  public handleStart(e: Event): void {
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

  public handleMove(e: Event): void {
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

  public handleEnd(e: Event): void {
    e.preventDefault()
    this.isMoving = false
  }

  public async getPngImage(quality: any = 1): Promise<any> {
    await sleep(10)
    return Promise.resolve(this.canvas.toDataURL('image/png', quality))
  }

  public async getJpgImage(quality: any = 0.5): Promise<any> {
    await sleep(10)
    return Promise.resolve(this.canvas.toDataURL('image/jpeg', quality))
  }

  public async getBlob(): Promise<Blob> {
    const dataURI = await this.getPngImage()
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    const byteString = atob(dataURI.split(',')[1])
    const arrayBuffer = new ArrayBuffer(byteString.length)
    const intArray = new Uint8Array(arrayBuffer)
    const byteLen = byteString.length

    for (let i = 0; i < byteLen; i++) {
      intArray[i] = byteString.charCodeAt(i)
    }
    return Promise.resolve(new Blob([intArray], { type: mimeString }))
  }
}
