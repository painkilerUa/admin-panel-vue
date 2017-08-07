<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-4"></div>
            <div class="col-lg-4">
                <form>
                    <div class="form-group">
                        <label for="login-email">Login</label>
                        <input type="text" class="form-control" id="login-email" placeholder="Login" v-model="user.login">
                    </div>
                    <div class="form-group">
                        <label for="login-password">Password</label>
                        <input type="password" class="form-control" id="login-password" placeholder="Password" v-model="user.password">
                    </div>
                    <button type="submit" class="btn btn-default" @click="login(user)">Войти</button>
                </form>
            </div>
            <div class="col-lg-4"></div>
        </div>
    </div>
</template>


<script>
    import {mapActions} from 'vuex'
    export default{
        data(){
            return {
                user: {
                    login: '',
                    password: ''
                }
            }
        },
        methods: {
            ...mapActions([
                'login'
            ])
        }
    }
</script>