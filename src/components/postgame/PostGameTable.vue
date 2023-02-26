<script setup>
import { gameStateStore } from '@/store/gameStateStore';
const gameState = gameStateStore();
const getPostTeamTotal = gameState.getPostTeamTotal;
const getPlayers = gameState.getPostPlayers;
const stats = ['score', 'goals', 'assists', 'shots', 'saves', 'demos', 'touches'];
</script>

<template>
  <div class="table">
    <table>
        <tr class="table_header">
          <th class="th_left" v-for="(player) in getPlayers('left')" :key="player.name">
            {{ player.name }}
          </th>
          <th class="th_center">Scoreboard</th>
          <th class="th_right" v-for="(player) in getPlayers('right')" :key="player.name">
            {{ player.name }}
          </th>
        </tr>
        <tr class="stat_row" v-for="(stat) in stats" :key="stat">
          <th v-for="(player) in getPlayers('left')" :key="player.name">
            {{ player[stat] }}
          </th>
          <th class="stat_middle"><span>{{ stat }}</span>
          <div class="diff_chart">
            <div class="diff_chart_right" :style="`width: ${(getPostTeamTotal('left', stat) / (getPostTeamTotal('right', stat) + getPostTeamTotal('left', stat))) * 100}%`"></div>
          </div>
          </th>
          <th v-for="(player) in getPlayers('right')" :key="player.name">
            {{ player[stat] }}
          </th>
        </tr>
      </table>
  </div>
</template>

<style lang="scss" scoped>
.table{
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 100vw;
  margin-top: 10px;
  color: #ffffff;
  font-family: 'Fyrste';
  text-overflow: ellipsis;
  font-size: 5vh;
  text-transform: lowercase;
  padding-top: 50px;
  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    .th_left {
      background-color: var(--rl-primary-blue);
    }
    .th_center {
      width: 450px;
      background: linear-gradient(112.5deg , var(--rl-primary-blue) 50%, var(--rl-primary-orange) 50%);
    }
    .th_right {
      background-color: var(--rl-primary-orange);
    }
    .table_header{
      line-height: 8vh;
      background-color: var(--etsu-primary-bg);
    }
    .stat_row {
      line-height: 8vh;
      background-color: var(--etsu-primary-bg);
    }
    .stat_middle{
      font-size: 3vh;
      span{
        position: relative;
        top: -20px;
      }
      .diff_chart{
        margin: auto;
        width: calc(100% - 40px);
        height: 10px;
        position: relative;
        top: -30px;
        background-color: var(--rl-primary-orange);
        .diff_chart_right{
          height: 10px;
          background-color: var(--rl-primary-blue);
        } 
      }
    }
    th {
      padding: 5px;
    }
  }
}
</style>
