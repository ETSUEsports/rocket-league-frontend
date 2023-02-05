<script>
import AdPanel from '@/components/overlay/AdPanel.vue'
import BoostGauge from '@/components/overlay/BoostGauge.vue'
import GameClock from '@/components/overlay/GameClock.vue'
import PlayerHighlight from '@/components/overlay/PlayerHighlight.vue'
import PlayerList from '@/components/overlay/PlayerList.vue'
import SplashTransition from '@/components/overlay/SplashTransition.vue'
import TeamInfo from '@/components/overlay/TeamInfo.vue'
export default {
  data(){
    return{
      time: "4:34",
      game_num: "1",
      best_of: "3",
    }
  },
  components: {
    AdPanel,
    BoostGauge,
    GameClock,
    PlayerHighlight,
    PlayerList,
    SplashTransition,
    TeamInfo
  }
}
</script>

<template>
  <div class="overlay">
    <SplashTransition/>
    <div class="header">
        <PlayerList/>
        <div class="scoreboard">
            <TeamInfo/>
            <GameClock :time=time :game_num=game_num :best_of=best_of />
            <TeamInfo/>
        </div>
        <PlayerList/>
    </div>

    <div class="footer">
        <AdPanel/>
        <div class="player">
            <PlayerHighlight/>
            <BoostGauge/>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100vw;
  background-color: red;
  .scoreboard{
    display: flex;
    justify-content: space-around;
    flex-direction: row;
  }
}

.footer{
    background-color: aqua;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    position: absolute;
    width: 100vw;
    bottom: 0;
    .player{
      display: flex;
      justify-content: space-between;
      flex-direction: row;
    }
}
</style>
