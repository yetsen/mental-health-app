<template>
    <div v-if="chartList.length > 0" class="container-fluid dashboard">
        <div class="row">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <b-carousel
                  id="carousel-1"
                  controls
                  indicators
                  :interval="0"
                  background="#fff"
                  style="text-shadow: 1px 1px 2px #333;">
                <b-carousel-slide>
                  <dummyComponent :chartOptions="chartList[1].chartOptions"></dummyComponent>
                </b-carousel-slide>
                <b-carousel-slide>
                  <dummyComponent :chartOptions="chartList[1].chartOptions"></dummyComponent>
                </b-carousel-slide>
              </b-carousel>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
              <b-carousel
                  id="carousel-2"
                  controls
                  indicators
                  :interval="0"
                  background="#fff"
                  style="text-shadow: 1px 1px 2px #333;">
                <b-carousel-slide>
                  <dummyComponent :chartOptions="chartList[2].chartOptions"></dummyComponent>
                </b-carousel-slide>
                <b-carousel-slide>
                  <dummyComponent :chartOptions="chartList[2].chartOptions"></dummyComponent>
                </b-carousel-slide>
              </b-carousel>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <b-carousel
                  id="carousel-2"
                  controls
                  indicators
                  :interval="0"
                  background="#fff"
                  style="text-shadow: 1px 1px 2px #333;">
                <b-carousel-slide>
                  <dummyComponent :chartOptions="chartList[0].chartOptions"></dummyComponent>
                </b-carousel-slide>
                <b-carousel-slide>
                  <dummyComponent :chartOptions="chartList[0].chartOptions"></dummyComponent>
                </b-carousel-slide>
              </b-carousel>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
              <b-carousel
                  id="carousel-2"
                  controls
                  indicators
                  :interval="0"
                  background="#fff"
                  style="text-shadow: 1px 1px 2px #333;">
                <b-carousel-slide>
                  <dummyComponent :chartOptions="chartList[5].chartOptions"></dummyComponent>
                </b-carousel-slide>
                <b-carousel-slide>
                  <dummyComponent :chartOptions="chartList[5].chartOptions"></dummyComponent>
                </b-carousel-slide>
              </b-carousel>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <b-carousel
                  id="carousel-2"
                  controls
                  indicators
                  :interval="0"
                  background="#fff"
                  style="text-shadow: 1px 1px 2px #333;">
                <b-carousel-slide>
                  <dummyComponent :chartOptions="chartList[4].chartOptions"></dummyComponent>
                </b-carousel-slide>
                <b-carousel-slide>
                  <dummyComponent :chartOptions="chartList[4].chartOptions"></dummyComponent>
                </b-carousel-slide>
              </b-carousel>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
              <b-carousel
                  id="carousel-2"
                  controls
                  indicators
                  :interval="0"
                  background="#fff"
                  style="text-shadow: 1px 1px 2px #333;">
                <b-carousel-slide>
                  <dummyComponent :chartOptions="chartList[3].chartOptions"></dummyComponent>
                </b-carousel-slide>
                <b-carousel-slide>
                  <dummyComponent :chartOptions="chartList[3].chartOptions"></dummyComponent>
                </b-carousel-slide>
              </b-carousel>
            </div>
            <span v-show="false">{{userId}}</span>
            <span v-show="false">{{companyId}}</span>
            <span v-show="false">{{isEmployer}}</span>
        </div>
    </div>
</template>

<script lang="ts" src="./dashboard.component.ts">
</script>


<style lang="scss" src="./dashboard.scss" scoped>
</style>
