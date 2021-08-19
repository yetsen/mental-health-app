<template>
  <header>
    <div class="row-navbar" style="background-color: #FFFFFF;">
      <div class="large-12 columns nav-wrap nav_layout_2">
        <div v-if="!authenticated" class="row-navbar align-middle clearfix">
          <div class="small-9 logo-wrap columns clearfix">
            <a href="/"><img src="/content/images/cosie/cosie_name_rgb.jpg" class="logo-image" alt="Etusivulle" /></a>
          </div>
          <div class="small-3 columns nav-toggle clearfix">
            <button id=nav-toggle-btn aria-expanded=false> <font-awesome-icon icon="bars" /></button>
          </div>
        </div>
        <nav class="menu-items-wrap">
          <ul class="menu-depth-1">
            <li v-bind:class="{'current-menu-item': currentRoute == 'Home'}" class="menu-item menu-item-1" id="menu_item_1">
              <a href="/">Home</a>
            </li>
            <li v-bind:class="{'current-menu-item': currentRoute == 'AboutProject'}" class="menu-item menu-item-17" id="menu_item_17">
              <a href="/about-project">About The Project</a>
            </li>
            <li v-bind:class="{'current-menu-item': currentRoute == 'SurveyCard'}"  v-if="currentTime === 1 && authenticated" @click="onAssessmentClick(currentTime)" class="menu-item menu-item-75" id="menu_item_75">
              <a href="#">Assessment Center</a>
            </li>
            <li v-bind:class="{'current-menu-item': currentRoute == 'SurveyCard'}" class="menu-item menu-item-120" id="menu_item_120" v-if="currentTime > 1 && authenticated">
              <a>Assessment Center</a>
              <ul>
                <li v-for="si in surveyInformation" v-bind:key="si.times" @click="onAssessmentClick(si.times)">
                  <a>Assessment #{{si.times}}</a>
                  <font-awesome-icon style="color: white" v-if="si.finished" icon="check" />
                  <font-awesome-icon v-if="!si.finished" icon="check" />
                </li>
                <li v-if="isLastSurveyFinished" v-bind:key="currentTime" @click="onAssessmentClick(currentTime)">
                  <a>Start New Assessment</a>
                </li>
              </ul>
            </li>
            <li v-bind:class="{'current-menu-item': currentRoute == 'Consortium'}"  class="menu-item menu-item-2416" id="menu_item_2416">
              <a href="/consortium">Consortium</a>
            </li>
            <li v-bind:class="{'current-menu-item': currentRoute == 'Dashboard'}"  v-if="authenticated" class="menu-item menu-item-241" id="menu_item_241">
              <a>Dashboard</a>
              <ul>
                <li v-for="si in surveyInformation" v-if="si.finished && !isEmployer" v-bind:key="si.times" v-bind:to="'/dashboard/' + si.times" >
                  <a v-bind:href="'/dashboard/' + si.times">Dashboard #{{si.times}}</a>
                </li>
                <li v-for="ctl in companyAvailableTimeList" v-if="isEmployer" v-bind:key="ctl" v-bind:to="'/dashboard/' + ctl">
                  <a v-bind:href="'/dashboard/' + ctl">Dashboard #{{ctl}}</a>
                </li>
              </ul>
            </li>
            <li v-bind:class="{'current-menu-item': currentRoute == 'Contact'}"  class="menu-item menu-item-143" id="menu_item_143">
              <a href="/contact-us">Contact us</a>
            </li>
            <li class="menu-item menu-item-140" id="menu_item_140">
              <a >Profile</a>
              <ul>
                <li v-if="!authenticated">
                  <a v-on:click="openLogin()">Sign in</a>
                </li>
                <li v-if="!authenticated">
                  <a href="/register">Register</a>
                </li>
                <li v-if="authenticated">
                  <a href="/account/settings">Settings</a>
                </li>
                <li v-if="authenticated">
                  <a href="/account/password">Password</a>
                </li>
                <li v-if="authenticated">
                  <a v-on:click="logout()" href="#">Sign out</a>
                </li>
              </ul>
            </li>
          </ul>
          <div class="some-buttons-wrap show-for-small-only">
            <div class="some-buttons-list"></div>
          </div>
        </nav>
        <div class="some-buttons-wrap show-for-medium">
          <div class="some-buttons-list"></div>
        </div>
      </div>
    </div>
  </header>
</template>
<script lang="ts" src="./cosie-navbar.component.ts">
</script>
<style lang="scss" src="./cosie-navbar.scss" scoped>
</style>
