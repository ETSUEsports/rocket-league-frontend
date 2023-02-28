<script setup>
import { defineProps } from 'vue';
import BoostGauge from '@/components/overlay/BoostGauge.vue';
defineProps(['player', 'team']);
</script>

<template>
  <div class="container" v-if="player">
    <div class="top">
      <div class="colorbar" :style="`background-color: ${player.team ? 'var(--rl-primary-orange)' : 'var(--rl-primary-blue)'}`">
        <div class="name">{{player.name}}</div>
      </div>
      <div class="stats">
        <div class="stat">
          <div class="value">{{player.score}}</div>
          <div class="label">{{ $t('message.score') }}</div>
        </div>
        <div class="stat">
          <div class="value">{{player.goals}}</div>
          <div class="label">{{ $tc('message.goal', player.goals) }}</div>
        </div>
        <div class="stat">
          <div class="value">{{player.shots}}</div>
          <div class="label">{{ $tc('message.shot', player.shots) }}</div>
        </div>
        <div class="stat">
          <div class="value">{{player.assists}}</div>
          <div class="label">{{ $tc('message.assist', player.assists) }}</div>
        </div>
        <div class="stat">
          <div class="value">{{player.saves}}</div>
          <div class="label">{{ $tc('message.save', player.saves) }}</div>
        </div>
      </div>
      <BoostGauge class="gauge" :player=player :team=team />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
}
.top {
  height: 85+40px;
  width: 550px;
  margin-right: 30+40px;
  background-color: var(--etsu-primary-trans);
  font-family: Fyrste;
  text-overflow: ellipsis;
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
      width: 60px;
    }
    .label{
      font-size: 0.4em;
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
    bottom: 50px;
    right: -10px;
  }
}
</style>
