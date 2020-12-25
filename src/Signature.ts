import deepMerge from 'deepmerge'
import { $, create } from './utils/dom'
import { Options, GetOption } from './type'
import { getOption } from './config'

type SigOptions = Partial<Options> & Partial<GetOption>

export class IfSignature {
  public options: SigOptions
  public container: Element
  public canvas: HTMLCanvasElement
  public ctx: CanvasRenderingContext2D
  constructor(options: Options) {
    const { target } = options
    if (!target) {
      throw 'The option [target] must be a string and recommend input an id. e.g: #app'
    }
    this.options = deepMerge(options, getOption())
    this.container = <Element>$(target)
    this.canvas = create('canvas') as HTMLCanvasElement
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d')
    console.log(this.options)
  }

  render() {
    const { styles } = this.options
    const { width, height } = styles as any
    this.canvas.style.width = `${width}px`
    this.canvas.style.height = `${height}px`

    if (this.options.className) {
      this.canvas.setAttribute('class', this.options.className)
    }

    const scale = (window as any).devicePixelRatio
    this.canvas.width = Math.floor(width * scale)
    this.canvas.height = Math.floor(height * scale)
    this.ctx.scale(scale, scale)
    this.container.appendChild(this.canvas)
  }
}
