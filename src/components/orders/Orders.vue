<template>
    <div class="container">
        <div class="row">
            <button type="button" class="btn btn-primary btn-md active pull-right" @click="$router.push({ path: 'orders/new' })">Новый заказ</button>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Name" v-model="filter.surname">
                    <div class="input-group-addon">
                        <span class="glyphicon glyphicon-search"></span>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Основной телефон" v-model="filter.main_phone">
                </div>
            </div>
            <div class="col-md-4">
                <select class="form-control"  v-model="filter.order_status">
                    <option value="" >Любой</option>
                    <option value="pending">В ожидании</option>
                    <option value="processing">В обработке</option>
                    <option value="paid">Оплачен</option>
                    <option value="holding">Удержан</option>
                    <option value="sended">Отправлен</option>
                    <option value="completed">Выполнен</option>
                    <option value="closed">Закрыт</option>
                    <option value="confirmed">Подтвержден</option>
                </select>
            </div>
        </div>
        <div class="row">
            <table class="table">
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>ФИО</th>
                        <th>Телефон</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="danger" @click="editOrder(1)" v-for="(order, index) in filteredOrders">
                        <td>{{dateToString(order.order_date)}}</td>
                        <td>{{order.customer_surname + ' ' + order.customer_name + ' ' + order.customer_patronymic}}</td>
                        <td>{{order.customer_main_phone}}</br>{{order.customer_add_phone}}</br>{{order.customer_add_1_phone}}</td>
                        <td>{{order.order_del_name}} {{order.order_del_depart_num}} г. {{order.order_del_city}}</td>
                    </tr>
                    <tr class="success">
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                    </tr>
                    <tr class="info">
                        <td>Column content</td>
                        <td>Column content</td>
                        <td></td>
                    </tr>
                </tbody>

            </table>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import {getFilteredOrders} from  '../../store/getters'
    export default{
        data(){
            return {
                filter: {
                    main_phone: null,
                    order_status: null,
                    surname: null
                }
            }
        },
        methods: {
            ...mapActions([
                'getOrders'
            ]),
            editOrder(x){
                console.log(x)
            },
            dateToString(date){
              let dateObj = new Date(date)
              return dateObj.getDate() + '.' + (+dateObj.getMonth() + 1) + '.' + dateObj.getFullYear()
            }
        },
        computed:{
//            ...mapGetters([
//                'getFilteredOrders'
//              ]),
            filteredOrders(){
                return this.$store.getters.getFilteredOrders(this.filter)
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
