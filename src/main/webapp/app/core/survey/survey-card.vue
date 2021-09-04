<template>
    <div class="survey-page">
        <div class="container-fluid">
            <div class="row justify-content-md-center">
              <div class="col-3"></div>
              <div class="col-9">
                <div v-if="!isCompletionPage" class="progress center-block mx-auto mb-4">
                  <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" :style="{width: progress}">
                    <span>{{ pageNumber }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row align-content-start">
              <div id="sidebar-wrapper-div" class="col-3">
                <div class="row">
                  <div class="col-6">
                    <div class="jigsaw1" :class="{ 'grayout' : isGrayOut[0] == 1}" id="jigsaw1">
                      <span class="t"></span>
                      <span class="r"></span>
                      <span class="b"></span>
                      <span class="l"></span>
                      <span class="text">Introduction</span>
                    </div>
                    <div class="jigsaw3" :class="{ 'grayout' : isGrayOut[2] === 1}" id="jigsaw3">
                      <span class="t"></span>
                      <span class="r"></span>
                      <span class="b"></span>
                      <span class="l"></span>
                      <span class="text">Mental Health</span>
                    </div>
                    <div class="jigsaw5" :class="{ 'grayout' : isGrayOut[4] === 1}" id="jigsaw5">
                      <span class="t"></span>
                      <span class="r"></span>
                      <span class="b"></span>
                      <span class="l"></span>
                      <span class="text">Productivity</span>
                    </div>

                    <div class="jigsaw7" :class="{ 'grayout' : isGrayOut[6] === 1}" id="jigsaw7">
                      <span class="t"></span>
                      <span class="r"></span>
                      <span class="b"></span>
                      <span class="l"></span>
                      <span class="text">Physical Demand</span>
                    </div>
                    <div class="jigsaw9" :class="{ 'grayout' : isGrayOut[8] === 1}" id="jigsaw9">
                      <span class="t"></span>
                      <span class="r"></span>
                      <span class="b"></span>
                      <span class="l"></span>
                      <span class="text">Job Promotion</span>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="jigsaw2" :class="{ 'grayout' : isGrayOut[1] === 1}" id="jigsaw2">
                      <span class="t"></span>
                      <span class="r"></span>
                      <span class="b"></span>
                      <span class="l"></span>
                      <span class="text">Personality</span>
                    </div>
                    <div class="jigsaw4" :class="{ 'grayout' : isGrayOut[3] === 1}" id="jigsaw4">
                      <span class="t"></span>
                      <span class="r"></span>
                      <span class="b"></span>
                      <span class="l"></span>
                      <span class="text">Well-being</span>
                    </div>
                    <div class="jigsaw6" :class="{ 'grayout' : isGrayOut[5] === 1}" id="jigsaw6">
                      <span class="t"></span>
                      <span class="r"></span>
                      <span class="b"></span>
                      <span class="l"></span>
                      <span class="text">Psychological Demand</span>
                    </div>
                    <div class="jigsaw8" :class="{ 'grayout' : isGrayOut[7] === 1}" id="jigsaw8">
                      <span class="t"></span>
                      <span class="r"></span>
                      <span class="b"></span>
                      <span class="l"></span>
                      <span class="text">Job Insecurity</span>
                    </div>
                    <div class="jigsaw10" :class="{ 'grayout' : isGrayOut[9] === 1}" id="jigsaw10">
                      <span class="t"></span>
                      <span class="r"></span>
                      <span class="b"></span>
                      <span class="l"></span>
                      <span class="text">Recognition</span>
                    </div>
                  </div>
                </div>
              </div>
              <div id="survey-body" class="col-9">
                <div id="surveyElement">
                  <survey :survey='survey'></survey>
                </div>
              </div>
            </div>
            <div id="navigationButtons" class="row justify-content-md-center">
              <div class="col-3">

              </div>
              <div class="col-9">
                <div v-if="!isCompletionPage" class="panel-footer card-footer">
                  <input v-if="!survey.isFirstPage" type="button" @click="survey.prevPage()" value="Previous" class="btn btn-primary float-left" >
                  <input type="button" @click="prepareClearAndExitModal()" value="Clear & Exit" class="btn btn-primary float-left" >
                  <input v-if="!survey.isLastPage" type="button" @click="survey.nextPage()" value="Next" class="btn btn-primary float-right">
                  <input v-if="survey.isLastPage" type="button" @click="survey.completeLastPage()" value="Complete" class="btn btn-primary float-right" >
                </div>
              </div>
            </div>
        </div>
        <b-modal ref="clearAndExitModal" id="clearAndExitModal" title="Confirm Clear & Exit" v-bind:title="$t('global.modal.survey.clearAndExit.title')">
            <div class="modal-body">
                <p id="jhi-delete-user-heading" v-text="$t('global.modal.survey.clearAndExit.question')">Are you sure you want to clear and exit the survey?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-primary" v-text="$t('global.modal.survey.clearAndExit.no')" @click="closeDialog()">No</button>
                <button type="button" class="btn btn-primary" v-text="$t('global.modal.survey.clearAndExit.yes')" @click="clearAndGoToHomePage()">Yes</button>
            </div>
        </b-modal>
        <b-modal ref="previewChartModal" id="previewChartModal" title="Preview" :no-close-on-backdrop="true" v-bind:click-to-close="false">
          <div class="modal-body">
            <dummyComponent :chartOptions="currentChart.chartOptions"></dummyComponent>
          </div>
          <div slot="modal-footer">
            <button type="button" class="btn btn-primary" @click="closeDialogAndOpenNextPage()">Continue</button>
          </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./survey-card.component.ts">
</script>
<style lang="scss" src="./survey-card.scss" scoped>
</style>
