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
      time: "4:33",
      game_num: "1",
      best_of: "3",
      players:  
          [
            {
            name:"ETSU",
            boost: 100,
            highlight:false,
            goals: 1,
            shots: 2,
            saves: 3, 
            assists: 4,
          },
          {
            name:"ETSU_TWO",
            boost: 100,
            highlight:false,
            goals: 1,
            shots: 2,
            saves: 3, 
            assists: 4,
          },
          {
            name:"ETSU-THREE",
            boost: 100,
            highlight:true,
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
        <PlayerList :players=players />
        <div class="scoreboard">
          <TeamInfo :reverse=true image="https://i.ryois.me/etsu_left.png" :players=players />
          <GameClock :time=time :game_num=game_num :best_of=best_of />
          <TeamInfo :reverse=false image="https://i.ryois.me/etsu_right.png" :players=players />
        </div>
        <PlayerList :players=players />
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
