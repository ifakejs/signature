import { OptionsConstructor } from '../src/Options'

describe('Options', () => {
  let opts: OptionsConstructor
  const defOptions = {
    className: 'ifake-signature',
    lineWidth: 4,
    lineCap: 'round',
    lineJoin: 'round',
    strokeStyle: '#333',
    fullPage: false,
    isMobile: false,
    devicePixelRatio: 1,
    degree: 0
  }

  beforeEach(() => {
    opts = new OptionsConstructor()
  })

  it('initial default options', () => {
    expect(opts).toEqual(defOptions)
  })

  it('merge options', () => {
    opts.merge({
      lineWidth: 999,
      fullPage: true
    })
    expect(opts).toEqual({
      ...defOptions,
      lineWidth: 999,
      fullPage: true
    })
  })

  it('merge without options', () => {
    opts.merge()
    expect(opts).toEqual(defOptions)
  })

  it('isMobile can not be override', () => {
    opts.merge({
      isMobile: true
    })
    expect(opts).toEqual({
      ...defOptions,
      isMobile: false
    })
  })

  it('devicePixelRatio can not be override', () => {
    opts.merge({
      devicePixelRatio: 10
    })
    expect(opts).toEqual({
      ...defOptions,
      devicePixelRatio: 1
    })
  })

  describe('devicePixelRatio', () => {
    const originalDevicePixelRatio = window.devicePixelRatio
    beforeAll(() => {
      Object.defineProperty(window, 'devicePixelRatio', {
        value: 3
      })
    })

    afterAll(() => {
      Object.defineProperty(window, 'devicePixelRatio', {
        value: originalDevicePixelRatio
      })
    })
    it('real machine devicePixelRatio', () => {
      expect(opts.devicePixelRatio).toBe(3)
    })
  })
})
