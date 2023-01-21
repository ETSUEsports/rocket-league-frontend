<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/E_LOGO_RGB.png">
    <LandingPage msg="Welcome to ETSU Esports Rocket League Overlay" />
  </div>
</template>

<script>
import LandingPage from '@/components/LandingPage.vue'

export default {
  name: 'HomeView',
  components: {
    LandingPage
  }
}
</script>
