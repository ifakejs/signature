<template>
  <div>
    <div class="ifake-title">
      <button @click="handleDownload(true)">{{ trans[language].download }}</button>
      <button @click="handleDownload(false)">{{ trans[language].downloadWithOutGuide }}</button>
      <button @click="handleClear">{{ trans[language].clear }}</button>
    </div>
    <div id="ifake-guide"></div>
  </div>
</template>

<script>
import { IfSignature } from '@ifake/signature'
export default {
  data() {
    return {
      instance: null,
      language: 'zh',
      trans: {
        zh: {
          download: '下载(含网格)',
          downloadWithOutGuide: '下载(不含网格)',
          clear: '清除'
        },
        en: {
          download: 'Download(with guideLine)',
          downloadWithOutGuide: 'Download(without guideLine)',
          clear: 'Clear'
        }
      }
    }
  },
  mounted() {
    const $t = document.documentElement.getAttribute('lang')
    this.language = $t === 'en-US' ? 'en' : 'zh'
    this.instance = new IfSignature({
      target: '#ifake-guide',
      guideLine: {
        enable: true
      }
    })
  },
  methods: {
    async handleDownload(flag) {
      // 不包含网格
      if (!flag) {
        const blob = await this.instance.getBlobWithWhiteBG()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.setAttribute('download', 'canvas-guideLine')
        a.click()
      } else {
        // 包含网格
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

.ifake-title button:nth-child(3) {
  background-color: rgb(52 191 43);
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