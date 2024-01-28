import { overlayDataStore } from '@/store/overlayDataStore';
import { appSettingsStore } from '@/store/appSettingsStore';
import DecodeWSCode from '@/utils/DecodeWSCode';
export function ControlConnector() {
   const overlayData = overlayDataStore();
   const appSettings = appSettingsStore();
   let ws = new WebSocket(appSettings.getControlWSConn);

   let reattempt = 0;

   const reconnect = () => {
      ws.close();
      ws = new WebSocket(appSettings.getControlWSConn);
      connect();
   }
   const connect = () => {
      ws.onmessage = (event) => {
         let data = JSON.parse(event.data);
         switch (data.event) {
            case 'control:connected':
               console.log(`[Control WS]: Connected to Control WebSocket ${data.data}`);
               break;
            case 'control:initailize':
               console.log(`[Control WS]: Initializing`);
               for (let i = 0; i < data.data.games.length; i++) {
                  overlayData.updateLeftTeam(i, data.data.games[i].teams.leftTeam);
                  overlayData.updateRightTeam(i, data.data.games[i].teams.rightTeam);
                  overlayData.updateSeries(i, data.data.games[i].series);
               }
               break;
            case 'team:update':
               console.log(`[Control WS]: Team update`);
               overlayData.updateLeftTeam(data.game, data.teams.leftTeam);
               overlayData.updateRightTeam(data.game, data.teams.rightTeam);
               break;
            case 'team:swap':
               console.log(`[Control WS]: Team swap`);
               overlayData.updateLeftTeam(data.game, data.teams.leftTeam);
               overlayData.updateRightTeam(data.game, data.teams.rightTeam);
               break;
            case 'series:update':
               console.log(`[Control WS]: Series update`);
               overlayData.updateSeries(data.game, data.series);
               break;
            case 'caster:update':
               console.log(`[Control WS]: Caster update`);
               if(data.side === 'left') {
                  overlayData.updateCasters(data.game, {casterl: data.caster.name, casterr: overlayData.getCastersByGame(data.game).casterr});
               } else {
                  overlayData.updateCasters(data.game, {casterl: overlayData.getCastersByGame(data.game).casterl, casterr: data.caster.name});
               }
               break;
            case 'heartbeat':
               break;
            default:
               console.log(`[Control WS]: Unknown event ${data.event}`);
         }
      }
      ws.onopen = function () {
         console.log(`[Control WS]: Connected`);
         appSettings.updateControlWSStatus('connected');
      };
      ws.onclose = function (event) {
         const reason = DecodeWSCode(event);
         console.log(`[Control WS]: Disconnected - ${reason}`);
         appSettings.updateControlWSStatus('disconnected');
         if (reattempt > 5) {
            console.log(`[Control WS]: Reconnect failed, giving up`);
            return;
         }
         reattempt++;
         console.log(`[Control WS]: Reconnect attempt ${reattempt}`);
         console.log('[Control WS] Reconnect will be attempted in 5 seconds.');
         setTimeout(function () {
            reconnect();
         }, 5000);
      };
   }
   connect()
}
