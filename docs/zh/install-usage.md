## 安装
安装之前确保已经安装了[node.js](https://nodejs.org/en/).
```sh
yarn add @ifake/signature
# or
npm install @ifake/signature
```

## CDN
[jsDelivr CDN](https://www.jsdelivr.com/package/npm/@ifake/signature)

UMD:

```html
<!-- 版本号请使用最新版本 -->
<script src="https://cdn.jsdelivr.net/npm/@ifake/signature@0.5.1/dist/index.umd.min.js"></script>
```

## 使用

- Browser

```js
// 我们提供了一个全局变量 `IfSignature` 以便使用CDN时直接在浏览器端使用.

const IfSignature = window.IfSignature
```

- ES6 Module

```js
import { IfSignature } from '@ifake/signature'
```

**使用**
```js
new IfSignature({
  // canvas父容器, 因为当前库会自动生成canvas元素到指定容器
  target: '#app'
})
```

## API
`new IfSignature(options)`

### Options
```ts
// 网格配置
interface GuideLine {
  // 是否开启网格, 默认false
  enable: boolean
  // 默认 20
  step: number
  // 默认 #f5f5f5
  lineColor: string
  // 默认 0.5
  lineWidth: number
}
// 实例化配置参数
interface Options {
  // 画布的父容器
  target: string,
  // 画布class name
  className?: string
  lineWidth?: number
  lineCap?: CanvasLineCap
  lineJoin?: CanvasLineJoin
  strokeStyle?: string | CanvasGradient | CanvasPattern
  // 是否全屏宽度高度
  fullPage?: boolean
  // 旋转角度
  degree?: number
  // 网格线配置
  guideLine?: GuideLine
  // 可以在这个函数中获得画布实例
  canvasProcessor?: (canvas: HTMLCanvasElement) => void
  // 可以在这个函数中获得Context2d实例
  ctxProcessor?: (ctx: CanvasRenderingContext2D) => void
}
```

### 实例方法

```ts
interface CanvasParams {
  // 默认 image/png
  type?: string 
  // 默认 0.92
  quality?: number
}

interface Methods {
  // 移除canvas
  destory(): void
  // 清除画布
  clear(): void
  // 获取png, base64字符串
  getPngImage(quality?: any): Promise<string>
  // 获取jpg, base64字符串
  getJpgImage(quality?: any): Promise<string>
  // 获取blob数据, 以便进行上传下载等操作
  getBlob(canvasParams?: CanvasParams): Promise<Blob>
  // 获取带有白色背景的blob数据, 以便进行上传下载等操作
  getBlobWithWhiteBG(canvasParams?: CanvasParams): Promise<Blob>
}
```

## 更新日志
[CHANGELOG](https://github.com/ifakejs/signature/blob/master/CHANGELOG.md) is here.