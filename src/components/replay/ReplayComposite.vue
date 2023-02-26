<script setup>
import { gameStateStore } from '@/store/gameStateStore';
import { overlayDataStore } from '@/store/overlayDataStore';
const gameState = gameStateStore();
const overlayData = overlayDataStore();
</script>

<template>
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
</template>

<style lang="scss" scoped>
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
