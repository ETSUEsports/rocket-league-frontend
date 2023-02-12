<script setup>
import { GameConnector } from '@/components/connectors/GameWebSocket.js';
import { gameStateStore } from '@/store/gameStateStore';
import AdPanel from '@/components/overlay/AdPanel.vue';
import GameClock from '@/components/overlay/GameClock.vue';
import PlayerHighlight from '@/components/overlay/PlayerHighlight.vue';
import PlayerList from '@/components/overlay/PlayerList.vue';
// import SplashTransition from '@/components/overlay/SplashTransition.vue';
import TeamInfo from '@/components/overlay/TeamInfo.vue';
import { onMounted, ref } from 'vue';
const gameState = gameStateStore();
const getPlayers = gameState.getPlayers;
const team = (side) => {
  return {
    name: "ETSU",
    image: `https://i.ryois.me/etsu_${side}.png`,
    score: gameState.getTeam(side).score,
    series_score: 2,
  }
};
let game_num = ref(1);
let best_of = ref(5);
onMounted(() => {
  GameConnector();
})
</script>

<template>
  <div class="overlay">
    <!-- <SplashTransition/> -->
    <div class="header" v-if="!gameState.isReplay">
      <PlayerList :players="getPlayers('left')" :reverse=true :highlight="gameState.getHighlightedPlayer" />
      <div class="scoreboard">
        <TeamInfo :team="team('left')" :reverse=true :best_of=best_of :players="getPlayers('left')" />
        <GameClock :time=gameState.scoreboardClock :game_num=game_num :best_of=best_of />
        <TeamInfo :team="team('right')" :reverse=false :best_of=best_of :players="getPlayers('right')" />
      </div>
      <PlayerList :players="getPlayers('right')" :reverse=false :highlight="gameState.getHighlightedPlayer" />
    </div>

    <div class="footer" v-if="!gameState.isReplay">
      <AdPanel class="ads" />
      <div class="player">
        <PlayerHighlight :player="gameState.getHighlightedPlayer" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
html,
body,
#app {
  overflow: hidden;
}

.header {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100vw;
  margin-top: 10px;

  .scoreboard {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  position: absolute;
  width: 100vw;
  bottom: 0;
  height: 165px;

  .ads {
    margin-bottom: 40px;
  }

  .player {
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
}
</style>
