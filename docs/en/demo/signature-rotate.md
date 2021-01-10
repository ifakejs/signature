**Demo**

<ClientOnly>
<signature-rotate />
</ClientOnly>

**Source Code**

Note that you need to set the width and height of the canvas
```vue
<template>
  <!-- Be careful to include the width and height of a container -->
  <div ref="ifakeWrapper" class="ifake-wrapper">
    <!-- Rotating area -->
    <div ref="ifake" id="ifake-degree">
      <div class="ifake-title">
        <button @click="handleDownload">Download</button>
        <button @click="handleClear">Clear</button>
        <select name="" class="ifake-select" @change="handleChange">
          <option v-for="d in options" :value="d">
            <span>Rotate {{d}}°</span>
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
      // Before each rotation, unsign Canvas
      if (this.instance) {
        this.instance.destory()
        this.instance = null
      }
      this.instance = new IfSignature({
        target: '#ifake-degree',
        degree,
        canvasProcessor: canvas => {
          // You can customize some properties of Canvas here
          console.log(canvas)
        },
        ctxProcessor: ctx => {
          // Some properties of Context2D can be customized here
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