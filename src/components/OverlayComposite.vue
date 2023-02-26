<script setup>
import { GameConnector } from '@/components/connectors/GameWebSocket.js';
import { ControlConnector } from '@/components/connectors/ControlWebSocket.js';
import { detectOBS } from '@/components/connectors/OBS.js';
import { gameStateStore } from '@/store/gameStateStore';
import { overlayDataStore } from '@/store/overlayDataStore';
import AdPanel from '@/components/overlay/AdPanel.vue';
import GameClock from '@/components/overlay/GameClock.vue';
import PlayerHighlight from '@/components/overlay/PlayerHighlight.vue';
import PlayerList from '@/components/overlay/PlayerList.vue';
// import SplashTransition from '@/components/overlay/SplashTransition.vue';
import TeamInfo from '@/components/overlay/TeamInfo.vue';
import { onMounted } from 'vue';
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
onMounted(() => {
  GameConnector();
  ControlConnector();
  detectOBS();
})
</script>

<template>
  <div class="overlay">
    <!-- <SplashTransition/> -->
    <div class="replay" v-if="gameState.isReplay">
      <div class="replay_info">
        <div class="replay_item">
          <div class="replay_value">{{ overlayData.getTeam(gameState.getReplayStats.scorer.teamnum).name }} Goal</div>
        </div>
        <div class="replay_item">
          <div class="replay_label"><img class="replay_icon" src="@/assets/icons/GOAL_ICON.png"></div>
          <div class="replay_value">{{ gameState.getReplayStats.scorer.name || "" }}</div>
        </div>
        <div class="replay_item" v-if="gameState.getReplayStats.assister.name">
          <div class="replay_label"><img class="replay_icon" src="@/assets/icons/ASST_ICON.png"></div>
          <div class="replay_value">{{ gameState.getReplayStats.assister.name || "" }}</div>
        </div>
      </div>
    </div>
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
.replay{
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/replay_border.png');
  z-index: 100;
  .replay_info{
    font-family: 'Fyrste';
    text-transform: lowercase;
    position: relative;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    top: 100%;
    color: #ffffff;
    transform: translateY(-163%);
    background-color: var(--etsu-primary-bg);
    width: 700px;
    height: 60px;
    margin: 0 auto;
    .replay_item{
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 50%;
      .replay_value{
        font-size: 40px;
        text-transform: lowercase;
        margin-left: 5px;
      }
    }
    .replay_label{
      .replay_icon{
        width: 50px;
        height: 50px;
        margin-right: 5px;
      }
    }
  }
}
</style>
