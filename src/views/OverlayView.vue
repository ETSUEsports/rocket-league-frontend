<template>
  <h1>test</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTheme } from 'vuetify'

export default defineComponent({
  name: 'Overlay',
  setup() {
    const theme = useTheme()
    return {
      theme,
      toggleTheme: () => theme.global.name.value = 'overlay'
    }
  },
  mounted() {
    this.toggleTheme();
  },
  data() {
    return {
      //
    }
  },
})
</script>
<style scoped>

</style>