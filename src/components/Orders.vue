<template>
    <div class="container">
        <div class="row">
            <table class="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>NS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="danger">
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                    </tr>
                    <tr class="success">
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                    </tr>
                    <tr class="info">
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                    </tr>
                </tbody>

            </table>
        </div>
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