<template>
    <div class="container-fluid dashboard">
        <header v-if="!isEmployer()" class="section-header">
          <h2>Welcome To Your Dashboard</h2>
        </header>
        <header v-if="isEmployer()" class="section-header">
          <h2>Welcome To Your Dashboard</h2>
        </header>
        <div class="row">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <boxPlot v-if="formulaResults['Well-Being']" :formulaResults="formulaResults"></boxPlot>
              <scatterLineMh v-if="isEmployer() && companyFormulaResults[0]" :formulaResults="formulaResults" :companyFormulaResults="companyFormulaResults"></scatterLineMh>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
              <bubbleWithMhComponent  v-if="formulaResults['Anxiety']" :formulaResults="formulaResults"></bubbleWithMhComponent>
              <scatterLineWb v-if="isEmployer() && companyFormulaResults[0]" :formulaResults="formulaResults" :companyFormulaResults="companyFormulaResults"></scatterLineWb>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <bubbleWithWbComponent  v-if="formulaResults['Well-Being']" :formulaResults="formulaResults"></bubbleWithWbComponent>
              <employerBubble v-if="isEmployer() && companyFormulaResults[0]" :formulaResults="formulaResults" :companyFormulaResults="companyFormulaResults"></employerBubble>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
              <syncWithEp v-if="formulaResults['Well-Being']" :formulaResults="formulaResults"></syncWithEp>
              <employerCombination v-if="isEmployer() && companyFormulaResults[0]" :formulaResults="formulaResults" :companyFormulaResults="companyFormulaResults"></employerCombination>
            </div>
        </div>
        <div class="row">
            <div style="margin-top: -29vh;" class="col-md-6 col-sm-12 col-xs-12">
              <syncWithJs v-if="formulaResults['Well-Being']" :formulaResults="formulaResults"></syncWithJs>
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
