<script setup>
import controlAPI from '@/api';
import { overlayDataStore } from '@/store/overlayDataStore';
import { appSettingsStore } from '@/store/appSettingsStore';
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import AppSettings from './modal/AppSettings.vue';

import DashboardAuthCheck from '@/components/dashboard/DashboardAuthCheck.vue';
import DashboardSection from '@/components/dashboard/DashboardSection.vue';
import DashboardFiles from '@/components/dashboard/DashboardFiles.vue';
import DashboardTeams from '@/components/dashboard/DashboardTeams.vue';
import DashboardScorebug from './dashboard/DashboardScorebug.vue';

const appSettings = appSettingsStore();
const overlayData = overlayDataStore();

const openSettings = () => {
  showSettings.value = true;
};

const updateScorebug = () => {
  controlAPI.post(`${appSettings.getControlHTTPConn}/series`, { name: overlayData.series.name, gameNumber: overlayData.series.gameNumber, bestOf: overlayData.series.bestOf });
};

const resetScorebug = () => {
  controlAPI.delete(`${appSettings.getControlHTTPConn}/series`);
};

const updateTeams = () => {
  controlAPI.post(`${appSettings.getControlHTTPConn}/teams`, { leftTeam: overlayData.leftTeam, rightTeam: overlayData.rightTeam });
};
const resetTeams = () => {
  controlAPI.delete(`${appSettings.getControlHTTPConn}/teams`);
};
const swapTeams = () => {
  controlAPI.post(`${appSettings.getControlHTTPConn}/teams/swap`);
};

let showSettings = ref(false);

const logout = () => {
  appSettings.logout();
  controlAPI.post(`${appSettings.getControlHTTPConn}/auth/strategies/discord/logout`);
  router.push({name: 'auth-login'});
};
const router = useRouter();
onBeforeMount(() => {
  const loginState = appSettings.getUser;
  if(loginState == null || loginState && Object.keys(loginState).length === 0 && Object.getPrototypeOf(loginState) === Object.prototype) {
    router.push({name: 'auth-login'});
  }
});

</script>

<template>
  <dashboard-auth-check />
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div class="dashboard">
    <transition name="modal">
      <AppSettings v-if="showSettings" @close="showSettings = false" />
    </transition>
    <div class="user_info" v-if="appSettings.getLoginState != 'loggedIn'">
      <h3>Logged in user: {{ appSettings.getUser.username }}#{{ appSettings.getUser.discriminator }}</h3>
      <button class="button danger logout small-text" @click="logout();">{{ $t('dashboard.logout') }}</button>
    </div>

    <div class="container">
      <dashboard-section>
        <template v-slot:toprow>
          <div class="left">
            <h1>{{ $t('dashboard.title') }}</h1>
            <button class="button default settings" @click="openSettings()">{{ $t('dashboard.settings') }}</button>
          </div>
          <div class="right">
            <div class="status-light">
              <div class="status-light__status" :class="appSettings.getGameWSStatus"></div>
              <div class="status-light__content">Game WebSocket</div>
            </div>
            <div class="status-light">
              <div class="status-light__status" :class="appSettings.getControlWSStatus"></div>
              <div class="status-light__content">Control WebSocket</div>
            </div>
          </div>
        </template>
      </dashboard-section>

      <dashboard-section>
        <template v-slot:toprow>
          <h1>{{ $t('dashboard.scorebug') }}</h1>
          <span>
            <button class="button success save" @click="updateScorebug()">{{ $t('dashboard.updateScorebug') }}</button>
            <button class="button danger reset" @click="resetScorebug()">{{ $t('dashboard.resetScorebug') }}</button>
          </span>
        </template>
        <template v-slot:main>
          <dashboard-scorebug />
        </template>
      </dashboard-section>

      <dashboard-section>
        <template v-slot:toprow>
          <h1>{{ $t('dashboard.teams') }}</h1>
          <span>
            <button class="button success save" @click="updateTeams()">{{ $t('dashboard.updateTeams') }}</button>
            <button class="button danger reset" @click="resetTeams()">{{ $t('dashboard.resetTeams') }}</button>
            <button class="button warning swap" @click="swapTeams()">{{ $t('dashboard.swapTeams') }}</button>
          </span>
        </template>
        <template v-slot:main>
          <dashboard-teams />
        </template>
      </dashboard-section>

      <dashboard-section>
        <template v-slot:toprow>
          <h1>{{ $t('dashboard.files') }}</h1>
        </template>
        <template v-slot:main>
          <dashboard-files />
        </template>
      </dashboard-section>

    </div>
  </div>
</template>

<style lang="scss" scoped>
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  vertical-align: baseline;
  background: transparent;
}

.user_info {
  position: relative;
  // position on the top right of page
  top: 0;
  right: 0;
  // width and height of the element
}

.dashboard {
  font-family: Verdana, sans-serif;
  height: 100%vh;
  color: #ffffff;

  .outline {
    border: 1px solid var(--etsu-primary-gold);

    &.orange {
      border: 1px solid var(--rl-primary-orange);
    }

    &.blue {
      border: 1px solid var(--rl-primary-blue);
    }

    border-radius: 4px;
    padding: 4px;
    margin: 10px;
  }

  .save,
  .reset,
  .swap {
    margin-top: 2vh;
    margin-left: 5px;
    margin-right: auto;
    margin-bottom: 5px;
  }

  .container {
    padding-top: 2vh;
    height: 100%;
    margin: 0 auto;
    width: calc(100% - 20vw);
  }

  .settings {
    margin-left: 20px;
  }

}

input,
label {
  display: block;
  margin-left: 5px;
}

input {
  width: calc(100% - 20px);
}

input[type="text"],
input[type="number"] {
  border: 1px solid var(--db-secondary-bg);
  padding: 8px;
  background-color: var(--etsu-secondary-bg);
  color: #ffffff;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  width: calc(100% - 20px);
  box-sizing: border-box;
}

label {
  text-align: left;
  font-size: 2.5vh;
}

.button {
  &.success {
    background-color: #4CAF50;
    /* Green */
  }

  &.danger {
    background-color: #f44336;
    /* Red */
  }

  &.warning {
    background-color: #ff9800;
    /* Orange */
  }

  &.info {
    background-color: #2196F3;
    /* Blue */
  }

  &.default {
    background-color: #e7e7e7;
    /* Gray */
    color: black;
  }

  &.small-text {
    font-size: 1.5vh;
  }
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 2.5vh;
  border-radius: 4px;
  margin-right: 5px;
}

.button:hover {
  opacity: 0.8;
  outline: 2px solid var(--etsu-primary-gold);
}

.status-light {
  align-items: center;
  display: flex;
  padding: 0.5rem;
}

.status-light__status {
  &.connected {
    background-color: #16a34a;
  }

  &.error {
    background-color: #f59e0b;
  }

  &.disconnected {
    background-color: #dc2626;
  }

  background-color: #6b7280;
  border-radius: 9999px;
  height: 0.5rem;
  width: 0.5rem;
  margin-right: 0.5rem;
}

.status-light__content {
  flex: 1;
}
</style>
