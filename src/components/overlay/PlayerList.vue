<script>

export default {
  props: ['players', 'reverse']
}
</script>

<template>
  <div class="container">
    <div v-for="player in players" :key="player.name">
      <div class="player_boost_bar">
        <h3 :style="`text-align: ${reverse?'left':'right'};`">{{ player.name }}</h3>
        <div class="boost_number">
          <h4 :style="`text-align: ${reverse?'left':'right'};`" class="boost_tag text-center">{{ player.boost }}</h4>
        </div>
        <div class="boost_bar">
          <div :style="`width: ${player.boost}%; float: ${reverse?'left':'right'};`" class="boost_bar_fill"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  color: white;
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: var(--etsu-secondary-trans);
  font-size: 35px;
  width: 330px;

  h3 {
    text-transform: lowercase;
    text-align: left;
    margin-top: auto;
    margin-bottom: 4px;
    font-family: Fyrste;
    font-size: 30px;
  }
  h4 {
    text-transform: lowercase;
    text-align: left;
    margin-top: auto;
    margin-bottom: 4px;
    font-family: Fyrste;
    font-size: 25px;
  }
  .boost_bar_fill {
    width: 100%;
    height: 10px;
    background-color: aqua;
    -webkit-transition: width 0.5s ease-in-out;
    -moz-transition: width 0.5s ease-in-out;
    -o-transition: width 0.5s ease-in-out;
    transition: width 0.5s ease-in-out;
  }
}
</style>