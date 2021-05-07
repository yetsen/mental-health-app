<template>
    <div class="card">
        <div class="card-header text-center">
            Survey Result
        </div>
        <div class="card-body">
            <h5 class="card-title text-center">Special title treatment</h5>
            <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
        </div>
    </div>
</template>

<script lang="ts" src="./dummy.component.ts">
</script>
<style lang="scss" src="./dummy.scss" scoped>
</style>
