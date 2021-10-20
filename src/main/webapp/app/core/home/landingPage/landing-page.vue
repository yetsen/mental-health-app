<template>
  <!-- ======= Features Section ======= -->
  <section id="features" class="features">

    <div class="container" data-aos="fade-up">

      <header class="section-header">
        <h2>Assessment Center</h2>
      </header>
      <div class="row">
        <div class="col-lg-12 mt-5 mt-lg-0">
          <div class="row align-self-center gy-4">
            <div v-for="index in 12" :key="index" class="col-md-4" data-aos="zoom-out" data-aos-delay="200">
              <div class="feature-box d-flex align-items-center">
                <h3> <font-awesome-icon v-if="index < currentTime" icon="check" /> Month {{ index }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-bind:style="[isEmployer ? {'margin-top': '10vh'} : {'margin-top': '10vh'}]" class="row">
        <div class="col-lg-5">

        </div>
        <div class="col-lg-2">
          <input type="button" @click="onAssessmentClick()" value="Start A New Assessment" class="btn btn-primary float">
        </div>

        <div class="col-lg-5">

        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" src="./landing-page.component.ts">
</script>

<style lang="scss" src="./landing-page.scss" scoped></style>
