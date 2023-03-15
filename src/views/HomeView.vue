<script setup>
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification';
import { detectOBS } from '@/components/connectors/OBS';
import { onMounted, ref } from 'vue';
const router = useRouter();
const toast = useToast();
let timer = ref(10);
const getOverlayUrl = () => {
  const url = new URL(window.location.href);
  url.pathname = router.resolve({ name: 'overlay' }).href
  return url.href
}

const getDashboardUrl = () => {
  const url = new URL(window.location.href);
  url.pathname = router.resolve({ name: 'dashboard' }).href
  return url.href
}

const obsCSSOverrides = () => {
  return "html, body, #app { background-color: rgba(0, 0, 0, 0); margin: 0px auto; overflow: hidden; }";
}

const clickToCopy = (event) => {
  navigator.clipboard.writeText(event.target.attributes.value.value);
  toast.success('Copied to clipboard!');
}

const autoRedirectTarget = () => {
  if (detectOBS()) {
    return 'overlay';
  } else {
    return 'dashboard';
  }
}

onMounted(() => {
  setInterval(() => {
    timer.value -= 1;
    if (timer.value == 0) router.push({ name: autoRedirectTarget() });
  }, 1000);
})

</script>

<template>
  <div class="home">
    <img src="@/assets/etsu_logo.png" alt="ETSU Esports Logo" class="home_image" />
    <h1>{{ $t('home.welcome') }}</h1>
    <h3>{{ $t('home.auto_redirect', { path: autoRedirectTarget(), seconds: timer}) }}</h3>
    <h3>{{  $t('home.click_to_copy', { object: "code blocks"}) }}</h3>
    <div class="container">
      <div class="left">
        <h2>Overlay</h2>
        <code @click="clickToCopy($event)" :value="getOverlayUrl()">{{ getOverlayUrl() }}</code>
        <h4>OBS Custom CSS</h4>
        <code lang="css" @click="clickToCopy($event)" :value="obsCSSOverrides()"> {{ obsCSSOverrides() }}</code>
      </div>
      <div class="right">
        <h2>Dashboard</h2>
        <code @click="clickToCopy($event)" :value="getDashboardUrl()">{{ getDashboardUrl() }}</code>
        <h4>Requires Discord authentication. Discord user must be in private ETSU Esports Discord server.</h4>
      </div>
    </div>
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

  .container {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 900px;
    justify-content: space-between;

    code {
      display: block;
      background-color: #ffffff;
      color: #000000;
      padding: 10px;
      border-radius: 5px;
      margin-top: 10px;
      text-align: left;
    }

    .left {
      width: 50%;
      padding: 20px;
    }

    .right {
      width: 50%;
      padding: 20px;
    }
  }
}
</style>