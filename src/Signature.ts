import { $, addEvent } from './utils/dom'
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
  x: null | number
  y: null | number
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
      x: null,
      y: null
    }
    this.pointMove = {
      x: null,
      y: null
    }
    this.canvas = <HTMLCanvasElement>$(target)
    this.options = new OptionsConstructor().merge(options)
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d')
  }

  async render() {
    await sleep(10)

    const { fullPage } = this.options
    this.canvas.style.cursor = 'crosshair'
    const { width, height } = window.getComputedStyle(this.canvas, null)

    let w, h
    try {
      w = ~~width.replace('px', '')
      h = ~~height.replace('px', '')
    } catch (e) {
      throw e.message
    }
    const pageWidth = fullPage ? document.documentElement.clientWidth : w
    const pageHeight = fullPage ? document.documentElement.clientHeight : h
    this.canvas.style.width = `${pageWidth}px`
    this.canvas.style.height = `${pageHeight}px`

    if (this.options.className) {
      this.canvas.setAttribute('class', this.options.className)
    }

    const scale = (window as any).devicePixelRatio
    this.canvas.width = Math.floor(pageWidth * scale)
    this.canvas.height = Math.floor(pageHeight * scale)
    this.ctx.scale(scale, scale)

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
      this.ctx.shadowColor = <string>this.options.strokeStyle
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
    if (this.options.isMobile) {
      return {
        left: (e as TouchEvent).touches[0].clientX - this.canvas.getBoundingClientRect().left,
        top: (e as TouchEvent).touches[0].clientY - this.canvas.getBoundingClientRect().top
      }
    }
    return {
      left: (e as MouseEvent).clientX - this.canvas.getBoundingClientRect().left,
      top: (e as MouseEvent).clientY - this.canvas.getBoundingClientRect().top
    }
  }

  public bindEvent(): void {
    const { start, move, end } = this.adaptEventType()
    addEvent(this.canvas, start, this.handleStart.bind(this))
    const requestAnimationFrame = window.requestAnimationFrame
    const optimizedMove = requestAnimationFrame
      ? (e: Event) => {
          requestAnimationFrame(() => {
            this.handleMove(e)
          })
        }
      : this.handleMove
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
    this.ctx.moveTo(<number>this.pointStart.x, <number>this.pointStart.y)
    this.ctx.lineTo(<number>this.pointStart.x, <number>this.pointStart.y)
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
      this.ctx.lineTo(<number>this.pointMove.x, <number>this.pointMove.y)
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
