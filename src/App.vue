<script setup>
import { GameConnector } from '@/components/connectors/GameWebSocket.js';
import { ControlConnector } from '@/components/connectors/ControlWebSocket.js';
import { appSettingsStore } from './store/appSettingsStore';
import { OBS } from '@/components/connectors/OBS.js';
import { onMounted, provide, reactive } from 'vue';
const appSettings = appSettingsStore();
const obs = new OBS(appSettings.getOBSIP, appSettings.getOBSPort, appSettings.getOBSPassword);
const globalOBS = reactive(obs);
provide('obs', globalOBS);
onMounted(() => {
  GameConnector();
  ControlConnector();
})
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<style>
:root {
  --etsu-primary-navy: #041E42;
  --etsu-primary-gold: #FFC72C;
  --rl-primary-blue: #1873FF;
  --rl-primary-orange: #F48D2E;
  --rl-secondary-blue: #3886FF;
  --rl-secondary-orange: #FFAB5E;
  --etsu-primary-trans: #213043cc;
  --etsu-primary-bg: #213043;
  --etsu-secondary-bg: #283340;
  --etsu-secondary-trans: #21304380;
  --db-primary-bg: #000000;
  --db-secondary-bg: #12151A;
  font-variant-numeric: tabular-nums;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  font-weight: normal;
}

html,
body,
#app {
  height: 100vh;
  margin: 0px auto;
  background-color: var(--db-primary-bg) !important;
}

@font-face {
  font-family: Fyrste;
  src: url("@/assets/fonts/fyrste.ttf") format("truetype");
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
