import { $, create } from './utils/dom'
import { Options, OptionsConstructor } from './Options'

export class IfSignature {
  public options: Options
  public container: Element
  public canvas: HTMLCanvasElement
  public ctx: CanvasRenderingContext2D
  constructor(options: Options) {
    const { target } = options
    if (!target) {
      throw 'The option [target] must be a string and recommend input an id. e.g: #app'
    }
    this.options = new OptionsConstructor().merge(options)
    this.container = <Element>$(target)
    this.canvas = create('canvas') as HTMLCanvasElement
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d')
  }

  render() {
    const { width, height, customHeight, customWidth } = this.options
    if (customWidth && typeof width === 'string') {
      this.canvas.style.width = `${width}`
    } else {
      this.canvas.style.width = `${width}px`
    }

    if (customHeight && typeof width === 'string') {
      this.canvas.style.height = `${height}`
    } else {
      this.canvas.style.height = `${height}px`
    }

    if (this.options.className) {
      this.canvas.setAttribute('class', this.options.className)
    }

    const scale = (window as any).devicePixelRatio
    if (!customWidth && typeof width === 'number') {
      this.canvas.width = Math.floor(width * scale)
    }
    if (!customHeight && typeof height === 'number') {
      this.canvas.height = Math.floor(height * scale)
    }
    this.ctx.scale(scale, scale)
    this.container.appendChild(this.canvas)
  }
}
