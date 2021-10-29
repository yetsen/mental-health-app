<template>
    <div class="card">
        <div class="card-body">
            <div v-if="formulaResults['Mental Health']">
              <highcharts :options="chartOptions"></highcharts>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./employee-current-horizontal-bar-chart.component.ts">
</script>
<style lang="scss" src="./employee-current-horizontal-bar-chart.scss" scoped>
</style>
