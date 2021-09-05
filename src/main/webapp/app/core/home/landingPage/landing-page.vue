<template>
  <!-- ======= Features Section ======= -->
  <section id="features" class="features">

    <div class="container" data-aos="fade-up">

      <header class="section-header">
        <h2>Assessment Center</h2>
      </header>

      <div class="row">

        <div class="col-lg-6">
          <img src="/content/images/arsha/hero-img.png" class="img-fluid" alt="">
        </div>

        <div class="col-lg-6 mt-5 mt-lg-0 d-flex">
          <div class="row align-self-center gy-4">

            <div v-for="block in blocks" class="col-md-6" data-aos="zoom-out" data-aos-delay="200">
              <div class="feature-box d-flex align-items-center">
                <h3> <font-awesome-icon v-if="true" icon="check" /> {{ block.name }}</h3>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-11"></div>
        <div class="col-lg-1">
          <input type="button" @click="onAssessmentClick()" value="Next" class="btn btn-primary float-right">
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" src="./landing-page.component.ts">
</script>

<style lang="scss" src="./landing-page.scss" scoped></style>
