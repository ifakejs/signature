export function sleep(timer = 0): Promise<boolean> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, timer)
  })
}
