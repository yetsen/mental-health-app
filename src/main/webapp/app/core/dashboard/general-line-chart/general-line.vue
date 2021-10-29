<template>
    <div class="card">
        <div class="card-body">
            <div v-if="formulaResults['Mental Health']">
              <highcharts :options="chartOptions"></highcharts>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./general-line.component.ts">
</script>
<style lang="scss" src="./general-line.scss" scoped>
</style>
