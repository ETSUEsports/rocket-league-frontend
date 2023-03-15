<script setup>
import { appSettingsStore } from '@/store/appSettingsStore';
import { gameStateStore } from '@/store/gameStateStore';
import { overlayDataStore } from '@/store/overlayDataStore';
import { onMounted, onBeforeUnmount, defineEmits } from 'vue'
const emit = defineEmits(['close'])

const overlayData = overlayDataStore();
const gameState = gameStateStore();
const appSettings = appSettingsStore();
function reloadPage() {
  window.location.reload();
}
function resetStates() {
  appSettings.resetState();
  overlayData.resetState();
  gameState.resetState();
}

onMounted(() => {
  window.addEventListener('keydown', onKeyPress);
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyPress);
})

function onKeyPress(e) {
  if (e.key == 'Escape') {
    emit('close');
  }
}


</script>

<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">
            <h1>App Settings</h1>
          </slot>
        </div>
        <div class="modal-body">
          <slot name="body">
            <div class="inputgroup">
              <label for="gameWSIP">Game WebSocket IP</label>
              <input v-model="appSettings.gameWSIP" type="text" id="gameWSIP" name="gameWSIP" />
            </div>
            <div class="inputgroup">
              <label for="gameWSPort">Game WebSocket Port</label>
              <input v-model="appSettings.gameWSPort" type="text" id="gameWSPort" name="gameWSPort" />
            </div>
            <div class="inputgroup">
              <label for="overlayWSIP">Control WebSocket IP</label>
              <input v-model="appSettings.controlWSIP" type="text" id="controlWSIP" name="controlWSIP" />
            </div>
            <div class="inputgroup">
              <label for="overlayWSPort">Control WebSocket Port</label>
              <input v-model="appSettings.controlWSPort" type="text" id="controlWSPort" name="controlWSPort" />
            </div>
            <div class="inputgroup">
              <label for="obsIP">OBS WebSocket IP</label>
              <input v-model="appSettings.obsIP" type="text" id="obsIP" name="obsIP" />
            </div>
            <div class="inputgroup">
              <label for="obsPort">OBS WebSocket Port</label>
              <input v-model="appSettings.obsPort" type="text" id="obsPort" name="obsPort" />
            </div>
            <div class="inputgroup">
              <label for="obsPassword">OBS WebSocket Password</label>
              <input v-model="appSettings.obsPassword" type="text" id="obsPassword" name="obsPassword" />
            </div>
            <div class="inputgroup">
              <label for="resetStates">Reset All States</label>
              <button class="button danger" @click="resetStates()">Reset</button>
            </div>
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-default-button button success" @click="reloadPage()">
              Save
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 50px 30px;
  padding-top: 10px;
  background-color: var(--db-primary-bg);
  color: #ffffff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: left;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(0.9);
  transform: scale(0.9);
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
  font-size: 1.5vh;
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
  font-size: 2vh;
  border-radius: 4px;
  margin-right: 5px;
}

.button:hover {
  opacity: 0.8;
  outline: 2px solid var(--etsu-primary-gold);
}
</style>
