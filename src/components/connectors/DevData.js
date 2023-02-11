// mouse.js
import { gameStateStore } from '@/store/gameStateStore'

// by convention, composable function names start with "use"
export function DevConnector() {
    const gameState = gameStateStore();
    gameState.updateState(data.data);
}