<script setup>
import { Carousel, Slide } from 'vue3-carousel';
import { ref } from 'vue';
import 'vue3-carousel/dist/carousel.css';
const ads = ref(['@/assets/ads/etsu_online.png', '@/assets/ads/mgp.png', '@/assets/ads/etsuesports_socials.png']);
</script>

<template>
  <div class="container">
    <div class="top">
      <Carousel :autoplay="5000" :mouseDrag="false" :touchDrag="false" :wrap-around="true">
        <Slide v-for="slide in ads" :key="slide">
          <img class="ad" :src="slide" />
        </Slide>
      </Carousel>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin-left: 50px;
  width: 400px;
  height: 82px;
  background-image: url('@/assets/TN_AdPlace.png');
  background-size: cover;
  bottom: 0px;
  .ad {
    display: block;
    max-width: 90%;
    max-height: 90%;
    width: auto;
    height: auto;
  }
}

.top {
  position: relative;
  margin-left: 75px;
  margin-top: 10px;
  width: 250px;
}
</style>
