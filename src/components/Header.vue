<template>
    <div class="navbar navbar-default container">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand">MKPP</a>
            </div>
            <div class="collapse navbar-collapse" id="bs-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <router-link :to="'/orders'" tag="li" active-class="active"><a>Заказы</a></router-link>
                    <router-link :to="'/customers'" tag="li" active-class="active"><a>Клиенты</a></router-link>
                    <router-link :to="'/products'" tag="li" active-class="active"><a>Товары</a></router-link>
                    <router-link :to="'/prices'" tag="li" active-class="active"><a>Прайсы</a></router-link>
                    <li v-if="!getUserSettings.authorized" @click="$router.push('/login')"><a>Войти</a></li>
                    <li v-if="getUserSettings.authorized" @click="logout"><a>Выйти</a></li>
                    <!--<li class="dropdown">-->
                        <!--<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">List3 <span class="caret"></span></a>-->
                        <!--<ul class="dropdown-menu">-->
                            <!--<li><a href="#">Action</a></li>-->
                            <!--<li><a href="#">Another action</a></li>-->
                            <!--<li><a href="#">Something else here</a></li>-->
                            <!--<li role="separator" class="divider"></li>-->
                            <!--<li><a href="#">Separated link</a></li>-->
                            <!--<li role="separator" class="divider"></li>-->
                            <!--<li><a href="#">One more separated link</a></li>-->
                        <!--</ul>-->
                    <!--</li>-->
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    export default {
        data(){
            return {

            }
        },
        methods: {
            ...mapActions([
                'logout'
            ])
        },
        computed: {
            ...mapGetters([
                'getUserSettings'
            ])
        }
    }
</script>
<style>

</style>

