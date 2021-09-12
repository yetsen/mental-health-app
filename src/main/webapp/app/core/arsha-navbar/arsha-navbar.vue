<template>
  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top" :class="{'header-scrolled': !(isInHomePage() & scrollPosition < 100)}">
    <div class="container d-flex align-items-center">

      <!-- <h1 class="logo me-auto"><a href="#">Mental Health</a></h1>-->
      <!-- Uncomment below if you prefer to use an image logo -->
      <a href="#" class="logo me-auto"><img src="/content/images/icon/favicon-32x32.png" alt="" class="img-fluid">
      </a>

      <nav id="navbar" class="navbar">
        <ul>
          <li><a @click="goTo('/')" class="nav-link" v-smooth-scroll href="#hero">Home</a></li>
          <li><a @click="goTo('/')" class="nav-link" v-smooth-scroll href="#services">About The Project</a></li>
          <li><a @click="goTo('/')" class="nav-link" v-smooth-scroll href="#consortium">Consortium</a></li>
          <li><a @click="goTo('/')" class="nav-link" v-smooth-scroll href="#team">Contact Us</a></li>
          <li v-if="authenticated"><a class="nav-link" @click="onAssessmentClick(currentTime)">Assessment Center</a></li>
          <li v-if="authenticated"><a class="nav-link" @click="goTo('/dashboard')">Dashboard</a></li>
          <li v-if="!authenticated"><a class="getstarted" v-on:click="openLogin()">Sign in</a></li>
          <li v-if="authenticated" class="dropdown"><a><span>Profile <font-awesome-icon icon="chevron-down"/></span></a>
            <ul>
              <li><a @click="goTo('/account/settings')">Settings</a></li>
              <li><a @click="goTo('/account/password')">Password</a></li>
              <li><a v-on:click="logout()" href="#">Sign out</a></li>
            </ul>
          </li>
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
