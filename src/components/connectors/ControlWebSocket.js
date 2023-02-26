import { overlayDataStore } from '@/store/overlayDataStore';
import { appSettingsStore } from '@/store/appSettingsStore';
import DecodeWSCode from '@/utils/DecodeWSCode';
export function ControlConnector() {
   const overlayData = overlayDataStore();
   const appSettings = appSettingsStore();
   const ws = new WebSocket(appSettings.getControlWSConn);
   function connect() {
      ws.onmessage = (event) => {
         let data = JSON.parse(event.data);
         switch (data.event) {
            case 'control:connected':
               console.log(`[Control WS]: Connected to Control WebSocket ${data.data}`);
               break;
            case 'control:initailize':
               console.log(`[Control WS]: Initializing`);
               overlayData.updateLeftTeam(data.teams.leftTeam);
               overlayData.updateRightTeam(data.teams.rightTeam);
               overlayData.updateSeries(data.series);
               break;
            case 'team:update':
               console.log(`[Control WS]: Team update`);
               switch (data.data.team.side) {
                  case 0:
                     overlayData.updateLeftTeam(data.team);
                     break;
                  case 1:
                     overlayData.updateRightTeam(data.team);
                     break;
                  default:
                     console.log(`[Control WS]: Unknown team side ${data.team.side}`);
               }
               overlayData.resetState();
               break;
            case 'team:swap':
               console.log(`[Control WS]: Team swap`);
               overlayData.updateLeftTeam(data.teams.leftTeam);
               overlayData.updateRightTeam(data.teams.rightTeam);
               break;
            case 'series:update':
               console.log(`[Control WS]: Series update`);
               overlayData.updateSeries(data.series);
               break;
            default:
               console.log(`[Control WS]: Unknown event ${data.event}`);
         }
      }
      ws.onopen = function () {
         console.log(`[Control WS]: Connected`);
      };
      ws.onerror = function () {
         console.log(`[Control WS]: Error`);
      };
      ws.onclose = function (event) {
         const reason = DecodeWSCode(event);
         console.log(`[Control WS]: Disconnected - ${reason}`);
      };
   }
   connect()
}
