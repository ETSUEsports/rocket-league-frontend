<script setup>
import { overlayDataStore } from '@/store/overlayDataStore';
const overlayData = overlayDataStore();
const game = overlayData.game;

</script>

<template>
    <div class="caster_container">
        <div class="caster team_left outline blue">
            <h2>{{ $t('dashboard.left_caster') }}</h2>
            <div class="inputgroup">
                <label for="left_caster_name">{{ $t('dashboard.team_name') }}</label>
                <input v-model="overlayData.games[game].casters.casterl" type="text" id="left_caster_name" name="left_caster_name" />
            </div>
        </div>
        <div class="caster team_right outline orange">
            <h2>{{ $t('dashboard.right_caster') }}</h2>
            <div class="inputgroup">
                <label for="right_caster_name">{{ $t('dashboard.team_name') }}</label>
                <input v-model="overlayData.games[game].casters.casterr" type="text" id="right_caster_name" name="right_caster_name" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.caster_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    width: 100%;

    .team_left {
        input:focus {
            outline: 2px solid var(--rl-primary-blue);
        }
    }

    .team_right {
        input:focus {
            outline: 2px solid var(--rl-primary-orange);
        }
    }

    .caster {
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

            #left_caster_name,
            #right_caster_name {
                width: 300px;
            }

        }
    }
}
</style>
