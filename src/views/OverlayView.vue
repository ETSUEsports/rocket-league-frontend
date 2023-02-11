<template>
    <OverlayComposite />
</template>

<script>
// @ is an alias to /src
import OverlayComposite from '@/components/OverlayComposite.vue'

export default {
  name: 'OverlayView',
  components: {
    OverlayComposite
  }
}
</script>

<style lang="scss" scoped>
html, body, #app{
  overflow: hidden;
}
</style>
