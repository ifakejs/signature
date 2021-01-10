**效果**

<ClientOnly>
<signature-default />
</ClientOnly>

**源码**

注意要给canvas设置宽高
```vue
<template>
  <div class="ifake-signature"></div>
</template>

<script>
import { IfSignature } from '@ifake/signature'
export default {
  mounted() {
    new IfSignature({
      target: '.ifake-signature'
    })
  }
}
</script>

<style>
.ifake-signature {
  width: 100%;
  height: 400px;
}

.ifake-signature canvas {
  width: 100%;
  height: 100%;
  border: 2px dashed rgb(61, 147, 168);
}
</style>
```