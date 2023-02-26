<script setup>
import { defineProps } from 'vue';
const props = defineProps(['players', 'reverse', 'highlight']);

function playerFocused(player) {
  if (props.highlight == null) return false;
  if (props.highlight.id == player.id) {
    return true;
  } else {
    return false;
  }
}

function boostBarFillColor(player) {
  if (playerFocused(player)) {
    switch (props.reverse) {
      case true:
        return "var(--rl-secondary-blue)";
      default:
        return "var(--rl-secondary-orange)";
    }
  } else {
    switch (props.reverse) {
      case true:
        return "var(--rl-primary-blue)";
      default:
        return "var(--rl-primary-orange)";
    }
  }
}

function playerItemColor(player) {
  if (playerFocused(player)) {
    switch (props.reverse) {
      case true:
        return "var(--rl-primary-blue)";
      default:
        return "var(--rl-primary-orange)";
    }
  } else {
    switch (props.reverse) {
      case true:
        return "var(--etsu-primary-trans)";
      default:
        return "var(--etsu-primary-trans)";
    }
  }
}
</script>

<template>
  <div class="container">
    <div v-for="(player, propertyName, index) in players" :key="player.name" class="playerlist_item"
      :style="`margin-left: ${reverse ? '0' : 'auto'}; margin-right: ${reverse ? 'auto' : '0'}; width: ${330 - index * 10}px; clip-path: ${reverse ? 'polygon(0 0, 98% 0, 100% 100%, 0% 100%)' : 'polygon(2% 0, 100% 0, 100% 100%, 0% 100%)'}; background-color: ${playerItemColor(player)};`">
      <div class="player_boost_bar" :style="`flex-direction: ${reverse ? 'row' : 'row-reverse'};`">
        <h3>{{ player.name }}</h3>
        <h4 class="boost_tag">{{ player.boost }}</h4>
      </div>
      <div class="boost_bar">
        <div
          :style="`width: ${player.boost}%; float: ${reverse ? 'left' : 'right'}; background-color: ${boostBarFillColor(player)};`"
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
  text-overflow: ellipsis;

  .playerlist_item {
    display: flex;
    flex-direction: column;
    width: 300px;
    background-color: var(--etsu-secondary-trans);
    margin-bottom: 5px;

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

  .boost_bar {
    background-color: var(--etsu-secondary-trans);
  }

  .boost_tag {
    padding-right: 5px;
    padding-left: 5px;
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
