<template>
    <div class="survey-page">
        <div class="container-fluid">
            <div class="row justify-content-md-center">
              <div class="col-4"></div>
              <div class="col-8">
                <div id="progressBar" v-if="!isCompletionPage" class="progress center-block mx-auto mb-4">
                  <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" :style="{width: progress}">
                    <span id="progressbar">{{ pageNumber }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row align-content-start">
              <div id="sidebar-wrapper-div" class="col-4">
                <div class="row">
                  <div class="col-4">
                    <div class="jigsaw1" id="jigsaw1">
                      <span class="t"></span>
                      <span class="r"></span>
                      <span class="b"></span>
                      <span class="l"></span>
                      <span class="text">Introduction</span>
                    </div>
                    <div class="jigsaw3" id="jigsaw3">
                      <span class="t"></span>
                      <span class="r"></span>
                      <span class="b"></span>
                      <span class="l"></span>
                      <span class="text">Mental Health</span>
                    </div>
                    <div class="jigsaw5" id="jigsaw5">
                      <span class="t"></span>
                      <span class="r"></span>
                      <span class="b"></span>
                      <span class="l"></span>
                      <span class="text">Productivity</span>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="jigsaw2" id="jigsaw2">
                      <span class="t"></span>
                      <span class="r"></span>
                      <span class="b"></span>
                      <span class="l"></span>
                      <span class="text">Personality</span>
                    </div>
                    <div class="jigsaw4" id="jigsaw4">
                      <span class="t"></span>
                      <span class="r"></span>
                      <span class="b"></span>
                      <span class="l"></span>
                      <span class="text">Well-being</span>
                    </div>
                    <div class="jigsaw6" id="jigsaw6">
                      <span class="t"></span>
                      <span class="r"></span>
                      <span class="b"></span>
                      <span class="l"></span>
                      <span class="text">Psychological Demand</span>
                    </div>
                  </div>
                  <div class="col-4">

                  </div>
                </div>
              </div>
              <div id="survey-body" class="col-8">
                <div id="surveyElement">
                  <survey :survey='survey'></survey>
                </div>
              </div>
            </div>
            <div id="navigationButtons" class="row justify-content-md-center">
              <div class="col-4">

              </div>
              <div class="col-8">
                <div v-if="!isCompletionPage" class="panel-footer card-footer">
                  <input v-if="!survey.isFirstPage" type="button" @click="survey.prevPage()" value="Previous" class="btn sv_prev_btn float-left" >
                  <input type="button" @click="prepareClearAndExitModal()" value="Clear & Exit" class="btn sv_clear_btn float-left" >
                  <input v-if="!survey.isLastPage" type="button" @click="survey.nextPage()" value="Next" class="btn sv_next_btn float-right">
                  <input v-if="survey.isLastPage" type="button" @click="survey.completeLastPage()" value="Complete" class="btn sv_complete_btn float-right" >
                </div>
              </div>
            </div>
        </div>
        <b-modal ref="clearAndExitModal" id="clearAndExitModal" title="Confirm Clear & Exit" v-bind:title="$t('global.modal.survey.clearAndExit.title')">
            <div class="modal-body">
                <p id="jhi-delete-user-heading" v-text="$t('global.modal.survey.clearAndExit.question')">Are you sure you want to clear and exit the survey?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('global.modal.survey.clearAndExit.no')" @click="closeDialog()">No</button>
                <button type="button" class="btn btn-primary" v-text="$t('global.modal.survey.clearAndExit.yes')" @click="clearAndGoToHomePage()">Yes</button>
            </div>
        </b-modal>
        <b-modal ref="previewChartModal" id="previewChartModal" title="Preview" :no-close-on-backdrop="true" v-bind:click-to-close="false">
          <div class="modal-body">
            <dummyComponent :chartOptions="currentChart.chartOptions"></dummyComponent>
          </div>
          <div slot="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeDialogAndOpenNextPage()">Continue</button>
          </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./survey-card.component.ts">
</script>
<style lang="scss" src="./survey-card.scss" scoped>
</style>
