**Demo**

<ClientOnly>
<signature-guide />
</ClientOnly>

**Source Code**

Note that you need to set the width and height of the canvas
```vue
<template>
  <div>
    <div class="ifake-title">
      <button @click="handleDownload(true)">Download(with guideLine)</button>
      <button @click="handleDownload(false)">Download(without guideLine)</button>
      <button @click="handleClear">Clear</button>
    </div>
    <div id="ifake-guide"></div>
  </div>
</template>

<script>
import { IfSignature } from '@ifake/signature'
export default {
  data() {
    return {
      instance: null
    }
  },
  mounted() {
    this.instance = new IfSignature({
      target: '#ifake-guide',
      guideLine: {
        enable: true
      }
    })
  },
  methods: {
    async handleDownload(flag) {
      // without guideLine
      if (!flag) {
        const blob = await this.instance.getBlobWithWhiteBG()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.setAttribute('download', 'canvas-guideLine')
        a.click()
      } else {
        // with guideLine
        const blob = await this.instance.getBlob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.setAttribute('download', 'canvas')
        a.click()
      }
    },
    handleClear() {
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


#ifake-guide {
  width: 100%;
  height: 400px;
}

#ifake-guide canvas {
  width: 100%;
  height: 100%;
  border: 2px dashed rgb(61, 147, 168);
}
</style>
```