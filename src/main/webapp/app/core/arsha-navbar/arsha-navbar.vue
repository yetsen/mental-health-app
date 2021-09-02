<template>
  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top" :class="{'header-scrolled': !(isInHomePage() & scrollPosition < 100)}">
    <div class="container d-flex align-items-center">

      <h1 class="logo me-auto"><a href="#">Mental Health</a></h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html" class="logo me-auto"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

      <nav id="navbar" class="navbar">
        <ul>
          <li><a class="nav-link active" v-smooth-scroll href="#hero">Home</a></li>
          <li><a class="nav-link" v-smooth-scroll href="#services">About The Project</a></li>
          <li><a class="nav-link" v-smooth-scroll href="#consortium">Consortium</a></li>
          <li v-if="false" class="dropdown"><a href="#"><span>Drop Down</span> <i class="bi bi-chevron-down"></i></a>
            <ul>
              <li><a href="#">Drop Down 1</a></li>
              <li class="dropdown"><a href="#"><span>Deep Drop Down</span> <i class="bi bi-chevron-right"></i></a>
                <ul>
                  <li><a href="#">Deep Drop Down 1</a></li>
                  <li><a href="#">Deep Drop Down 2</a></li>
                  <li><a href="#">Deep Drop Down 3</a></li>
                  <li><a href="#">Deep Drop Down 4</a></li>
                  <li><a href="#">Deep Drop Down 5</a></li>
                </ul>
              </li>
              <li><a href="#">Drop Down 2</a></li>
              <li><a href="#">Drop Down 3</a></li>
              <li><a href="#">Drop Down 4</a></li>
            </ul>
          </li>
          <li><a class="nav-link" v-smooth-scroll href="#team">Contact Us</a></li>
          <li><a class="getstarted" href="#about">Login</a></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav><!-- .navbar -->

    </div>
  </header><!-- End Header -->
</template>

<script lang="ts" src="./arsha-navbar.component.ts">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" src="./arsha-navbar.scss" scoped>
</style>
