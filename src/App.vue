<template>
  <router-view />
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
  --etsu-secondary-trans: #21304380;
  font-variant-numeric: tabular-nums;
}

h1,h2,h3,h4,h5,h6,p{
  font-weight: normal;
}

html,
body, #app {
  height: 100vh;
  overflow: hidden;
  margin: 0px auto;
}
@font-face {
    font-family: Fyrste;
    src: url("@/assets/fonts/fyrste.ttf") format("truetype");
}
</style>
