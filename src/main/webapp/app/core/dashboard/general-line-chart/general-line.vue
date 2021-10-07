<template>
    <div class="card">
        <div class="card-body">
            <div v-if="formulaResults['Anxiety']">
              <highcharts :options="chartOptions"></highcharts>
              <button class="btn btn-primary" id="select-btn">Select All</button>
              <button class="btn btn-primary" id="deselect-btn">Deselect All</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./general-line.component.ts">
</script>
<style lang="scss" src="./general-line.scss" scoped>
</style>
