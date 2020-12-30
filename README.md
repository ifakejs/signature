# Welcome to @ifake/signature 👋
![Version](https://img.shields.io/npm/v/@ifake/signature)
[![codecov](https://codecov.io/gh/ifakejs/signature/branch/master/graph/badge.svg?token=7nMsRorhf3)](https://codecov.io/gh/ifakejs/signature)
![Npm Bundle Size](https://img.shields.io/bundlephobia/min/@ifake/signature)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/ifakejs/signature/blob/master/LICENSE)
![Build Status](https://travis-ci.org/ifakejs/signature.svg?branch=master)

> A Signature Library For Web & Mobile.

### 🏠 [Homepage](https://github.com/ifakejs/signature)

## Install
Make sure you have node.js installed on your machine before proceeding.
```sh
yarn add @ifake/signature
# or
npm install @ifake/signature
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
interface Options {
  target: string,
  className?: string
  lineWidth?: number
  lineCap?: CanvasLineCap
  lineJoin?: CanvasLineJoin
  strokeStyle?: string | CanvasGradient | CanvasPattern
  fullPage?: boolean
  degree?: number
  canvasProcessor?: (ctx: HTMLCanvasElement) => void
  ctxProcessor?: (ctx: CanvasRenderingContext2D) => void
}
```

### Instance methods

```ts
interface Methods {
   destory(): void
   clear(): void
   getPngImage(quality?: any): Promise<string>
   getJpgImage(quality?: any): Promise<string>
   getBlob(): Promise<Blob>
}
```

## Author

👤 **ifake**

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/ifakejs/signature/issues). 

## Show your support

Give a ⭐️ if this project helped you!

[![support us](https://img.shields.io/badge/become-a patreon%20us-orange.svg?cacheSeconds=2592000)](https://www.patreon.com/ )


## 📝 License

This project is [MIT](https://github.com/ifakejs/signature/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
