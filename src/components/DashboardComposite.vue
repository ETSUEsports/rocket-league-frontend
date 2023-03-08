<script setup>
import axios from 'axios';
import { overlayDataStore } from '@/store/overlayDataStore';
import { appSettingsStore } from '@/store/appSettingsStore';
import { ref, watch, onMounted } from 'vue'
import AppSettings from './modal/AppSettings.vue';
import { useDropzone } from "vue3-dropzone";
import { useToast } from 'vue-toastification';
const toast = useToast();
const appSettings = appSettingsStore();
const overlayData = overlayDataStore();
let images = ref([]);
const add = (type) => {
  switch (type) {
    case 'game':
      // cannot go over bestOf
      if (overlayData.series.gameNumber >= overlayData.series.bestOf) {
        return;
      }
      overlayData.series.gameNumber += 1;
      break;
    case 'best_of':
      // cannot go over 7
      if (overlayData.series.bestOf >= 7) {
        return;
      }
      overlayData.series.bestOf += 1;
      break;
    case 'left_score':
      // cannot go over best of
      if (overlayData.leftTeam.score >= overlayData.series.bestOf) {
        return;
      }
      overlayData.leftTeam.score += 1;
      break;
    case 'right_score':
      // cannot go over best of
      if (overlayData.rightTeam.score >= overlayData.series.bestOf) {
        return;
      }
      overlayData.rightTeam.score += 1;
      break;
  }
};

const del = (type) => {
  switch (type) {
    case 'game':
      // cannot go below 1
      if (overlayData.series.gameNumber <= 1) {
        return;
      }
      overlayData.series.gameNumber -= 1;
      break;
    case 'best_of':
      // cannot go below 3
      if (overlayData.series.bestOf <= 3) {
        return;
      }
      overlayData.series.bestOf -= 1;
      break;
    case 'left_score':
      // cannot go below 0
      if (overlayData.leftTeam.score <= 0) {
        return;
      }
      overlayData.leftTeam.score -= 1;
      break;
    case 'right_score':
      // cannot go below 0
      if (overlayData.rightTeam.score <= 0) {
        return;
      }
      overlayData.rightTeam.score -= 1;
      break;
  }
};

const updateScorebug = () => {
  axios.post(`${appSettings.getControlHTTPConn}/series`, { name: overlayData.series.name, gameNumber: overlayData.series.gameNumber, bestOf: overlayData.series.bestOf });
};

const resetScorebug = () => {
  axios.delete(`${appSettings.getControlHTTPConn}/series`);
};

const updateTeams = () => {
  axios.post(`${appSettings.getControlHTTPConn}/teams`, { leftTeam: overlayData.leftTeam, rightTeam: overlayData.rightTeam });
};

const resetTeams = () => {
  axios.delete(`${appSettings.getControlHTTPConn}/teams`);
};

const swapTeams = () => {
  axios.post(`${appSettings.getControlHTTPConn}/teams/swap`);
};

const openSettings = () => {
  showSettings.value = true;
};

let showSettings = ref(false);

