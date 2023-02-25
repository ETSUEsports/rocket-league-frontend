import { overlayDataStore } from '@/store/overlayDataStore';
import DecodeWSCode from '@/utils/DecodeWSCode';
import { useToast } from "vue-toastification";
const toast = useToast();
export function ControlConnector() {
   const overlayData = overlayDataStore();
   const ws = new WebSocket("ws://localhost:3000");
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
                break;
            case 'team:update':
               console.log(`[Control WS]: Team update`);
               switch(data.data.team.side) {
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
            default:
               console.log(`[Control WS]: Unknown event ${data.event}`);
         }
      }
      ws.onopen = function () {
         toast.success("Connected to Control WebSocket", { timeout: 2000 });
         console.log(`[Control WS]: Connected`);
      };
      ws.onerror = function () {
         toast.error("Error connecting to Control WebSocket", { timeout: 2000 });
         console.log(`[Control WS]: Error`);
      };
      ws.onclose = function (event) {
         const reason = DecodeWSCode(event);
         console.log(`[Control WS]: Disconnected - ${reason}`);
      };
   }
   connect()
}
