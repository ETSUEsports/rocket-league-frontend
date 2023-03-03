<script setup>
import { overlayDataStore } from '@/store/overlayDataStore';
import { watch } from 'vue';

const overlayData = overlayDataStore();

watch(() => overlayData.replay.showTransition, () => {
    if(overlayData.replay.showTransition) {
        setTimeout(() => {
          overlayData.updateReplay(false, 0);
        }, 1650);
    }
});

</script>

<template>
  <img :src="require(`@/assets/stinger_${overlayData.replay.color}.gif`)" v-if="overlayData.replay.showTransition" />
</template>

<style lang="scss" scoped>
img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
}
</style>