<template>
    <div id="app">
        <app-header></app-header>
        <div class="container">
            <div class="alert" :class="getMsg.className" role="alert" v-show="getMsg.text">
                <p>{{getMsg.text}}</p>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import AppHeader from  './components/Header.vue'
    import {mapGetters, mapActions} from 'vuex'
export default {
    name: 'app',
    components: {
        AppHeader
    },
    computed: {
        ...mapGetters([
            'getMsg'
        ])
    }
}
</script>

<style>
  @import '../node_modules/bootstrap/dist/css/bootstrap.css'
</style>
