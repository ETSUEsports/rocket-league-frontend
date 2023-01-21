<script setup lang="ts">
import LandingPage from "../components/LandingPage.vue";
</script>

<template>
  <v-theme-provider theme="dark">
    <header>
      <picture class="logo">
        <source srcset="@/assets/E_LOGO_WHITE.png" media="(prefers-color-scheme: dark)" width="125" height="125" />
        <img src="@/assets/E_LOGO_BLACK.png" width="125" height="125" />
      </picture>
      <div class="wrapper">
        <LandingPage msg="Coming Soon" />
      </div>
    </header>
  </v-theme-provider>
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.logo {
  padding-right: 15px;
}
</style>
