import DecodeStatfeed from '@/utils/DecodeStatfeed';
import { defineStore, acceptHMRUpdate } from 'pinia';
const iconsMap = {
    'SHOT': 'SHOT_ICON',
    'SAVE': 'SAVE_ICON',
    'DEMO': 'DEMO_ICON',
    'MVP': 'MVP_ICON'
};

export const gameStateStore = defineStore({
    id: 'gameState',
    persist: false,
    state: () => ({
        clock: 300,
        winner: "",
        ball: "",
        hasWinner: false,
        isOT: false,
        isReplay: false,
        hasTarget: false,
        target: "",
        teams: [{ "color_primary": "1873FF", "color_secondary": "E5E5E5", "name": "Team 1", "score": 0 }, { "color_primary": "C26418", "color_secondary": "E5E5E5", "name": "Team 2", "score": 0 }],
        players: {},
        replayStats: { "assister": { "id": "", "name": "Player 2" }, "ball_last_touch": { "player": "", "speed": 0 }, "goalspeed": 0, "goaltime": 0, "impact_location": { "X": 0, "Y": 0 }, "scorer": { "id": "", "name": "Player 1", "teamnum": 0 } },
        postGameStats: {},
        postGameMVP: { "id": "", "name": "Player 1", "team": 0 },
        statfeedEvents: [],
    }),
    getters: {
        scoreboardClock: (state) => {
            const d = Number(state.clock);
            const m = Math.floor(d % 3600 / 60);
            const s = Math.floor(d % 3600 % 60);
            return `${state.isOT ? '+' : ''}${m}:${('0' + s).slice(-2)}`;
        },
        getTeam: (state) => {
            return (side) => {
                switch (side) {
                    case 'left':
                        return state.teams[0];
                    case 'right':
                        return state.teams[1];
                    case 0:
                        return state.teams[0];
                    case 1:
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
            if (state.hasTarget) {
                return state.players[state.target];
            }
            return null;
        },
        getReplayStats: (state) => {
            return state.replayStats;
        },
        getPostPlayers: (state) => {
            return (side) => {
                switch (side) {
                    case 'left':
                        return filterByTeam(state.postGameStats, 0);
                    case 'right':
                        return filterByTeam(state.postGameStats, 1);
                    default:
                        return 'Specify side';
                }
            }
        },
        getPostTeamTotal: (state) => {
            return (side, stat) => {
                const formatSide = side === 'left' ? 0 : 1;
                return getTeamTotal(formatSide, stat, state.postGameStats);
            }
        },
        getStatfeedEvents: (state) => {
            return state.statfeedEvents;
        },
        getStatfeedEventsByPlayer: (state) => {
            return (playerId) => {
                return state.statfeedEvents.filter(event => event.primary_player.id === playerId);
            }
        },
        getStatfeedIconForPlayer: (state) => {
            return (playerId) => {
                const events = state.statfeedEvents.filter(event => event.primary_player.id === playerId);
                if (events.length > 0) {
                    return iconsMap[events[events.length - 1].type];
                }
            }
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
            if (data.game.hasTarget) {
                this.target = data.game.target;
                this.hasTarget = true;
            } else {
                this.target = "";
                this.hasTarget = false;
            }
        },
        updateReplayStats(data) {
            this.replayStats = data;
        },
        updatePostGameStats(data) {
            this.postGameStats = data;
        },
        addStatfeedEvent(event) {
            const item = DecodeStatfeed(event);
            if (typeof item === 'undefined') return;
            if (item.type === 'MVP') this.setPostGameMVP(item.primary_player);
            this.statfeedEvents.push(item);
            setTimeout(() => {
                this.removeStatfeedEvent(item)
            }, 7000)
        },
        setPostGameMVP(player) {
            this.postGameMVP = player;
        },
        removeStatfeedEvent(event) {
            const index = this.statfeedEvents.indexOf(event);
            if (index > -1) {
                this.statfeedEvents.splice(index, 1);
            }
        },
        resetState() {
            const temp = this.postGameStats;
            this.$reset();
            this.postGameStats = temp;
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(gameStateStore, import.meta.hot));
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
function getTeamTotal(team, key, players) {
    let total = 0;
    for (const playerId in players) {
        const player = players[playerId];
        if (player.team === team) {
            total += player[key];
        }
    }
    return total;
}
