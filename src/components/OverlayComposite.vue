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
            boost: 50,
            highlight:false,
            goals: 1,
            shots: 2,
            saves: 3, 
            assists: 4,
          },
          {
            name:"ETSU-THREE",
            boost: 0,
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
        <PlayerList :players=players :reverse=true />
        <div class="scoreboard">
          <TeamInfo :team=team_left :reverse=true :best_of=best_of :players=players />
          <GameClock :time=time :game_num=game_num :best_of=best_of />
          <TeamInfo :team=team_right :reverse=false :best_of=best_of :players=players />
        </div>
        <PlayerList :players=players :reverse=false />
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
