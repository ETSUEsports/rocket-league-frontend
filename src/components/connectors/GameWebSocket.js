import { gameStateStore } from '@/store/gameStateStore';
import DecodeWSCode from '@/utils/DecodeWSCode';

export function GameConnector() {
   const gameState = gameStateStore();
   const ws = new WebSocket("ws://localhost:49122");
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
               break;
            case 'game:statfeed_event':
               console.log(data.data);
               break;
            case 'game:ball_hit':
               console.log(data.data);
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
      };
      ws.onerror = function () {
         console.log(`[Game WS]: Error`);
      };
      ws.onclose = function (event) {
         const reason = DecodeWSCode(event);
         console.log(`[Game WS]: Disconnected - ${reason}`);
      };
   }
   connect()
}
