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
               overlayData.updateLeftTeam(data.teams.leftTeam);
               overlayData.updateRightTeam(data.teams.rightTeam);
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
         appSettings.updateControlWSStatus('connected');
      };
      ws.onerror = function () {
         console.log(`[Control WS]: Error`);
         appSettings.updateControlWSStatus('error');
      };
      ws.onclose = function (event) {
         const reason = DecodeWSCode(event);
         console.log(`[Control WS]: Disconnected - ${reason}`);
         appSettings.updateControlWSStatus('disconnected');
      };
   }
   connect()
}
