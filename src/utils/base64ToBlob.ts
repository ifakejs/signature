export function base64ToBlob(dataURI: string) {
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  const byteString = atob(dataURI.split(',')[1])
  const arrayBuffer = new ArrayBuffer(byteString.length)
  const intArray = new Uint8Array(arrayBuffer)
  const byteLen = byteString.length

  for (let i = 0; i < byteLen; i++) {
    intArray[i] = byteString.charCodeAt(i)
  }
  return new Blob([intArray], { type: mimeString })
}
