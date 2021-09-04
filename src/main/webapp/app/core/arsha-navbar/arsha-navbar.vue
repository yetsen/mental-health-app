<template>
  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top" :class="{'header-scrolled': !(isInHomePage() & scrollPosition < 100)}">
    <div class="container d-flex align-items-center">

      <!-- <h1 class="logo me-auto"><a href="#">Mental Health</a></h1>-->
      <!-- Uncomment below if you prefer to use an image logo -->
      <a href="#" class="logo me-auto"><img src="/content/images/icon/favicon-32x32.png" alt="" class="img-fluid"> MH&WB</a>

      <nav id="navbar" class="navbar">
        <ul>
          <li><a class="nav-link" v-smooth-scroll href="#hero">Home</a></li>
          <li><a class="nav-link" v-smooth-scroll href="#services">About The Project</a></li>
          <li><a class="nav-link" v-smooth-scroll href="#consortium">Consortium</a></li>
          <li><a class="nav-link" v-smooth-scroll href="#team">Contact Us</a></li>
          <li v-if="currentTime === 1 && authenticated"><a class="nav-link" @click="onAssessmentClick(currentTime)">Assessment Center</a></li>
          <li v-if="currentTime > 1 && authenticated" class="dropdown"><a><span>Assessment Center <font-awesome-icon icon="chevron-down"/></span> </a>
            <ul>
              <li v-for="si in surveyInformation" v-bind:key="si.times" @click="onAssessmentClick(si.times)">
                <a>Assessment #{{si.times}} <font-awesome-icon v-if="si.finished" icon="check" /></a>
              </li>
            </ul>
          </li>
          <li v-if="authenticated" class="dropdown"><a><span>Dashboard <font-awesome-icon icon="chevron-down"/></span></a>
            <ul>
              <li v-for="si in surveyInformation" v-if="si.finished && !isEmployer" v-bind:key="si.times" v-bind:to="'/dashboard/' + si.times">
                <a @click="goTo('/dashboard/' + si.times)">Dashboard #{{si.times}} </a>
              </li>
              <li v-for="ctl in companyAvailableTimeList" v-if="isEmployer" v-bind:key="ctl" v-bind:to="'/dashboard/' + ctl">
                <a @click="goTo('/dashboard/' + ctl)">Dashboard #{{ctl}} </a>
              </li>
            </ul>
          </li>
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
