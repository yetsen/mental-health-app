<template>
    <div v-if="chartList.length > 0" class="container-fluid dashboard">
        <div class="row">
            <div class="col-md-6 col-sm-12 col-xs-12">
                <dummyComponent :chartOptions="chartList[0].chartOptions"></dummyComponent>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
                <dummyComponent :chartOptions="chartList[0].chartOptions"></dummyComponent>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4 col-sm-12 col-xs-12">
                <dummyComponent :chartOptions="chartList[0].chartOptions"></dummyComponent>
            </div>
            <div class="col-md-4 col-sm-12 col-xs-12">
                <dummyComponent :chartOptions="chartList[0].chartOptions"></dummyComponent>
            </div>
            <div class="col-md-4 col-sm-12 col-xs-12">
                <dummyComponent :chartOptions="chartList[0].chartOptions"></dummyComponent>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./dashboard.component.ts">
</script>


<style lang="scss" src="./dashboard.scss" scoped>
</style>
