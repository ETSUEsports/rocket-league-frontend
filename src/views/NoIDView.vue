<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue';
const router = useRouter();
let timer = ref(10);

onMounted(() => {
  setInterval(() => {
    timer.value -= 1;
    if (timer.value == 0) router.push({ name: 'home'});
  }, 1000);
})

</script>

<template>
  <div class="home">
    <img src="@/assets/etsu_logo.png" alt="ETSU Esports Logo" class="home_image" />
    <h1>No ID provided, going back to the homepage</h1>
    <h3>{{ $t('home.auto_redirect', { path: 'dashboard', seconds: timer}) }}</h3>
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #ffffff;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  margin-top: 60px;

  .home_image {
    width: 100%;
    max-width: 500px;
  }
}
</style>