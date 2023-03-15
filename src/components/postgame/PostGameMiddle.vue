<script setup>
import { defineProps } from 'vue';
defineProps(['game_num', 'best_of']);
</script>

<template>
  <div class="container">
    <img src="@/assets/etsu_logo.png" alt="ETSU Logo" />
    <p>{{ $t('overlay.game', { game: game_num }) }} - {{ $t('overlay.best_of', { bestOf: best_of }) }}</p>
  </div>
</template>

<style lang="scss" scoped>
  .container{
    background-color: var(--etsu-primary-trans);
    color: white;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 40px;
    height: 110px;
    width: 220px;
    img{
      padding: 10px;
      padding-bottom: 7px;
    }
    font-family: Fyrste;
    p{
      margin-top: auto;
      margin-bottom: 4px;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 20px;
    }
  }
</style>
