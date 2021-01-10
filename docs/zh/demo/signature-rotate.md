**效果**

<ClientOnly>
<signature-rotate />
</ClientOnly>

**源码**

注意要给canvas设置宽高
```vue
<template>
  <!-- 注意要给一个容器 包括宽高 -->
  <div ref="ifakeWrapper" class="ifake-wrapper">
    <!-- 旋转区域 -->
    <div ref="ifake" id="ifake-degree">
      <div class="ifake-title">
        <button @click="handleDownload">下载</button>
        <button @click="handleClear">清除</button>
        <select name="" class="ifake-select" @change="handleChange">
          <option v-for="d in options" :value="d">
            <span>旋转 {{d}}°</span>
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { IfSignature } from '@ifake/signature'
export default {
  data() {
    return {
      instance: null,
      options: [0, 90, 180, -90]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init(degree = 0) {
      // 每次旋转前，先注销canvas
      if (this.instance) {
        this.instance.destory()
        this.instance = null
      }
      this.instance = new IfSignature({
        target: '#ifake-degree',
        degree,
        canvasProcessor: canvas => {
          // 这里可以自定义canvas的一些属性
          console.log(canvas)
        },
        ctxProcessor: ctx => {
          // 这里可以自定义context2d的一些属性
          console.log(ctx)
        }
      })
    },
    handleChange(opt) {
      const degree = ~~opt.target.value
      const w = this.$refs.ifakeWrapper.clientWidth
      const h = this.$refs.ifakeWrapper.clientHeight
      let length = (h - w) / 2
      let width = w
      let height = h
      if (degree === -90) {
        length = -length;
        width = h
        height = w
      } else if (degree === 90) {
        width = h
        height = w
      } else {
        length = 0
        width = w
        height = h
      }
      this.$refs.ifake.setAttribute('style', `
        transform: rotate(${degree}deg) translate(${length}px, ${length}px);
        width: ${width}px;
        height: ${height}px;
        transform-origin: center  center;
      `.replace(/\n*\s/m, ''))
      this.$nextTick(() => {
        this.init(-degree)
      })
    },
    async handleDownload() {
      const blob = await this.instance.getBlobWithWhiteBG()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.setAttribute('download', 'canvas')
      a.click()
    },
    async handleClear() {
      this.instance && this.instance.clear()
    }
  }
}
</script>

<style>
.ifake-title button {
  outline: none;
  border: none;
  color: #fff;
  border-radius: 4px;
  padding: 4px;
  margin-bottom: 10px;
  cursor: pointer;
  padding: 4px 10px;
}

.ifake-title button:nth-child(1) {
  background-color: cadetblue;
}

.ifake-title button:nth-child(2) {
  background-color: rgb(191 166 43);
}

.ifake-select {
  outline: none;
  padding: 4px;
}

.ifake-wrapper {
  width: 100%;
  height: 400px;
}

#ifake-degree {
  height: 100%;
  display: flex;
  flex-direction: column;
}

#ifake-degree canvas {
  flex: 1;
  border: 2px dashed rgb(61, 147, 168);
}
</style>
```