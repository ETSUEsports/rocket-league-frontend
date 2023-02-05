<script>

export default {
  props: ['time','game_num','best_of']
}
</script>

<template>
  <div class="container">
    <h1>{{ time }}</h1>
    <p>Game {{ game_num }} - Best of {{ best_of }}</p>
  </div>
</template>

<style lang="scss" scoped>
  .container{
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: var(--etsu-primary-trans);
  }
</style>
