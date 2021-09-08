<template>
    <div class="container-fluid dashboard">
        <div class="row">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <bubbleWithMhComponent  v-if="formulaResults['Anxiety']" :formulaResults="formulaResults"></bubbleWithMhComponent>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
              <bubbleWithWbComponent  v-if="formulaResults['Well-Being']" :formulaResults="formulaResults"></bubbleWithWbComponent>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-sm-12 col-xs-12">

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
