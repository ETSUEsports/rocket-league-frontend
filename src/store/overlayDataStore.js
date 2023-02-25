import { defineStore, acceptHMRUpdate } from 'pinia';

export const overlayDataStore = defineStore({
    id: 'overlayData',
    persist: true,
    state: () => ({
        leftTeam: { name: "Left Team", score: 0, image: "" },
        rightTeam: { name: "Right Team", score: 0, image: "" },
    }),
    getters: {
        getLeftTeam: (state) => {
            return state.leftTeam;
        },
        getRightTeam: (state) => {
            return state.rightTeam;
        }
    },
    actions: {
        updateLeftTeam(team) {
            this.leftTeam = team;
        },
        updateRightTeam(team) {
            this.rightTeam = team;
        },
        resetState() {
            this.$reset();
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(overlayDataStore, import.meta.hot));
}