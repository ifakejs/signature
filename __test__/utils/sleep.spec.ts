import { sleep } from '../../src/utils/sleep'

describe('sleep', () => {
  it('should be executed after around one second', () => {
    return sleep(1000).then(status => {
      expect(status).toBe(true)
    })
  })
})
