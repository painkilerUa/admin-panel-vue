<template>
    <div class="order-list">
        List
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default{
        data(){
            return {
                orders: []
            }
        },
        methods: {
            ...mapActions([
                'getOrders'
            ])
        },
        created(){
            this.getOrders({
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
            })
        }
    }
</script>

<style>

</style>