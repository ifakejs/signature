## Installation
Make sure you have [node.js](https://nodejs.org/en/) installed on your machine before proceeding.
```sh
# Make sure you have yarn installed on your machine.
yarn add @ifake/signature
# or
npm install @ifake/signature
```

## CDN
[jsDelivr CDN](https://www.jsdelivr.com/package/npm/@ifake/signature)

UMD:

```html
<!-- Please use latest stable version -->
<script src="https://cdn.jsdelivr.net/npm/@ifake/signature@0.5.1/dist/index.umd.min.js"></script>
```

## Usage

- Browser

```js
// We expose a global variable that can be used directly in the browser.
const IfSignature = window.IfSignature
```

- ES6 Module

```js
import { IfSignature } from '@ifake/signature'
```

**Usage**
```js
new IfSignature({
  // the container of the canvas
  target: '#app'
})
```

## API
### Options
```ts
interface GuideLine {
  enable: boolean
  step: number
  lineColor: string
  lineWidth: number
}
interface Options {
  // the container of the canvas
  target: string,
  // canvas class name
  className?: string
  lineWidth?: number
  lineCap?: CanvasLineCap
  lineJoin?: CanvasLineJoin
  strokeStyle?: string | CanvasGradient | CanvasPattern
  // is full screen?
  fullPage?: boolean
  // rotation degree
  degree?: number
  // guideLine config
  guideLine?: GuideLine
  // you can get the canvas in this function
  canvasProcessor?: (canvas: HTMLCanvasElement) => void
  // you can get the context2D instance in this function
  ctxProcessor?: (ctx: CanvasRenderingContext2D) => void
}
```

### Instance methods

```ts
interface CanvasParams {
  type?: string 
  quality?: number
}

interface Methods {
  // remove the canvas
  destory(): void
  // clear the canvas
  clear(): void
  // get the base64 string of png
  getPngImage(quality?: any): Promise<string>
  // get the base64 string of jpg
  getJpgImage(quality?: any): Promise<string>
  // get the blob data
  // default { type = 'image/png', quality = 0.92 } 
  getBlob(canvasParams?: CanvasParams): Promise<Blob>
  // get the blob data with white background
  // default { type = 'image/png', quality = 0.92 } 
  getBlobWithWhiteBG(canvasParams?: CanvasParams): Promise<Blob>
}
```

## CHANGELOG
[CHANGELOG](https://github.com/ifakejs/signature/blob/master/CHANGELOG.md) is here.