const url = `${appSettings.getControlHTTPConn}/images`; // Your url on the server side
const uploadFiles = (files) => {
  for (var x = 0; x < files.length; x++) {
    const formData = new FormData(); // pass data as a form
    formData.append("image", files[x]);
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.info(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

const getFiles = () => {
  axios
    .get(url)
    .then((response) => {
      images.value = response.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

const copyURL = (url) => {
  navigator.clipboard.writeText(url);
  toast.success('Copied to clipboard');
};

const deleteImage = (name) => {
  axios
    .delete(`${url}/${name}`)
    .then((response) => {
      console.info(response.data);
      toast.success('Deleted image');
    })
    .catch((err) => {
      console.error(err);
    });
}

function onDrop(acceptFiles, rejectReasons) {
  uploadFiles(acceptFiles);
  console.log(rejectReasons);
}

const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

watch(isDragActive, () => {
  console.log('isDragActive', isDragActive.value);
});

onMounted(() => {
  getFiles();
  setInterval(() => {
    getFiles();
  }, 1000);
});

</script>

<template>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div class="dashboard">
    <transition name="modal">
      <AppSettings v-if="showSettings" @close="showSettings = false" />
    </transition>
    <div class="container">
      <div class="toprow">
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
      </div>
      <div class="outline">
        <div class="scorebug_container">
          <div class="scorebug sb_name">
            <div class="inputgroup">
              <label for="series_name">{{ $t('dashboard.series') }}</label>
              <input v-model="overlayData.series.name" type="text" id="series_name" name="series_name" />
            </div>
          </div>
          <div class="scorebug sb_game_num">
            <div class="inputgroup">
              <label for="game_number">{{ $t('dashboard.game') }}</label>
              <button class="button success" @click="add('game')"><span
                  class="material-symbols-outlined">add</span></button>
              <button class="button danger" @click="del('game')"><span
                  class="material-symbols-outlined">remove</span></button>
              <input v-model="overlayData.series.gameNumber" type="number" id="game_number" name="game_number" />
            </div>
          </div>
          <div class="scorebug sb_best_of">
            <div class="inputgroup">
              <label for="best_of">{{ $t('dashboard.best_of') }}</label>
              <button class="button success" @click="add('best_of')"><span
                  class="material-symbols-outlined">add</span></button>
              <button class="button danger" @click="del('best_of')"><span
                  class="material-symbols-outlined">remove</span></button>
              <input v-model="overlayData.series.bestOf" type="number" id="best_of" name="best_of" />
            </div>
          </div>
          <span>
            <button class="button success save" @click="updateScorebug()">{{ $t('dashboard.updateScorebug') }}</button>
            <button class="button danger reset" @click="resetScorebug()">{{ $t('dashboard.resetScorebug') }}</button>
          </span>
        </div>
      </div>
      <div class="outline">
        <div class="teams_header">
          <h2>{{ $t('dashboard.teams') }}</h2>
          <span>
            <button class="button success save" @click="updateTeams()">{{ $t('dashboard.updateTeams') }}</button>
            <button class="button danger reset" @click="resetTeams()">{{ $t('dashboard.resetTeams') }}</button>
            <button class="button warning swap" @click="swapTeams()">{{ $t('dashboard.swapTeams') }}</button>
          </span>
        </div>
        <div class="teams_container">
          <div class="team team_left outline blue">
            <h2>{{ $t('dashboard.left_team') }}</h2>
            <div class="inputgroup">
              <label for="left_team_name">{{ $t('dashboard.team_name') }}</label>
              <input v-model="overlayData.leftTeam.name" type="text" id="left_team_name" name="left_team_name" />
            </div>
            <div class="inputgroup">
              <label for="left_team_score">{{ $t('dashboard.team_score') }}</label>
              <button class="button success" @click="add('left_score')"><span
                  class="material-symbols-outlined">add</span></button>
              <button class="button danger" @click="del('left_score')"><span
                  class="material-symbols-outlined">remove</span></button>
              <input v-model="overlayData.leftTeam.score" type="number" id="left_team_score" name="left_team_score" />
            </div>
            <div class="inputgroup">
              <label for="left_team_logo">{{ $t('dashboard.team_logo') }}</label>
              <input v-model="overlayData.leftTeam.image" type="text" id="left_team_logo" name="left_team_logo" />
            </div>
          </div>
          <div class="team team_right outline orange">
            <h2>{{ $t('dashboard.right_team') }}</h2>
            <div class="inputgroup">
              <label for="right_team_name">{{ $t('dashboard.team_name') }}</label>
              <input v-model="overlayData.rightTeam.name" type="text" id="right_team_name" name="right_team_name" />
            </div>
            <div class="inputgroup">
              <label for="right_team_score">{{ $t('dashboard.team_score') }}</label>
              <button class="button success" @click="add('right_score')"><span
                  class="material-symbols-outlined">add</span></button>
              <button class="button danger" @click="del('right_score')"><span
                  class="material-symbols-outlined">remove</span></button>
              <input v-model="overlayData.rightTeam.score" type="number" id="right_team_score" name="right_team_score" />
            </div>
            <div class="inputgroup">
              <label for="right_team_logo">{{ $t('dashboard.team_logo') }}</label>
              <input v-model="overlayData.rightTeam.image" type="text" id="right_team_logo" name="right_team_logo" />
            </div>
          </div>
        </div>
      </div>
      <div class="outline">
        <div class="toprow">
          <h1>Files</h1>
        </div>
        <div v-bind="getRootProps()" class="dropzone">
          <div class="border" :class="{
            isDragActive,
          }">
          </div>
          <input v-bind="getInputProps()" />
          <p v-if="isDragActive">Drop files here to upload</p>
          <p v-else>Drop files here to upload for team logos</p>
        </div>
        <div class="images">
          <div class="image" v-for="image in images" :key="image.name">
            <img @click="copyURL(image.public_url)" :src="image.public_url" class="image" />
            <p>{{ image.name }}</p>
            <button class="button danger imgDelete" @click="deleteImage(image.name)"><span
                  class="material-symbols-outlined">delete</span><span class="text">Delete</span></button>
          </div>
        </div>
      </div>

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

.dashboard {
  background-color: var(--db-primary-bg);
  font-family: Verdana, sans-serif;
  height: 100%;
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

  .teams_header {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 4px;
    border-radius: 4px;
    background-color: var(--db-secondary-bg);

    h2 {
      font-size: 2em;
    }
  }

  .settings {
    margin-left: 20px;
  }

  .teams_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    width: 100%;

    .team_left {
      input:focus {
        outline: 2px solid var(--rl-primary-orange);
      }
    }

    .team_right {
      input:focus {
        outline: 2px solid var(--rl-primary-blue);
      }
    }

    .team {
      width: 50%;
      height: 100%;
      margin: 4px;
      background-color: var(--db-secondary-bg);
      align-items: center;
      padding-bottom: 5px;

      .inputgroup {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: flex-start;
        padding-top: 2vh;

        label {
          padding-right: 5px;
        }

        #left_team_name,
        #right_team_name {
          width: 300px;
        }

        #left_team_score,
        #right_team_score {
          width: 80px;
        }

        #left_team_logo,
        #right_team_logo {
          width: 400px;
        }
      }
    }
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

.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48
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

.toprow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 4px;

  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

  .right {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }

}

.dropzone,
.files {
  width: 100%;
  height: 60px;
  border-radius: 8px;
  box-shadow: rgba(255, 255, 255, 0.6) 0px 1px 2px 0px,
    rgba(255, 255, 255, 0.15) 0px 1px 3px 1px;
  font-size: 1.5rem;
  text-align: center;
  line-height: 1.5;

  p {
    margin: 0;
    position: relative;
    top: -50px;
  }
}

.border {
  border: 2px dashed #ccc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  transition: all 0.3s ease;
  background-color: var(--etsu-secondary-bg);


  &.isDragActive {
    border: 2px dashed #ffb300;
    background: rgb(255 167 18 / 20%);
  }
}



div.images {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 5px;

  div.image {
    margin: 4px;
    background-color: var(--etsu-secondary-bg);
    border-radius: 8px;
    outline: 2px solid var(--etsu-primary-gold);
    text-align: center;
    height: 100%;

    .imgDelete {
      font-size: 20px;
      margin-top: 10px;
      width: 100%;
      .text{
        position: relative;
        top: -5px;
      }
    }

    img.image {
      max-width: 100px;
      max-height: 100px;
      object-fit: cover;
      border-radius: 8px;
    }
  }
}
</style>

<style>
html,
body,
#app {
  overflow: scroll;
}
</style>