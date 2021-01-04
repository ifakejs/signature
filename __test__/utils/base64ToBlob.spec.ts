import { base64ToBlob } from '../../src/utils/base64ToBlob'

describe('base64ToBlob', () => {
  const base64 =
    'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
  it('should return Blob type data', () => {
    expect(base64ToBlob(base64) instanceof Blob).toBe(true)
  })

  it('empty', () => {
    try {
      // @ts-ignore
      base64ToBlob()
    } catch (e) {
      expect(e.message).toBe('Params can not be empty.')
    }
  })

  it('Invalid dataURI', () => {
    try {
      // @ts-ignore
      base64ToBlob('some,test')
    } catch (e) {
      expect(e.message).toBe('Invalid dataURI.')
    }
  })
})
