<script setup>
import { ControlAPI } from '@/api';
import { overlayDataStore } from '@/store/overlayDataStore';
import { appSettingsStore } from '@/store/appSettingsStore';
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import AppSettings from './modal/AppSettings.vue';
import { useToast } from 'vue-toastification';

import DashboardAuthCheck from '@/components/dashboard/DashboardAuthCheck.vue';
import DashboardSection from '@/components/dashboard/DashboardSection.vue';
import DashboardFiles from '@/components/dashboard/DashboardFiles.vue';
import DashboardTeams from '@/components/dashboard/DashboardTeams.vue';
import DashboardScorebug from './dashboard/DashboardScorebug.vue';
import DashboardCasters from './dashboard/DashboardCasters.vue';
// import DashboardTeamsPresets from './dashboard/DashboardTeamsPresets.vue';

const api = new ControlAPI();
const toast = useToast();

const router = useRouter();
const game = router.currentRoute.value.params.game;

const appSettings = appSettingsStore();
const overlayData = overlayDataStore();
overlayData.game = Number(game);
onBeforeMount(() => {
  const loginState = appSettings.getUser;
  if(loginState == null || loginState && Object.keys(loginState).length === 0 && Object.getPrototypeOf(loginState) === Object.prototype) {
    router.push({name: 'auth-login'});
  }
});

const openSettings = () => {
  showSettings.value = true;
};

const updateScorebug = () => {
  api.post(`/series/${game}`, { name: overlayData.games[game].series.name, gameNumber: overlayData.games[game].series.gameNumber, bestOf: overlayData.games[game].series.bestOf }).then(() => {
    toast.success('Scorebug updated');
  }).catch(() => {
    toast.error('Failed to update scorebug');
  });
};

const resetScorebug = () => {
  api.delete(`/series/${game}`).then(() => {
    toast.success('Scorebug reset');
  }).catch(() => {
    toast.error('Failed to reset scorebug');
  });
};

const updateTeams = () => {
  api.post(`/teams/${game}`, { leftTeam: overlayData.games[game].leftTeam, rightTeam: overlayData.games[game].rightTeam }).then(() => {
    toast.success('Teams updated');
  }).catch(() => {
    toast.error('Failed to update teams');
  });
};
const resetTeams = () => {
  api.del(`/teams/${game}`).then(() => {
    toast.success('Teams reset');
  }).catch(() => {
    toast.error('Failed to reset teams');
  });
};
const swapTeams = () => {
  api.post(`/teams/${game}/swap/`).then(() => {
    toast.success('Teams swapped');
  }).catch(() => {
    toast.error('Failed to swap teams');
  });
};

const updateCasters = () => {
  api.post(`/casters/${game}/left`, { name: overlayData.games[game].casters.casterl });
  api.post(`/casters/${game}/right`, { name: overlayData.games[game].casters.casterr });
};

let showSettings = ref(false);

const logout = () => {
  appSettings.logout();
  api.post('/auth/strategies/discord/logout');
  router.push({name: 'auth-login'});
};


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
      <h3>{{ $t('dashboard.discord_logged_in_as', { username: appSettings.getUser.username, discriminator: appSettings.getUser.discriminator}) }}</h3>
      <button class="button danger logout small-text" @click="logout();">{{ $t('dashboard.logout') }}</button>
    </div>

    <div class="container">
      <dashboard-section>
        <template v-slot:toprow>
          <div class="left">
            <h1>{{ $t('dashboard.title', { game: game}) }}</h1>
            <button class="button default settings" @click="openSettings()">{{ $t('dashboard.settings') }}</button>
          </div>
          <div class="right">
            <div class="status-light">
              <div class="status-light__status" :class="appSettings.getGameWSStatus"></div>
              <div class="status-light__content">{{ $t('dashboard.game_ws') }}</div>
            </div>
            <div class="status-light">
              <div class="status-light__status" :class="appSettings.getControlWSStatus"></div>
              <div class="status-light__content">{{ $t('dashboard.control_ws') }}</div>
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

      <!--<dashboard-section>
        <template v-slot:toprow>
          <h1>{{ $t('dashboard.teamsPresets') }}</h1>
          <h1 class="text-red">{{ $t('dashboard.teamsPresetsWarning') }}</h1>
        </template>
        <template v-slot:main>
          <dashboard-teams-presets />
        </template>
      </dashboard-section>
      -->
      <dashboard-section>
        <template v-slot:toprow>
          <h1>{{ $t('dashboard.casters') }}</h1>
          <span>
            <button class="button success save" @click="updateCasters()">{{ $t('dashboard.updateCasters') }}</button>
          </span>
        </template>
        <template v-slot:main>
          <dashboard-casters />
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

.text-red {
  color: red;
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

  &.blue {
    background-color: var(--rl-primary-blue);
  }

  &.orange {
    background-color: var(--rl-primary-orange);
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
