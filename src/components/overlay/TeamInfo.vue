<script>

export default {
  props:['team', 'reverse', 'best_of', 'players'],
  computed: {
    bestOf() {
      switch(this.best_of){
        case 3:
          return 2;
        case 5:
          return 3;
        case 7:
          return 4;
        default:
          return 3;
      }
    }
  }
}
</script>


<template>
  <div class="container" :style="`flex-direction: ${reverse?'row':'row-reverse'};`">
    <div class="top" :style="`clip-path: ${reverse?'polygon(0% 0, 100% 0, 100% 100%, 6% 100%)':'polygon(0% 0, 100% 0, 94% 100%, 0% 100%)'};`">
      <div class="info" :style="`flex-direction: ${reverse?'row':'row-reverse'}; background: url(${team.image}), var(--etsu-secondary-trans); background-repeat: no-repeat; background-position: ${reverse?'left':'right'}; justify-content: ${!reverse?'start':'end'};`">
        <div class="pair">
        <h1 class="name" :style="`text-align: ${reverse?'right':'left'};`">{{ team.name }}</h1>
        <div class="wins">
          <div v-for="index in bestOf" :key="index">
            <div class="win"></div>
          </div>
        </div>
        </div>
        <h1 :style="`background-color: ${reverse?'var(--rl-primary-blue)':'var(--rl-primary-orange)'};`" class="score">{{ team.score }}</h1>
      </div>
      <div :style="`background-color: ${reverse?'var(--rl-primary-blue)':'var(--rl-primary-orange)'}; text-align: ${reverse?'right':'left'};`">
        <h1 class="players">{{ Object.values(players).map(player => player.name).join(", ") }}</h1>
      </div>
    </div>
  </div>

</template>


<style lang="scss" scoped>

.top{
  height: 110px;
  font-family: Fyrste;
  color: #ffffff;
  display: flex;
  text-transform: lowercase;
  flex-direction: column;
  h1{
    font-size: 2.8em;
  }

  .score{
    width: 100px;
    margin-top: 0;
    margin-bottom: 0;
    font-size: 5em;
    text-align: center;

  }
  .name{
    margin: 10px;
  }
  .info{
    width: 382px;
    height: 86px;
    display: flex;
    background-size: cover;    
  }

  .players{
    font-size: 16px;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    margin: 3px;
    margin-left: 10px;
    margin-right: 10px;
    text-transform: none;
  }
  .wins{
    display: flex;
    flex-direction: row;
    margin-left: 10px;
    margin-right: 10px;
  }
  .win{
    width: 25px;
    height: 4px;
    background-color: rgba(255,255,255, 0.3);
    padding: 2px;
    margin-left: 4px;
    margin-right: 4px;
  }
  .won{
    background-color: rgba(255,255,255);
  }
}

</style>