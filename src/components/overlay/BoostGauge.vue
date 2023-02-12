<script>
export default {
  watch: {
    player(player) {
      switch (player.team) {
        case 0:
          this.chartOptions = { fill: { colors: ["#1873FF"] } };
          break;
        case 1:
          this.chartOptions = { fill: { colors: ["#F48D2E"] } };
          break;
        default:
          this.chartOptions = { fill: { colors: ["#F48D2E"] } };
          break;
      }
    }
  },
  data() {
    return {
      chartOptions: {
        chart: {
          id: 'gauge',
          height: 250,
          type: 'radialBar'
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            track: {
              background: "#2d3c49",
              strokeWidth: '50%',
            },
            hollow: {
              margin: 0,
              size: "60%",
              position: "back",
              background: "var(--etsu-primary-trans)"
            },
            dataLabels: {
              name: {
                fontSize: '16px',
                color: '#ffffff',
                offsetY: 120
              },
              value: {
                offsetY: 15,
                fontSize: '2.5em',
                fontFamily: "Fyrste",
                color: '#ffffff',
                formatter: function (val) {
                  return val;
                }
              }
            }
          }
        },
        fill: {
          colors: ["#F48D2E"],
          type: 'solid',
        },
        labels: [''],
      },
    }
  }
}
</script>


<script setup>
import VueApexCharts from 'vue3-apexcharts';
import { defineProps } from 'vue';
const props = defineProps(['player']);
</script>

<template>
  <div class="container">
    <div class="top">
      <VueApexCharts class="gauge" type="radialBar" height="300" :options="chartOptions" :series="[props.player.boost]" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top {
  height: 250px;
  width: 250px;
  background-color: var(--etsu-primary-bg);
  border-radius: 50%;
  display: inline-block;
  margin-right: 30px;
}

.gauge {
  position: relative;
  bottom: 10px;
}
</style>
