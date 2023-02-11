<script>
import { GameConnector } from '@/components/connectors/GameWebSocket.js'
import { gameStateStore } from '@/store/gameStateStore'
import AdPanel from '@/components/overlay/AdPanel.vue'
import GameClock from '@/components/overlay/GameClock.vue'
import PlayerHighlight from '@/components/overlay/PlayerHighlight.vue'
import PlayerList from '@/components/overlay/PlayerList.vue'
// import SplashTransition from '@/components/overlay/SplashTransition.vue'
import TeamInfo from '@/components/overlay/TeamInfo.vue'


export default {
  setup() {
    const gameState = gameStateStore();
    return {
      gameState,
      getPlayers: gameState.getPlayers
    }
  },
  mounted() {
    GameConnector();
  },
  data() {
    return {
      time: "4:33",
      game_num: 1,
      best_of: 5,
      team_left: {
        name: "ETSU",
        image: "https://i.ryois.me/etsu_left.png",
        score: 1,
        series_score: 2,
      },
      team_right: {
        name: "ETSU",
        image: "https://i.ryois.me/etsu_right.png",
        score: 1,
        series_score: 2,
      },
      players:
        [
          {
            name: "ETSU",
            team: "left",
            boost: 100,
            highlight: false,
            goals: 1,
            shots: 2,
            saves: 3,
            assists: 4,
          },
          {
            name: "ETSU_TWO",
            team: "left",
            boost: 50,
            highlight: false,
            goals: 1,
            shots: 2,
            saves: 3,
            assists: 4,
          },
          {
            name: "ETSU-THREE",
            team: "left",
            boost: 0,
            highlight: true,
            goals: 1,
            shots: 2,
            saves: 3,
            assists: 4,
          }
        ]
    }
  },
  components: {
    AdPanel,
    GameClock,
    PlayerHighlight,
    PlayerList,
    // SplashTransition,
    TeamInfo
  },
}
</script>

<template>
  <div class="overlay">
    <!-- <SplashTransition/> -->
    <div class="header">
      <PlayerList :players="getPlayers('left')" :reverse=true :highlight="gameState.getHighlightedPlayer" />
      <div class="scoreboard">
        <TeamInfo :team=team_left :reverse=true :best_of=best_of :players="getPlayers('left')" />
        <GameClock :time=gameState.scoreboardClock :game_num=game_num :best_of=best_of />
        <TeamInfo :team=team_right :reverse=false :best_of=best_of :players="getPlayers('right')" />
      </div>
      <PlayerList :players="getPlayers('right')" :reverse=false :highlight="gameState.getHighlightedPlayer" />
    </div>

    <div class="footer">
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
