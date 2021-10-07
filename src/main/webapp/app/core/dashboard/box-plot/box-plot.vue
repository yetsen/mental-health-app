<template>
    <div class="card">
        <div class="card-body">
            <div>
              <highcharts :options="chartOptions"></highcharts>
              <button class="btn btn-primary" id="select-btn">Select All</button>
              <button class="btn btn-primary" id="deselect-btn">Deselect All</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./box-plot.component.ts">
</script>
<style lang="scss" src="./box-plot.scss" scoped>
</style>
