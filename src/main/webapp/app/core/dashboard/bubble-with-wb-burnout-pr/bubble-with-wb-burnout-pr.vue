<template>
    <div class="card">
        <div class="card-body">
            <div v-if="formulaResults['Well-Being']">
              <highcharts :options="chartOptions"></highcharts>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./bubble-with-wb-burnout-pr.component.ts">
</script>
<style lang="scss" src="./bubble-with-wb-burnout-pr.scss" scoped>
</style>
