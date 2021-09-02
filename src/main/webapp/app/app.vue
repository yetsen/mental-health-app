<template>
  <div id="app">
      <arsha-navbar></arsha-navbar>
      <hero></hero>
      <span>
        <router-view :key="$route.path"></router-view>
      </span>
      <b-modal id="login-page" hide-footer lazy>
          <span slot="modal-title" id="login-title" v-text="$t('login.title')">Sign in</span>
          <login-form></login-form>
      </b-modal>
  </div>
</template>

<script lang="ts" src="./app.component.ts">
</script>
