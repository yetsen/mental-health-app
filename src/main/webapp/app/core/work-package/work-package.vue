<template>
  <!-- ======= Features Section ======= -->
  <section id="features" class="features">

    <div class="container" data-aos="fade-up">

      <header class="section-header">
        <h2>{{ title }}</h2>
        <p>{{ subtitle }}</p>
      </header>
      <!-- Feature Tabs -->
      <div class="row feature-tabs" data-aos="fade-up">
        <div class="col-lg-6">
          <div class="tab-content">

            <div class="tab-pane fade show active" id="tab1">
              <p v-if="number != 2">{{ text }}</p>
              <p v-if="number == 2" v-for="t in objectives">{{t}}</p>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <img src="/content/images/arsha/hero-img.png" class="img-fluid" alt="">
        </div>

      </div>

    </div>
  </section>
</template>

<script lang="ts" src="./work-package.component.ts">
</script>

<style lang="scss" src="./work-package.scss" scoped></style>
