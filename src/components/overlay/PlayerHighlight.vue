<script>
import BoostGauge from '@/components/overlay/BoostGauge.vue'

export default {
  props: ['player'],
  components: {
    BoostGauge
  },
  filters: {
    pluralize: function (count, sing, plur) {
      if (count == 1) {
        return count + ` ${sing}`;
      } else if (count > 1) {
        return count + ` ${plur}`;
      } else {
        return "Please pass valid count of data";
      }
    },
  },
}
</script>

<template>
  <div class="container" v-if="player">
    <div class="top">
      <div class="colorbar" :style="`background-color: ${player.team ? 'var(--rl-primary-orange)' : 'var(--rl-primary-blue)'}`">
        <div class="name">{{player.name}}</div>
      </div>
      <div class="stats">
        <div class="stat">
          <div class="value">{{player.goals}}</div>
          <div class="label">Goals</div>
        </div>
        <div class="stat">
          <div class="value">{{player.shots}}</div>
          <div class="label">Shots</div>
        </div>
        <div class="stat">
          <div class="value">{{player.saves}}</div>
          <div class="label">Saves</div>
        </div>
        <div class="stat">
          <div class="value">{{player.assists}}</div>
          <div class="label">Assists</div>
        </div>
      </div>
      <BoostGauge class="gauge" :player=player />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top {
  height: 85+40px;
  width: 550px;
  margin-right: 30+40px;
  background-color: var(--etsu-primary-trans);
  font-family: Fyrste;
  color: #ffffff;
  display: flex;
  text-transform: lowercase;
  flex-direction: column;
  font-size: 2.5em;
  .name{
    margin-left: 10px;
  }
  .stats {
    display: flex;
    flex-direction: row;
    margin-left: 10px;
    margin-right: 10px;
    text-align: center;
    .stat:first-child{
      margin-left: 2px;
    }
    .stat{
      margin-right: 10px;
      font-size: 1.3em;
    }
    .label{
      font-size: 0.6em;
    }
  }
  .colorbar{
    display: flex;
    flex-direction: row;
    height: 40px;
    background-color: var(--rl-primary-orange);
  }
  .gauge{
    display: flex;
    margin-bottom: 0px;
    position: absolute;
    bottom: 10px;
    right: -10px;
  }
}
</style>