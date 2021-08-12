<template>
  <header>
    <div class="row" style="background-color: #FFFFFF;">
      <div class="large-12 columns nav-wrap nav_layout_2">
        <div class="row align-middle clearfix">
          <div class="small-9 logo-wrap columns clearfix">
            <a href="/"><img src="https://storage.googleapis.com/turku-amk/2018/01/cosie_name_rgb.jpg" class="logo-image" alt="Etusivulle" /></a>
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
            <li v-bind:class="{'current-menu-item': currentRoute == 'SurveyCard'}"  v-if="currentTime === 1 && isInHomePage() && authenticated" @click="onAssessmentClick(currentTime)" class="menu-item menu-item-75" id="menu_item_75">
              <a href="#">Assessment Center</a>
            </li>
            <li v-bind:class="{'current-menu-item': currentRoute == 'Consortium'}"  class="menu-item menu-item-2416" id="menu_item_2416">
              <a href="/consortium">Consortium</a>
            </li>
            <li v-bind:class="{'current-menu-item': currentRoute == 'Dashboard'}"  v-if="authenticated" class="menu-item menu-item-241" id="menu_item_241">
              <a href="/dashboard">Dashboard</a>
            </li>
            <li v-bind:class="{'current-menu-item': currentRoute == 'Contact'}"  class="menu-item menu-item-143" id="menu_item_143">
              <a href="/contact-us">Contact us</a>
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
