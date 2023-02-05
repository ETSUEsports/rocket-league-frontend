<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: ['player'],
  data() {
    return {
      chartOptions: {
        chart: {
          height: 250,
          type: 'radialBar'
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              name: {
                fontSize: '16px',
                color: '#ffffff',
                offsetY: 120
              },
              value: {
                offsetY: 76,
                fontSize: '22px',
                color: '#ffffff',
                formatter: function (val) {
                  return val + "%";
                }
              }
            }
          }
        },
        fill: {
          type: 'solid',
        },
        labels: [''],
      },
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="top">
      <apexchart type="radialBar" height="350" :options="chartOptions" :series="[player.boost]"></apexchart>
    </div>
  </div>
</template>
