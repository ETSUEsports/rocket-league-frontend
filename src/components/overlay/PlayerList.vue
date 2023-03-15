<script setup>
import { gameStateStore } from '@/store/gameStateStore';
import { defineProps, onMounted } from 'vue';
const props = defineProps(['players', 'reverse', 'highlight']);
const gameState = gameStateStore();
let clipPath = "";
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

function statfeedIcon(event) {
  console.log(event);
  const image = require(`@/assets/icons/${event}.png`);
  return image;
}

onMounted(() => {
  switch (props.reverse) {
    case true:
      clipPath = "polygon(0 0, 98% 0, 100% 100%, 0% 100%)";
      break;
    default:
      clipPath = "polygon(2% 0, 100% 0, 100% 100%, 0% 100%)";
      break;
  }
});
</script>

<template>
  <div class="container">
    <div v-for="(player, propertyName, index) in players" :key="player.name" class="playerlist_item"
      :style="`margin-left: ${reverse ? '0' : 'auto'}; margin-right: ${reverse ? 'auto' : '0'}; width: ${330 - index * 10}px; clip-path: ${clipPath}; background-color: ${playerItemColor(player)};`">
      <div class="toprow" :style="`flex-direction: ${reverse ? 'row' : 'row-reverse'};`">
        <div class="left">
          <h3 class="player_name">{{ player.name }}</h3>
        </div>
        <div class="right" :style="`flex-direction: ${reverse ? 'row' : 'row-reverse'};`">
          <h4 class="boost_tag">{{ player.boost }}</h4>
          <div class="statfeed_events" v-if="gameState.getStatfeedIconForPlayer(player.id)">
            <img :src="statfeedIcon(gameState.getStatfeedIconForPlayer(player.id))" class="statfeed_icon" />
          </div>
        </div>
      </div>
      <div class="bottomrow">
        <div class="boost_bar">
          <div
            :style="`width: ${player.boost}%; float: ${reverse ? 'left' : 'right'}; background-color: ${boostBarFillColor(player)};`"
            class="boost_bar_fill"></div>
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
  font-size: 35px;
  width: 330px;
  text-overflow: ellipsis;

  .playerlist_item {
    display: flex;
    flex-direction: column;
    width: 300px;
    background-color: var(--etsu-secondary-trans);
    margin-bottom: 5px;

    .toprow {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 5px;
      margin-bottom: 5px;
      width: 100%;
      height: 20px;

      .left {
        display: flex;
        flex-direction: row;
        height: 20px;
        position: relative;
        bottom: 5px;

        .player_name {
          text-transform: lowercase;
          text-align: left;
          margin-top: auto;
          margin-bottom: 4px;
          font-family: Fyrste;
          font-size: 30px;
          line-height: 30px;
          margin-right: 10px;
          margin-left: 10px;

        }
      }

      .right {
        display: flex;
        flex-direction: row;
        height: 20px;

        .boost_tag {
          padding-right: 5px;
          padding-left: 5px;
          text-transform: lowercase;
          text-align: left;
          margin-top: auto;
          margin-bottom: 4px;
          font-family: Fyrste;
          font-size: 25px;
          margin-right: 10px;
          margin-left: 10px;

          -webkit-transition: width 0.5s ease-in-out;
          -moz-transition: width 0.5s ease-in-out;
          -o-transition: width 0.5s ease-in-out;
          transition: width 0.5s ease-in-out;
        }

        .statfeed_events {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-top: 5px;
          margin-bottom: 5px;
          width: 100%;
          height: 30px;
          padding-left: 10px;
          padding-right: 10px;
          -webkit-transition: width 0.5s ease-in-out;
          -moz-transition: width 0.5s ease-in-out;
          -o-transition: width 0.5s ease-in-out;
          transition: width 0.5s ease-in-out;

          .statfeed_icon {
            width: 30px;
            height: 30px;
            -webkit-transition: width 0.5s ease-in-out;
            -moz-transition: width 0.5s ease-in-out;
            -o-transition: width 0.5s ease-in-out;
            transition: width 0.5s ease-in-out;
          }
        }

      }
    }

    .bottomrow {
      width: 100%;
      height: 10px;

      .boost_bar {
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
  }
}
</style>
