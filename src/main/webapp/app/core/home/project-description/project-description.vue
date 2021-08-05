<template>
    <header id="projectDescription" class="project-description">
      <div v-if="!authenticated" class="h-100 d-flex justify-content-center">
        <div id="button-content" class="align-self-end">
          <button class="btn btn-danger" v-text="$t('login.title')" v-on:click="openLogin()">Login</button>
          <button class="btn btn-secondary" v-text="$t('register.form.button')" @click="$router.push('register')">Register</button>
        </div>
      </div>
    </header>
</template>

<script lang="ts" src="./project-description.component.ts">
</script>
<style lang="scss" src="./project-description.scss" scoped>
</style>
