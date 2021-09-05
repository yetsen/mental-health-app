<template>
  <!-- ======= Services Section ======= -->
  <section id="services" class="services">

    <div class="container" data-aos="fade-up">

      <header class="section-header">
        <h2>About The Project</h2>
      </header>

      <div class="row gy-4">

        <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
          <div class="service-box blue">
            <i class="ri-discuss-line icon"></i>
            <h3>Who we are</h3>
            <p>This “Impact of COVID-19 on Staff Mental Health and Well-Being in SMEs: Strategies and Interventions to Support Workforce</p>
            <a  @click="goTo('/work-package/1')" class="read-more"><a>Read More</a> <i class="bi bi-arrow-right"></i></a>
          </div>
        </div>

        <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
          <div class="service-box orange">
            <i class="ri-discuss-line icon"></i>
            <h3>Objectives</h3>
            <p>Develop a conceptual model that will facilitate analysing the relationship between MH issues faced by SMEs’ staff, factors</p>
            <a  @click="goTo('/work-package/2')" class="read-more"><a>Read More</a> <i class="bi bi-arrow-right"></i></a>
          </div>
        </div>

        <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
          <div class="service-box green">
            <i class="ri-discuss-line icon"></i>
            <h3>Work Package 1</h3>
            <p>The conceptual model will examine  the impact of staff MH problems, well-being issues, and various factors</p>
            <a @click="goTo('/work-package/3')" class="read-more"><a>Read More</a> <i class="bi bi-arrow-right"></i></a>
          </div>
        </div>

        <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="500">
          <div class="service-box red">
            <i class="ri-discuss-line icon"></i>
            <h3>Work Package 2</h3>
            <p>The deliverables of WP1 (survey and model), guidance published by policy makers and findings from management</p>
            <a  @click="goTo('/work-package/4')" class="read-more"><a>Read More</a> <i class="bi bi-arrow-right"></i></a>
          </div>
        </div>

        <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="600">
          <div class="service-box purple">
            <i class="ri-discuss-line icon"></i>
            <h3>Work Package 3</h3>
            <p>Develop and test a user-friendly gamified application enabling SMEs’ staff to anonymously and remotely answer</p>
            <a  @click="goTo('/work-package/5')" class="read-more"><a>Read More</a> <i class="bi bi-arrow-right"></i></a>
          </div>
        </div>

        <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="700">
          <div class="service-box pink">
            <i class="ri-discuss-line icon"></i>
            <h3>Work Package 4</h3>
            <p>The primary objective is to examine the impact and effectiveness of the framework in a longitudinal study</p>
            <a @click="goTo('/work-package/6')" class="read-more"><a>Read More</a> <i class="bi bi-arrow-right"></i></a>
          </div>
        </div>

      </div>

    </div>

  </section><!-- End Services Section -->
</template>

<script lang="ts" src="./fs-about-model.component.ts">
</script>
<style lang="scss" src="./fs-about-model.scss" scoped>
</style>
