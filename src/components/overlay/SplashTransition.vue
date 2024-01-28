<script setup>
import { overlayDataStore } from '@/store/overlayDataStore';
import { watch } from 'vue';

const overlayData = overlayDataStore();
const game = overlayData.game;
watch(() => overlayData.getReplay(game).showTransition, () => {
    if(overlayData.getReplay(game).showTransition) {
        setTimeout(() => {
          overlayData.updateReplay(game, false, 0);
        }, 1650);
    }
});

</script>

<template>
  <img :src="require(`@/assets/stinger_${overlayData.getReplay(game).color}.gif`)" v-if="overlayData.getReplay(game).showTransition" />
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