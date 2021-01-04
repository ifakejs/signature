export function base64ToBlob(dataURI: string) {
  if (!dataURI) {
    throw new Error('Params can not be empty.')
  }
  let mimeString: string
  try {
    mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  } catch (e) {
    throw new Error('Invalid dataURI.')
  }

  const byteString = atob(dataURI.split(',')[1])
  const arrayBuffer = new ArrayBuffer(byteString.length)
  const intArray = new Uint8Array(arrayBuffer)
  const byteLen = byteString.length

  for (let i = 0; i < byteLen; i++) {
    intArray[i] = byteString.charCodeAt(i)
  }
  return new Blob([intArray], { type: mimeString })
}
