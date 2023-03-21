<script setup>
import { gameStateStore } from '@/store/gameStateStore';
import { overlayDataStore } from '@/store/overlayDataStore';
import AdPanel from '@/components/overlay/AdPanel.vue';
import GameClock from '@/components/overlay/GameClock.vue';
import PlayerHighlight from '@/components/overlay/PlayerHighlight.vue';
import PlayerList from '@/components/overlay/PlayerList.vue';
import ReplayComposite from '@/components/replay/ReplayComposite.vue';
import SplashTransition from '@/components/overlay/SplashTransition.vue';
import TeamInfo from '@/components/overlay/TeamInfo.vue';
import AppSettings from './modal/AppSettings.vue';
// import { inject } from 'vue';
import { ref, onMounted, onBeforeUnmount  } from 'vue';
import { useRouter } from 'vue-router';
// const obs = inject('obs');
const router = useRouter()
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
  window.addEventListener('keydown', onKeyPress);
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyPress);
})

function onKeyPress(e) {
  if (e.key == 's') {
    showSettings.value = true;
    window.removeEventListener('keydown', onKeyPress);
  }
  if (e.key == 'p') {
    router.push({ name: 'post-game-stats' });
  }
  if (e.key == 'Escape') {
    showSettings.value = false;
    window.addEventListener('keydown', onKeyPress);
  }
  // if (e.key == 'm') {
    // obs.muteAudio();
  // }
  // if (e.key == 'u') {
    // obs.unmuteAudio();
  // }
}

let showSettings = ref(false);
</script>

<template>
  <div class="overlay">
    <SplashTransition/>
    <transition name="modal">
      <AppSettings v-if="showSettings" @close="showSettings = false" />
    </transition>
    <ReplayComposite v-if="gameState.isReplay && !gameState.hasWinner" />
    <div class="header" v-if="!gameState.isReplay && !gameState.hasWinner">
      <PlayerList :players="getPlayers('left')" :reverse=true :highlight="gameState.getHighlightedPlayer" />
      <div class="scoreboard">
          <TeamInfo :team="team('left')" :reverse=true :best_of=overlayData.getSeries.bestOf
          :players="getPlayers('left')" />
        <GameClock :time=gameState.scoreboardClock :game_num=overlayData.getSeries.gameNumber
          :best_of=overlayData.getSeries.bestOf />
        <TeamInfo :team="team('right')" :reverse=false :best_of=overlayData.getSeries.bestOf
          :players="getPlayers('right')" />
      </div>
      <PlayerList :players="getPlayers('right')" :reverse=false :highlight="gameState.getHighlightedPlayer" />
    </div>

    <div class="footer" v-if="!gameState.isReplay">
      <AdPanel class="ads" />
      <div class="player">
        <PlayerHighlight v-if="gameState.getHighlightedPlayer" :player="gameState.getHighlightedPlayer" :team="overlayData.getTeam(gameState.getHighlightedPlayer.team)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
  height: 203px;

  .ads {
    position: relative;
    bottom: -100px;
  }

  .player {
    position: relative;
    bottom: -10px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
}
</style>
