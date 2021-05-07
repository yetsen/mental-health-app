<template>
  <div id="app">
      <jhi-navbar></jhi-navbar>
      <span>
        <router-view></router-view>
      </span>
      <b-modal id="login-page" hide-footer lazy>
          <span slot="modal-title" id="login-title" v-text="$t('login.title')">Sign in</span>
          <login-form></login-form>
      </b-modal>
      <jhi-footer></jhi-footer>
  </div>
</template>

<script lang="ts" src="./app.component.ts">
</script>
