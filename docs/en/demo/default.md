**DEMO**

<ClientOnly>
<signature-default />
</ClientOnly>

**Souce Code**

Note that you need to set the width and height of the canvas
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