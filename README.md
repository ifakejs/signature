# Welcome to @ifake/signature 👋
![Version](https://img.shields.io/npm/v/@ifake/signature)
[![codecov](https://codecov.io/gh/ifakejs/signature/branch/master/graph/badge.svg?token=7nMsRorhf3)](https://codecov.io/gh/ifakejs/signature)
![Npm Bundle Size](https://img.shields.io/bundlephobia/min/@ifake/signature)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/ifakejs/signature/blob/master/LICENSE)
![Build Status](https://travis-ci.org/ifakejs/signature.svg?branch=master)

> A Signature Library For Web & Mobile.

### 🏠 [Homepage](https://github.com/ifakejs/signature)

[DEMO](https://ifakejs.github.io/signature/) is here.

## Install
Make sure you have [node.js](https://nodejs.org/en/) installed on your machine before proceeding.
```sh
# Make sure you have yarn installed on your machine.
yarn add @ifake/signature
# or
npm install @ifake/signature
```

**CDN**

Alternatively, include it via [jsDelivr CDN](https://www.jsdelivr.com/package/npm/@ifake/signature)

UMD:

```html
<script src="https://cdn.jsdelivr.net/npm/@ifake/signature@0.0.4/dist/index.umd.min.js"></script>
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

## Full API
`new IfSignature(options)`

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

## TODO
- [x] Support downloading signatures with a white background. - 2021.1.1
- [ ] Support logging steps to enable undo redo feature

## CHANGELOG
[CHANGELOG](https://github.com/ifakejs/signature/blob/master/CHANGELOG.md) is here.

## Author

👤 **ifake**

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/ifakejs/signature/issues). 

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This project is [MIT](https://github.com/ifakejs/signature/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
