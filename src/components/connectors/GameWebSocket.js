import { gameStateStore } from '@/store/gameStateStore';
import { appSettingsStore } from '@/store/appSettingsStore';
import DecodeWSCode from '@/utils/DecodeWSCode';
import Router from '@/router';

export function GameConnector() {
   const gameState = gameStateStore();
   const appSettings = appSettingsStore();
   const ws = new WebSocket(appSettings.getGameWSConn);
   function connect() {
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
               gameState.updatePostGameStats(data.data.players);
               break;
            case 'game:goal_scored':
               gameState.updateReplayStats(data.data);
               console.log(data.data);
               break;
            case 'game:statfeed_event':
               console.log(data.data);
               break;
            case 'game:ball_hit':
               console.log(data.data);
               break;
            case 'game:podium_start':
               setTimeout(function () {
                  Router.push({ name: 'post-game-stats' })
               }, 5000);

               console.log(`[Game WS]: Podium Started`);
               gameState.updatePostGameStats(data.data.players);
               break;
            case 'game:match_created':
               Router.push({ name: 'overlay' })
               console.log(`[Game WS]: Match created`);
               break;
            case 'game:match_destroyed':
               console.log(`[Game WS]: Match destroyed`);
               gameState.resetState();
               break;
            default:
               console.log(`[Game WS]: Unknown event ${data.event}`);
         }
      }
      ws.onopen = function () {
         console.log(`[Game WS]: Connected`);
         appSettings.updateGameWSStatus('connected');
      };
      ws.onerror = function () {
         console.log(`[Game WS]: Error`);
         appSettings.updateGameWSStatus('error');
      };
      ws.onclose = function (event) {
         const reason = DecodeWSCode(event);
         console.log(`[Game WS]: Disconnected - ${reason}`);
         appSettings.updateGameWSStatus('disconnected');
      };
   }
   connect()
}
