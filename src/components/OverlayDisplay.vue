<template>
  <div class="header">
    <PlayerList />
    <ScoreBox />
    <PlayerList />
  </div>
  <div class="footer">
    <AdBox />
    <div class="right">
      <PlayerDetail />
      <BoostGauge />
    </div>
  </div>
</template>

<script>
import * as state from "../assets/sample_data/update_state.json";
console.log(state);
import { PlayerList } from "";

export default {
  components: {
    PlayerList,
    PlayerDetail,
    ScoreBox,
    AdBox,
    BoostGauge,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.logo {
  padding-right: 15px;
}
</style>
