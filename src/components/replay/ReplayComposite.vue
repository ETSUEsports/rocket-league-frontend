<script setup>
import { useRouter } from 'vue-router';
import { gameStateStore } from '@/store/gameStateStore';
import { overlayDataStore } from '@/store/overlayDataStore';
const router = useRouter();
const game = router.currentRoute.value.params.game;
const gameState = gameStateStore();
const overlayData = overlayDataStore();
overlayData.game = Number(game);
</script>

<template>
  <div v-if="gameState.isReplay">
    <div class="replay_border">
    </div>
    <div class="replay_background">
      <div class="replay_content">
        <div class="replay_col replay_left">
          <div class="replay_item ri_left">
            <div class="replay_label"><img class="replay_icon"
                :src="overlayData.getTeam(game, gameState.getReplayStats.scorer.teamnum).image" /></div>
            <div class="replay_value">{{ $t('overlay.replay_goal', {
              team:
                overlayData.getTeam(game, gameState.getReplayStats.scorer.teamnum).name
            }) }}</div>
          </div>
        </div>
        <div class="replay_col replay_middle">
          <div class="replay_item ri_middle">
            <div class="replay_label"><img class="replay_icon" src="@/assets/icons/GOAL_ICON.png"></div>
            <div class="replay_value">{{ gameState.getReplayStats.scorer.name || "" }}</div>
          </div>
          <div class="replay_item ri_middle" v-if="gameState.getReplayStats.assister.name">
            <div class="replay_label"><img class="replay_icon" src="@/assets/icons/ASST_ICON.png"></div>
            <div class="replay_value">{{ gameState.getReplayStats.assister.name || "" }}</div>
          </div>
        </div>
        <div class="replay_col replay_right">
          <div class="replay_item ri_right">
            <div class="replay_label"><img class="replay_icon" src="@/assets/icons/SHOT_ICON.png"></div>
            <div class="replay_value">{{ Math.round(gameState.getReplayStats.goalspeed) || "" }}MPH</div>
          </div>
          <div class="replay_item ri_right">
            <div class="replay_label"><img class="replay_icon" src="@/assets/icons/TIME_ICON.png"></div>
            <div class="replay_value">{{ new Date(gameState.getReplayStats.goaltime * 1000).toISOString().substring(14,
              19) || "" }} </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.replay_border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/new_replay_border.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 100;
}

.replay_background {
  position: absolute;
  bottom: 53px;
  left: 0;
  width: 100vw;
  height: 60px;
  background-color: var(--etsu-secondary-trans);

  .replay_content {
    position: relative;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: row;
    top: 100%;
    color: #ffffff;
    transform: translateY(-163%);
    font-family: 'Fyrste';
    text-transform: lowercase;
    width: 90%;
    margin: 0 auto;
    top: 120px;

    .replay_col {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 33vw;

      .replay_item {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        line-height: 70px;

        &.ri_left {
          justify-content: flex-start;
          margin-right: auto;
        }

        &.ri_middle {
          justify-content: center;
          align-items: center;
          padding-left: 10px;
          padding-right: 10px;
        }

        &.ri_right {
          justify-content: flex-end;
          margin-left: auto;
        }

        .replay_value {
          font-size: 40px;
          text-transform: lowercase;
          margin-left: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      &.replay_left {
        justify-content: flex-start;
        margin-right: auto;
      }

      &.replay_middle {
        justify-content: center;
        align-items: center;
      }

      &.replay_right {
        justify-content: flex-end;
        margin-left: auto;
      }

      .replay_value {
        font-size: 40px;
        text-transform: lowercase;
        margin-left: 5px;
      }
    }

    .replay_label {
      .replay_icon {
        width: 50px;
        height: 50px;
        margin-right: 5px;
        position: relative;
        bottom: -15px;
      }
    }
  }

}
</style>
