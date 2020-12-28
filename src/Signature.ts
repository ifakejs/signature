import { $, addEvent, getClientInfo, getOMRect } from './utils/dom'
import { Options, OptionsConstructor } from './Options'
import { sleep } from './utils/sleep'

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

export class IfSignature {
  public options: Options
  public canvas: HTMLCanvasElement
  public ctx: CanvasRenderingContext2D
  public isMoving: boolean
  public pointStart: Point
  public pointMove: Point
  constructor(options: Options) {
    const { target } = options
    if (!target) {
      throw 'The option [target] must be a string and recommend input an id. e.g: #app'
    }
    this.isMoving = false
    this.pointStart = {
      x: 0,
      y: 0
    }
    this.pointMove = {
      x: 0,
      y: 0
    }
    this.canvas = $(target) as HTMLCanvasElement
    this.options = new OptionsConstructor().merge(options)
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
  }

  async render() {
    await sleep(10)

    const { fullPage } = this.options
    this.canvas.style.cursor = 'crosshair'
    this.canvas.setAttribute('class', this.options.className)
    const { width, height } = window.getComputedStyle(this.canvas, null)

    let w, h
    try {
      w = parseInt(width.replace('px', ''), 10)
      h = parseInt(height.replace('px', ''), 10)
    } catch (e) {
      throw e.message
    }

    const { clientHeight, clientWidth } = getClientInfo()
    const pageWidth = fullPage ? clientWidth : w
    const pageHeight = fullPage ? clientHeight : h
    this.canvas.style.width = `${pageWidth}px`
    this.canvas.style.height = `${pageHeight}px`

    this.canvas.width = Math.floor(pageWidth * this.options.devicePixelRatio)
    this.canvas.height = Math.floor(pageHeight * this.options.devicePixelRatio)
    this.ctx.scale(this.options.devicePixelRatio, this.options.devicePixelRatio)

    this.initialCtxStyle()
    this.bindEvent()
  }

  initialCtxStyle(): void {
    this.ctx.lineJoin = this.options.lineJoin
    this.ctx.lineCap = this.options.lineCap
    this.ctx.lineWidth = this.options.lineWidth
    this.ctx.strokeStyle = this.options.strokeStyle
    if (!this.options.isMobile) {
      this.ctx.shadowBlur = 1
      this.ctx.shadowColor = this.options.strokeStyle as string
    }
  }

  adaptEventType(): EventType {
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

  public getOffset(e: Event) {
    const { left, top } = getOMRect(this.canvas)
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

  get getCtx() {
    return this.ctx
  }

  public getPngImage(): string {
    return this.canvas.toDataURL('image/png')
  }

  public getBlob(): string {
    return ''
  }
}
