<template>
    <div class="card">
        <div class="card-body">
            <div v-if="formulaResults['Anxiety']">
              <highcharts :options="chartOptions"></highcharts>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./bubble-with-wb.component.ts">
</script>
<style lang="scss" src="./bubble-with-wb.scss" scoped>
</style>
