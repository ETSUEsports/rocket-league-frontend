import { gameStateStore } from '@/store/gameStateStore';
import { appSettingsStore } from '@/store/appSettingsStore';
import DecodeWSCode from '@/utils/DecodeWSCode';
import Router from '@/router';
import { overlayDataStore } from '@/store/overlayDataStore';
import { inject } from 'vue';

export function GameConnector() {
   const gameState = gameStateStore();
   const appSettings = appSettingsStore();
   const overlayData = overlayDataStore();
   let savedStatsFlag = false;
   let ws = new WebSocket(appSettings.getGameWSConn);
   const obs = inject('obs');
   let reattempt = 0;

   const reconnect = () => {
      ws.close();
      ws = new WebSocket(appSettings.getGameWSConn);
      connect();
   };

   const connect = () => {
      ws.onmessage = (event) => {
         let data = JSON.parse(event.data);
         switch (data.event) {
            case 'sos:version':
               console.log(`[Game WS]: Connected to SOS ${data.data}`);
               break;
            case 'game:disconnected':
               console.log(`[Game WS]: Disconnected from game ${data.data.gameId}`);
               break;
            case 'game:update_state':
               gameState.updateState(data.data);
               if(data.data.game.hasWinner && Object.keys(data.data.players).length % 2 == 0 && !savedStatsFlag) {
                  console.log(`[Game WS]: Saving post game stats`);
                  savedStatsFlag = true;
                  gameState.updatePostGameStats(data.data.players);
               }
               break;
            case 'game:goal_scored':
               gameState.updateReplayStats(data.data);
               if (!gameState.hasWinner) {
                  setTimeout(() => {
                     overlayData.updateReplay(true, data.data.scorer.teamnum);
                  }, 2500);
               }
               break;
            case 'game:statfeed_event':
               gameState.addStatfeedEvent(data.data);
               break;
            case 'game:ball_hit':
               console.log(`[Game WS]: Ball Hit`);
               break;
            case 'game:podium_start':
               if (Router.currentRoute.value.name != 'dashboard') {
                  setTimeout(function () {
                     Router.push({ name: 'post-game-stats' })
                     obs.muteAudio();
                  }, 4800);
               }
               console.log(`[Game WS]: Podium Started`);
               break;
            case 'game:match_created':
               savedStatsFlag = false;
               if (Router.currentRoute.value.name != 'dashboard') {
                  Router.push({ name: 'overlay' })
                  obs.unmuteAudio();
               }
               console.log(`[Game WS]: Match created`);
               break;
            case 'game:match_ended':
               savedStatsFlag = false;
               console.log(`[Game WS]: Match ended`);
               break;
            case 'game:match_destroyed':
               savedStatsFlag = false;
               console.log(`[Game WS]: Match destroyed`);
               gameState.resetState();
               break;
            default:
               console.warn(`[Game WS]: Unknown event ${data.event}`);
         }
      }
      ws.onopen = function () {
         console.log(`[Game WS]: Connected`);
         appSettings.updateGameWSStatus('connected');
      };
      ws.onclose = function (event) {
         const reason = DecodeWSCode(event);
         console.log(`[Game WS]: Disconnected - ${reason}`);
         appSettings.updateGameWSStatus('disconnected');
         if (reattempt > 5) {
            console.log(`[Game WS]: Reconnect failed, giving up`);
            return;
         }
         reattempt++;
         console.log(`[Game WS]: Reconnect attempt ${reattempt}`);
         console.log(`[Game WS] Reconnect will be attempted in 10 seconds.`);
         setTimeout(function () {
            reconnect();
         }, 10000);
      };
   }
   connect()
}
