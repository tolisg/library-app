<template>
  <div id="app">
    <nav-bar />
    <div class="main-section">
      <router-view />
    </div>
  </div>
</template>

<script>
import navBar from '@/components/navBar.vue';
import 'awesome-notifications/dist/style.css';
// import 'bootstrap';

export default {
  name: 'App',
  components: {
    navBar
  }
};
</script>

<style lang="scss">
@import '@/assets/styles/index.scss';
</style>
