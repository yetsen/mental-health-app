<template>
    <div class="card">
        <div class="card-body">
            <div v-if="formulaResults['Anxiety']">
              <highcharts v-for="options in optionsList" :options="options" ref="highcharts" class="chart"></highcharts>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./sync-with-js.component.ts">
</script>
<style lang="scss" src="./sync-with-js.scss" scoped>
</style>
