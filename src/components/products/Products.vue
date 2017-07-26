<template>
    <div class="container">
        <div class="row">
            <button type="button" class="btn btn-primary btn-md active pull-right" @click="$router.push({ path: 'products/new' })">Новый Товар</button>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Название" v-model="filter.name">
                    <div class="input-group-addon">
                        <span class="glyphicon glyphicon-search"></span>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Артикул" v-model="filter.vendor">
                    <div class="input-group-addon">
                        <span class="glyphicon glyphicon-search"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <table class="table">
                <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Цена</th>
                        <th>Артикул</th>
                        <th>Цена закупки</th>
                        <th>Кол-во</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in filteredProducts">
                        <td @click="editProduct(product)">{{product.name}}</td>
                        <td>{{product.price}}</td>
                        <td>{{product.vendor}}</td>
                        <td>{{product.purchase_price}}</td>
                        <td>{{product.quantity}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    export default{
        data(){
            return {
                filter: {
                    name: null,
                    vendor: null
                }
//                productPartNum: 1
            }
        },
        methods: {
            ...mapActions([]),
            editProduct(productData){
                this.$router.push({ path: '/products/edit/' + productData.id})
            }
        },
        computed:{
//            ...mapGetters([
//                'getUserSettings'
//              ]),
            filteredProducts(){
                return this.$store.getters.getFilteredProducts(this.filter).splice(0, 30)
            }
        },
        created(){

        }
    }
</script>

<style>

</style>
