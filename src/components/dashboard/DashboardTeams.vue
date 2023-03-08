<script setup>
import { overlayDataStore } from '@/store/overlayDataStore';
const overlayData = overlayDataStore();
const add = (type) => {
    switch (type) {
        case 'game':
            // cannot go over bestOf
            if (overlayData.series.gameNumber >= overlayData.series.bestOf) {
                return;
            }
            overlayData.series.gameNumber += 1;
            break;
        case 'best_of':
            // cannot go over 7
            if (overlayData.series.bestOf >= 7) {
                return;
            }
            overlayData.series.bestOf += 1;
            break;
        case 'left_score':
            // cannot go over best of
            if (overlayData.leftTeam.score >= overlayData.series.bestOf) {
                return;
            }
            overlayData.leftTeam.score += 1;
            break;
        case 'right_score':
            // cannot go over best of
            if (overlayData.rightTeam.score >= overlayData.series.bestOf) {
                return;
            }
            overlayData.rightTeam.score += 1;
            break;
    }
};

const del = (type) => {
    switch (type) {
        case 'game':
            // cannot go below 1
            if (overlayData.series.gameNumber <= 1) {
                return;
            }
            overlayData.series.gameNumber -= 1;
            break;
        case 'best_of':
            // cannot go below 3
            if (overlayData.series.bestOf <= 3) {
                return;
            }
            overlayData.series.bestOf -= 1;
            break;
        case 'left_score':
            // cannot go below 0
            if (overlayData.leftTeam.score <= 0) {
                return;
            }
            overlayData.leftTeam.score -= 1;
            break;
        case 'right_score':
            // cannot go below 0
            if (overlayData.rightTeam.score <= 0) {
                return;
            }
            overlayData.rightTeam.score -= 1;
            break;
    }
};

</script>

<template>
    <div class="teams_container">
        <div class="team team_left outline blue">
            <h2>{{ $t('dashboard.left_team') }}</h2>
            <div class="inputgroup">
                <label for="left_team_name">{{ $t('dashboard.team_name') }}</label>
                <input v-model="overlayData.leftTeam.name" type="text" id="left_team_name" name="left_team_name" />
            </div>
            <div class="inputgroup">
                <label for="left_team_score">{{ $t('dashboard.team_score') }}</label>
                <button class="button success" @click="add('left_score')"><span
                        class="material-symbols-outlined">add</span></button>
                <button class="button danger" @click="del('left_score')"><span
                        class="material-symbols-outlined">remove</span></button>
                <input v-model="overlayData.leftTeam.score" type="number" id="left_team_score" name="left_team_score" />
            </div>
            <div class="inputgroup">
                <label for="left_team_logo">{{ $t('dashboard.team_logo') }}</label>
                <input v-model="overlayData.leftTeam.image" type="text" id="left_team_logo" name="left_team_logo" />
            </div>
        </div>
        <div class="team team_right outline orange">
            <h2>{{ $t('dashboard.right_team') }}</h2>
            <div class="inputgroup">
                <label for="right_team_name">{{ $t('dashboard.team_name') }}</label>
                <input v-model="overlayData.rightTeam.name" type="text" id="right_team_name" name="right_team_name" />
            </div>
            <div class="inputgroup">
                <label for="right_team_score">{{ $t('dashboard.team_score') }}</label>
                <button class="button success" @click="add('right_score')"><span
                        class="material-symbols-outlined">add</span></button>
                <button class="button danger" @click="del('right_score')"><span
                        class="material-symbols-outlined">remove</span></button>
                <input v-model="overlayData.rightTeam.score" type="number" id="right_team_score" name="right_team_score" />
            </div>
            <div class="inputgroup">
                <label for="right_team_logo">{{ $t('dashboard.team_logo') }}</label>
                <input v-model="overlayData.rightTeam.image" type="text" id="right_team_logo" name="right_team_logo" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.teams_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    width: 100%;

    .team_left {
        input:focus {
            outline: 2px solid var(--rl-primary-orange);
        }
    }

    .team_right {
        input:focus {
            outline: 2px solid var(--rl-primary-blue);
        }
    }

    .team {
        width: 50%;
        height: 100%;
        margin: 4px;
        background-color: var(--db-secondary-bg);
        align-items: center;
        padding-bottom: 5px;

        .inputgroup {
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: flex-start;
            padding-top: 2vh;

            label {
                padding-right: 5px;
            }

            #left_team_name,
            #right_team_name {
                width: 300px;
            }

            #left_team_score,
            #right_team_score {
                width: 80px;
            }

            #left_team_logo,
            #right_team_logo {
                width: 400px;
            }
        }
    }
}
</style>
