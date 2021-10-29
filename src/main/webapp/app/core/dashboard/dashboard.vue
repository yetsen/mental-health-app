<template>
    <div class="container-fluid dashboard">
        <header v-if="!isEmployer()" class="section-header">
          <h2>Welcome To Your Dashboard</h2>
        </header>
        <header v-if="isEmployer()" class="section-header">
          <h2>Welcome To The Company's Dashboard</h2>
        </header>
        <h1 style="text-align: center">Current View</h1>
        <div class="row">

          <div class="col-md-4 col-sm-12 col-xs-12">
            <speedometerWithMh v-if="formulaResults['Anxiety']" :formulaResults="formulaResults"></speedometerWithMh>
            <employerSpeedometerWithMh v-if="isEmployer() && companyFormulaResults[0]" :companyFormulaResults="companyFormulaResults" :formulaResults="formulaResults"></employerSpeedometerWithMh>
          </div>

          <div class="col-md-4 col-sm-12 col-xs-12">
            <speedometerWithWb v-if="formulaResults['Well-Being']" :formulaResults="formulaResults"></speedometerWithWb>
            <employerSpeedometerWithWb v-if="isEmployer() && companyFormulaResults[0]" :companyFormulaResults="companyFormulaResults" :formulaResults="formulaResults"></employerSpeedometerWithWb>
          </div>
          <div class="col-md-4 col-sm-12 col-xs-12">
            <speedometerWithBurnoutComponent v-if="formulaResults['Well-Being']" :formulaResults="formulaResults"></speedometerWithBurnoutComponent>
            <employerBar v-if="isEmployer() && companyFormulaResults[0]" :companyFormulaResults="companyFormulaResults" :formulaResults="formulaResults"></employerBar>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 col-sm-12 col-xs-12">
            <employeeCurrentHorizontalBar v-if="formulaResults['Anxiety']" :formulaResults="formulaResults"></employeeCurrentHorizontalBar>
          </div>
        </div>

        <h1 style="text-align: center">View Over Time</h1>
        <div class="row">
          <div class="col-md-12 col-sm-12 col-xs-12">
            <generalLine v-if="formulaResults['Well-Being']" :formulaResults="formulaResults"></generalLine>
          </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <bubbleWithMhComponent  v-if="formulaResults['Well-Being']" :formulaResults="formulaResults"></bubbleWithMhComponent>
              <boxPlot v-if="isEmployer() && companyFormulaResults[0] && formulaResults['Business Productivity']" :companyFormulaResults="companyFormulaResults" :formulaResults="formulaResults"></boxPlot>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
              <bubbleWithWbComponent  v-if="formulaResults['Well-Being']" :formulaResults="formulaResults"></bubbleWithWbComponent>
              <scatterLineMh v-if="isEmployer() && companyFormulaResults[0] && formulaResults['Business Productivity']" :formulaResults="formulaResults" :companyFormulaResults="companyFormulaResults"></scatterLineMh>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <bubbleWithMhBurnoutPr v-if="formulaResults['Well-Being']" :formulaResults="formulaResults"></bubbleWithMhBurnoutPr>
              <scatterLineWb v-if="isEmployer() && companyFormulaResults[0] && formulaResults['Business Productivity']" :formulaResults="formulaResults" :companyFormulaResults="companyFormulaResults"></scatterLineWb>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
              <bubbleWithWbBurnoutPr v-if="formulaResults['Well-Being']" :formulaResults="formulaResults"></bubbleWithWbBurnoutPr>

              <employerBubble v-if="isEmployer() && companyFormulaResults[0] && formulaResults['Business Productivity']" :formulaResults="formulaResults" :companyFormulaResults="companyFormulaResults"></employerBubble>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <syncWithJs v-if="formulaResults['Well-Being']" :formulaResults="formulaResults"></syncWithJs>
              <employerCombination v-if="isEmployer() && companyFormulaResults[0] && formulaResults['Business Productivity']" :formulaResults="formulaResults" :companyFormulaResults="companyFormulaResults"></employerCombination>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
              <syncWithEp v-if="formulaResults['Well-Being']" :formulaResults="formulaResults"></syncWithEp>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./dashboard.component.ts">
</script>


<style lang="scss" src="./dashboard.scss" scoped>
</style>
