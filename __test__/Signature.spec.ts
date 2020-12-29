import { IfSignature } from '../src'
import { $ } from '../src/utils/dom'

describe('Signature', () => {
  let instance: IfSignature | null, canvas: HTMLCanvasElement
  describe('Basic', () => {
    beforeEach(() => {
      document.body.innerHTML = `
      <div id="app">
          <div class="app-title">test title</div>
      </div>
    `
      instance = new IfSignature({
        target: '#app'
      })
      canvas = $('canvas') as HTMLCanvasElement
    })

    afterEach(() => {
      instance = null
    })
    it('app contains 2 chindren', () => {
      expect(($('#app') as HTMLElement).children.length).toBe(2)
    })

    it('should auto create a canva element', () => {
      expect(canvas).toBeTruthy()
    })

    it('destory', () => {
      ;(instance as IfSignature).destory()
      expect($('canvas')).toBeFalsy()
    })
  })

  describe('Method', () => {
    beforeEach(() => {
      document.body.innerHTML = `
      <div id="app">
          <div class="app-title">test title</div>
      </div>
    `
      instance = new IfSignature({
        target: '#app',
        canvasProcessor: canvas => {
          canvas.width = 3000
        },
        ctxProcessor: ctx => {
          ctx.lineWidth = 30
        }
      })
    })

    afterEach(() => {
      instance = null
    })

    it('canvasProcessor', () => {
      expect((instance as IfSignature).options.canvasProcessor).toBeTruthy()
      expect(($('canvas') as HTMLElement).getAttribute('width')).toBe('3000')
    })

    it('ctxProcessor', () => {
      expect((instance as IfSignature).options.ctxProcessor).toBeTruthy()
      // 此处 ctxProcessor 需要考虑是否更新options逻辑 写测试时发现ctx.lineWidth更新, 但是options未更新
      expect((instance as IfSignature).ctx.lineWidth).toBe(30)
    })
  })
})
