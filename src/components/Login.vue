<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-4"></div>
            <div class="col-lg-4">
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Login</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" v-model="user.login">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="user.password">
                    </div>
                    <button type="submit" class="btn btn-default" @click="login(user)">Submit</button>
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