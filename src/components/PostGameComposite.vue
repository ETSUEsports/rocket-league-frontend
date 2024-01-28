<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { gameStateStore } from '@/store/gameStateStore';
import { overlayDataStore } from '@/store/overlayDataStore';
import TeamInfo from '@/components/overlay/TeamInfo.vue';
import PostGameMiddle from './postgame/PostGameMiddle.vue';
import PostGameTable from './postgame/PostGameTable.vue';
import router from '@/router';
const gameState = gameStateStore();
const overlayData = overlayDataStore();
const game = overlayData.game;
const getPlayers = gameState.getPostPlayers;
const team = (side) => {
  return {
    name: overlayData.getTeam(game, side).name,
    image: overlayData.getTeam(game, side).image,
    score: gameState.getTeam(side).score,
    series_score: overlayData.getTeam(game, side).score,
  }
};

onMounted(() => {
  window.addEventListener('keydown', onKeyPress);
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyPress);
})

function onKeyPress(e) {
  if (e.key == 'o') {
    router.push({ name: 'overlay' });
  }
}

</script>

<template>
  <div class="postgame">
    <div class="header">
      <div class="scoreboard">
        <TeamInfo :team="team('left')" :reverse=true :best_of=overlayData.getSeries(game).bestOf :players="getPlayers('left')" />
        <PostGameMiddle :time=gameState.scoreboardClock :game_num=overlayData.getSeries(game).gameNumber :best_of=overlayData.getSeries(game).bestOf />
        <TeamInfo :team="team('right')" :reverse=false :best_of=overlayData.getSeries(game).bestOf :players="getPlayers('right')" />
      </div>
    </div>
    <PostGameTable />
  </div>
</template>

<style lang="scss" scoped>
html,
body,
.postgame {
  overflow: hidden;
  background-color: #181b26;
  width: 100%;
  height: 100%;
}
.header {
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 100vw;
  margin-top: 10px;

  .scoreboard {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
  }
}

</style>
