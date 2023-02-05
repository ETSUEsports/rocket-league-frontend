<script>

export default {
  props: ['players', 'reverse']
}
</script>

<template>
  <div class="container">
    <div v-for="(player, index) in players" :key="player.name" class="playerlist_item" :style="`margin-left: ${reverse ? '0' : 'auto'}; margin-right: ${reverse ? 'auto' : '0'}; width: ${330-index*10}px; clip-path: ${reverse ? 'polygon(0 0, 98% 0, 100% 100%, 0% 100%)' : 'polygon(2% 0, 100% 0, 100% 100%, 0% 100%)'};`">
      <div class="player_boost_bar" :style="`flex-direction: ${reverse ? 'row' : 'row-reverse'};`">
        <h3>{{ player.name }}</h3>
        <h4 class="boost_tag">{{ player.boost }}</h4>
      </div>
      <div class="boost_bar">
        <div
          :style="`width: ${player.boost}%; float: ${reverse ? 'left' : 'right'}; background-color: ${reverse ? 'var(--rl-primary-blue)' : 'var(--rl-primary-orange)'};`"
          class="boost_bar_fill"></div>
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
  font-size: 35px;
  width: 330px;

  .playerlist_item {
    display: flex;
    flex-direction: column;
    background-color: var(--etsu-secondary-trans);
    margin-bottom: 10px;
    h3 {
      text-transform: lowercase;
      text-align: left;
      margin-top: auto;
      margin-bottom: 4px;
      font-family: Fyrste;
      font-size: 30px;
      margin-right: 10px;
      margin-left: 10px;
    }

    h4 {
      text-transform: lowercase;
      text-align: left;
      margin-top: auto;
      margin-bottom: 4px;
      font-family: Fyrste;
      font-size: 25px;
      margin-right: 10px;
      margin-left: 10px;
    }
  }

  .player_boost_bar {
    flex-wrap: wrap;
    display: flex;
    justify-content: space-between;
  }
  .boost_bar{
    background-color: var(--etsu-secondary-trans);
  }
  .boost_bar_fill {
    width: 100%;
    height: 10px;
    -webkit-transition: width 0.5s ease-in-out;
    -moz-transition: width 0.5s ease-in-out;
    -o-transition: width 0.5s ease-in-out;
    transition: width 0.5s ease-in-out;
  }
}
</style>