<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
    import AppHeader from  './components/Header.vue'
export default {
  name: 'app',
  components: {
      AppHeader
  }
}
</script>

<style>
  @import '../node_modules/bootstrap/dist/css/bootstrap.css'
</style>
