<script>

export default {
  props:['players']
}
</script>

<template>
  <div class="container">
    <div v-for="player in players" :key="player.name"><p>{{player.name}}</p><div class="boost"></div></div>
  </div>
</template>
<style lang="scss" scoped>
  .container{
    color: white;
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: var(--etsu-primary-trans);
    font-size: 35px;
    width: 220px;

    p{
      text-transform: lowercase;
      text-align: left;
      margin-top: auto;
      margin-bottom: 4px;
      font-family: Fyrste;
      font-size: 20px;
    }
    .boost{
      width: 100%;
      height: 10px;
      background-color: aqua;
    }
  }
</style>