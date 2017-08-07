<template>
    <div>
        <app-main-menu></app-main-menu>
        <!--<p>{{isAuthorized}}</p>-->
        <!--<button @click="logout">Logout</button>-->
    </div>

</template>
<script>
    import MainMenu from  './mainMenu.vue'
    import {mapGetters} from 'vuex'
    import {mapMutations} from 'vuex'
    import {mapActions} from 'vuex'
    export default{
        data(){
            return {
            }
        },
        components: {
            appMainMenu: MainMenu
        },
        methods: {
            ...mapActions([
                'logout'
            ])
        },
        created(){
            if(!this.$store.state.user.authorized){
                this.$router.push({ path: '/login' })
            }
        },
        computed: {
            ...mapGetters([
                'isAuthorized'
            ])
//            greeting(){
//                return 'hello'
//            }
        }
    }
</script>