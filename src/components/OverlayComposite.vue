<script setup>
import { gameStateStore } from '@/store/gameStateStore';
import { overlayDataStore } from '@/store/overlayDataStore';
import AdPanel from '@/components/overlay/AdPanel.vue';
import GameClock from '@/components/overlay/GameClock.vue';
import PlayerHighlight from '@/components/overlay/PlayerHighlight.vue';
import PlayerList from '@/components/overlay/PlayerList.vue';
import ReplayComposite from '@/components/replay/ReplayComposite.vue';
// import SplashTransition from '@/components/overlay/SplashTransition.vue';
import TeamInfo from '@/components/overlay/TeamInfo.vue';
const gameState = gameStateStore();
const overlayData = overlayDataStore();
const getPlayers = gameState.getPlayers;
const team = (side) => {
  return {
    name: overlayData.getTeam(side).name,
    image: overlayData.getTeam(side).image,
    score: gameState.getTeam(side).score,
    series_score: overlayData.getTeam(side).score,
  }
};

</script>

<template>
  <div class="overlay">
    <!-- <SplashTransition/> -->
    <ReplayComposite v-if="gameState.isReplay && !gameState.hasWinner"/>
    <div class="header" v-if="!gameState.isReplay && !gameState.hasWinner">
      <PlayerList :players="getPlayers('left')" :reverse=true :highlight="gameState.getHighlightedPlayer" />
      <div class="scoreboard">
        <TeamInfo :team="team('left')" :reverse=true :best_of=overlayData.getSeries.bestOf :players="getPlayers('left')" />
        <GameClock :time=gameState.scoreboardClock :game_num=overlayData.getSeries.gameNumber :best_of=overlayData.getSeries.bestOf />
        <TeamInfo :team="team('right')" :reverse=false :best_of=overlayData.getSeries.bestOf :players="getPlayers('right')" />
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
