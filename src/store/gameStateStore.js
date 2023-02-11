import { defineStore, acceptHMRUpdate } from 'pinia'

export const gameStateStore = defineStore({
    id: 'gameState',
    state: () => ({
        clock: 300,
        winner: "",
        ball: "",
        hasWinner: false,
        isOT: false,
        isReplay: false,
        hasTarget: false,
        target: "",
        teams: [{"color_primary": "1873FF", "color_secondary": "E5E5E5", "name": "Team 1", "score": 0}, { "color_primary": "C26418", "color_secondary": "E5E5E5", "name": "Team 2", "score": 0 }],
        players: {"Player_1": { "assists": 0, "boost": 33, "demos": 0, "goals": 0, "id": "Player_1", "name": "Player 1", "primaryID": "0", "saves": 0, "score": 0, "shortcut": 1, "shots": 0, "speed": 0, "team": 0}, "Player_2": { "assists": 0, "boost": 33, "demos": 0, "goals": 0, "id": "Player_2", "name": "Player 2", "primaryID": "0", "saves": 0, "score": 0, "shortcut": 2, "shots": 0, "speed": 0, "team": 0}, "Player_3": { "assists": 0, "boost": 33, "demos": 0, "goals": 0, "id": "Player_3", "name": "Player 3", "primaryID": "0", "saves": 0, "score": 0, "shortcut": 3, "shots": 0, "speed": 0, "team": 0}, "Player_4": { "assists": 0, "boost": 33, "demos": 0, "goals": 0, "id": "Player_4", "name": "Player 4", "primaryID": "0", "saves": 0, "score": 0, "shortcut": 4, "shots": 0, "speed": 0, "team": 1}, "Player_5": { "assists": 0, "boost": 33, "demos": 0, "goals": 0, "id": "Player_5", "name": "Player 5", "primaryID": "0", "saves": 0, "score": 0, "shortcut": 5, "shots": 0, "speed": 0, "team": 1}, "Player_6": { "assists": 0, "boost": 33, "demos": 0, "goals": 0, "id": "Player_6", "name": "Player 6", "primaryID": "0", "saves": 0, "score": 0, "shortcut": 6, "shots": 0, "speed": 0, "team": 1}},
    }),
    getters: {
        scoreboardClock: (state) => {
            const d = Number(state.clock);
            const m = Math.floor(d % 3600 / 60);
            const s = Math.floor(d % 3600 % 60);
            return `${state.isOT ? '+':''}${m}:${('0' + s).slice(-2)}`;
        },
        getTeam: (state) => {
            return (side) => {
                switch (side) {
                    case 'left':
                        return state.teams[0];
                    case 'right':
                        return state.teams[1];
                    default:
                        return 'Specify side';
                }
            }
        },
        getPlayers: (state) => {
            return (side) => {
                switch (side) {
                    case 'left':
                        return filterByTeam(state.players, 0);
                    case 'right':
                        return filterByTeam(state.players, 1);
                    default:
                        return 'Specify side';
                }
            }
        },
        getHighlightedPlayer: (state) => {
            if(state.hasTarget){
                return state.players[state.target];
            }
            return null;
        }
    },
    actions: {
        updateState(data) {
            this.clock = data.game.time_seconds;
            this.teams = data.game.teams;
            this.players = data.players;
            this.winner = data.game.winner;
            this.ball = data.game.ball;
            this.isOT = data.game.isOT;
            this.isReplay = data.game.isReplay;
            this.hasWinner = data.game.hasWinner;
            if(data.game.hasTarget) {
                this.target = data.game.target;
                this.hasTarget = true;
            } else{
                this.target = "";
                this.hasTarget = false;
            }
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(gameStateStore, import.meta.hot))
}

function filterByTeam(obj, side) {
    const filtered = {};
    Object.keys(obj).forEach(key => {
        if (obj[key].team === side) {
            filtered[key] = obj[key];
        }
    });
    return filtered;
}
