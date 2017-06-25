<template>
    <div class="container">
        <div class="row">
            <button type="button" class="btn btn-primary btn-md active pull-right" @click="$router.push({ path: 'orders/new' })">Новый заказ</button>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="input-group">
                    <input type="text" class="form-control" id="exampleInputAmount" placeholder="Name">
                    <div class="input-group-addon">
                        <span class="glyphicon glyphicon-search"></span>
                    </div>
                </div>
            </div>
            <div class="col-md-4"></div>
            <div class="col-md-4"></div>
        </div>
        <div class="row">
            <table class="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>NS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="danger" @click="editOrder(1)">
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
            ]),
            editOrder(x){
                console.log(x)
            }
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
