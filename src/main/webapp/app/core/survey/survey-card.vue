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
                <div style="padding: 1rem" class="row align-content-center">
                  <div class="col-md-4">
                    <div v-if="!isEmployer()" class="count-box">
                      <font-awesome-icon :icon="['fa', 'layer-group']" />
                      <div>
                        <p>Level</p>
                        <ICountUp
                            :endVal="300"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div v-if="!isEmployer()" class="count-box">
                      <font-awesome-icon :icon="['fa', 'tasks']" />
                      <div>
                        <p>Task</p>
                        <ICountUp
                            :endVal="300"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div v-if="!isEmployer()" class="count-box">
                      <font-awesome-icon :icon="['fa', 'medal']" />
                      <div>
                        <p>Point</p>
                        <ICountUp
                            :endVal="300"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <nav class="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper" role="navigation">
                  <ul class="nav sidebar-nav">
                    <li v-for="(block, index) in blocks" v-bind:key="block.name" v-bind:class="{ focusedOn: index === survey.currentPageNo }" >
                      <!--<a @click="survey.currentPageNo = index">{{ name }}</a> -->
                      <a>{{ block.name }}</a>
                    </li>
                  </ul>
                </nav>
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
