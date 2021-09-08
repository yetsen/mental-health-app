<template>
    <div class="container-fluid dashboard">
        <header class="section-header">
          <h2>Welcome To Employee Dashboard</h2>
        </header>
        <div class="row">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <boxPlot v-if="formulaResults['Well-Being']" :formulaResults="formulaResults"></boxPlot>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
              <bubbleWithMhComponent  v-if="formulaResults['Anxiety']" :formulaResults="formulaResults"></bubbleWithMhComponent>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <bubbleWithWbComponent  v-if="formulaResults['Well-Being']" :formulaResults="formulaResults"></bubbleWithWbComponent>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-sm-12 col-xs-12">

            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">

            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./dashboard.component.ts">
</script>


<style lang="scss" src="./dashboard.scss" scoped>
</style>
