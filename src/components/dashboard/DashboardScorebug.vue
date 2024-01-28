<script setup>
import { overlayDataStore } from '@/store/overlayDataStore';

const overlayData = overlayDataStore();
const game = overlayData.game;

const add = (type) => {
  switch (type) {
    case 'game':
      // cannot go over bestOf
      if (overlayData.games[game].series.gameNumber >= overlayData.games[game].series.bestOf) {
        return;
      }
      overlayData.games[game].series.gameNumber += 1;
      break;
    case 'best_of':
      // cannot go over 7
      if (overlayData.games[game].series.bestOf >= 7) {
        return;
      }
      overlayData.games[game].series.bestOf += 1;
      break;
    case 'left_score':
      // cannot go over best of
      if (overlayData.games[game].leftTeam.score >= overlayData.games[game].series.bestOf) {
        return;
      }
      overlayData.games[game].leftTeam.score += 1;
      break;
    case 'right_score':
      // cannot go over best of
      if (overlayData.games[game].rightTeam.score >= overlayData.games[game].series.bestOf) {
        return;
      }
      overlayData.games[game].rightTeam.score += 1;
      break;
  }
};

const del = (type) => {
  switch (type) {
    case 'game':
      // cannot go below 1
      if (overlayData.games[game].series.gameNumber <= 1) {
        return;
      }
      overlayData.games[game].series.gameNumber -= 1;
      break;
    case 'best_of':
      // cannot go below 3
      if (overlayData.games[game].series.bestOf <= 3) {
        return;
      }
      overlayData.games[game].series.bestOf -= 1;
      break;
    case 'left_score':
      // cannot go below 0
      if (overlayData.games[game].leftTeam.score <= 0) {
        return;
      }
      overlayData.games[game].leftTeam.score -= 1;
      break;
    case 'right_score':
      // cannot go below 0
      if (overlayData.games[game].rightTeam.score <= 0) {
        return;
      }
      overlayData.games[game].rightTeam.score -= 1;
      break;
  }

};

</script>

<template>
  <div class="scorebug_container">
    <div class="scorebug sb_name">
      <div class="inputgroup">
        <label for="series_name">{{ $t('dashboard.series') }}</label>
        <input v-model="overlayData.games[game].series.name" type="text" id="series_name" name="series_name" />
      </div>
    </div>
    <div class="scorebug sb_game_num">
      <div class="inputgroup">
        <label for="game_number">{{ $t('dashboard.game') }}</label>
        <button class="button success" @click="add('game')"><span class="material-symbols-outlined">add</span></button>
        <button class="button danger" @click="del('game')"><span class="material-symbols-outlined">remove</span></button>
        <input v-model="overlayData.games[game].series.gameNumber" type="number" id="game_number" name="game_number" />
      </div>
    </div>
    <div class="scorebug sb_best_of">
      <div class="inputgroup">
        <label for="best_of">{{ $t('dashboard.best_of') }}</label>
        <button class="button success" @click="add('best_of')"><span class="material-symbols-outlined">add</span></button>
        <button class="button danger" @click="del('best_of')"><span
            class="material-symbols-outlined">remove</span></button>
        <input v-model="overlayData.games[game].series.bestOf" type="number" id="best_of" name="best_of" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scorebug_container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 4px;
  border-radius: 4px;
  background-color: var(--db-secondary-bg);

  input:focus {
    outline: 2px solid var(--etsu-primary-gold);
  }

  #series_name {
    width: 50%;
  }

  #game_number,
  #best_of {
    width: 80px;
  }

  .scorebug {
    padding-top: 2vh;
  }

  label {
    padding-right: 20px;
  }

  .inputgroup {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
  }
}
</style>
