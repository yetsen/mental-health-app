<template>
    <div class="card">
        <div class="card-body">
            <div v-if="formulaResults['Anxiety']">
              <highcharts :options="chartOptions"></highcharts>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./employer-speedometer-with-wb.component.ts">
</script>
<style lang="scss" src="./speedometer-with-wb.scss" scoped>
</style>
