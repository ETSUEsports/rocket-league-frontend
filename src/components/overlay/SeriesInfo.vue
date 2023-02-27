<script setup>
import { defineProps } from 'vue';
defineProps(['name']);
</script>

<template>
  <div class="container" style="clip-path: polygon(0% 0, 100% 0, 98% 100%, 6% 100%);">
    <p>{{ name }}</p>
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
    height: 25px;
    width: 100%;
    h1{
      margin: 0;
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
