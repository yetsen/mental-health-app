<template>
    <div class="card">
        <div class="card-body">
            <div v-if="formulaResults['Anxiety']">
              <highcharts :options="chartOptions"></highcharts>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./box-plot.component.ts">
</script>
<style lang="scss" src="./box-plot.scss" scoped>
</style>
