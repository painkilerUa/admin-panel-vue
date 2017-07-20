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
                        <th>Заказ</th>
                        <th>Сумма</th>
                        <th>Предоплата</th>
                        <th>ФИО</th>
                        <th>Телефон</th>
                        <th>Адресс</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="danger" @click="editOrder(1)" v-for="(order, index) in filteredOrders">
                        <td>{{dateToString(order)}}</td>
                        <td>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Товар</th>
                                        <th>Цена</th>
                                        <th>Кол-во</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="product in order.products">
                                        <td>{{product.name}}</td>
                                        <td>{{product.price}}</td>
                                        <td>{{product.quantity}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>{{getFullCostOrder(order)}}</td>
                        <td>{{getOrderPrepayBoolean(order)}}</td>
                        <td>{{getFullName(order)}}</td>
                        <td v-html="getAllPhones(order)"></td>
                        <td>{{getDeliveryAdress(order)}}</td>
                        <td>{{getOrderStatus(order)}}</td>
                    </tr>
                    //success  info
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
            dateToString(orderData){
              let dateObj = new Date(orderData.order_date)
              return dateObj.getDate() + '.' + (+dateObj.getMonth() + 1) + '.' + dateObj.getFullYear()
            },
            getFullName(orderData){
                return (orderData.customer_surname ? orderData.customer_surname: '')
                    + ' ' + (orderData.customer_name ? orderData.customer_name: '')
                    + ' ' + (' ' + orderData.customer_patronymic ? orderData.customer_patronymic: '')
            },
            getAllPhones(orderData){
                return orderData.customer_main_phone
                + (orderData.customer_add_phone ? '</br>' + orderData.customer_add_phone : '')
                + (orderData.customer_add_1_phone ? '</br>' + orderData.customer_add_1_phone : '')
            },
            getDeliveryAdress(orderData){
                if(orderData.order_del_name){
                    let deliverName;
                    switch (orderData.order_del_name) {
                        case 'new_post':
                            deliverName = 'Н.П.'
                            break;
                        case 'intime':
                            deliverName = 'Инт'
                            break;
                        case 'delivery':
                            deliverName = 'Дел'
                            break;
                    }
                    return deliverName + ' г. ' + orderData.order_del_city + ' №' + orderData.order_del_depart_num
                }else{
                    return 'г. ' + orderData.order_del_city + orderData.order_del_address
                }
            },
            getOrderStatus(orderData){
                let status;
                switch (orderData.order_status) {
                    case 'processing':
                        status = 'В обработке'
                        break;
                    case 'paid':
                        status = 'Оплачен'
                        break;
                    case 'holding':
                        status = 'Удержан'
                        break;
                    case 'sended':
                        status = 'Отправлен'
                        break;
                    case 'completed':
                        status = 'Выполнен'
                        break;
                    case 'closed':
                        status = 'Закрыт'
                        break;
                    case 'confirmed':
                        status = 'Подтвержден'
                        break;
                }
                return status
            },
            getOrderPrepayBoolean(orderData){
                return orderData.order_prepay === 'true' ? 'Да' : 'Нет'
            },
            getFullCostOrder(orderData){
                return orderData.products.reduce((preProduct, product, i) => {
                    if(i === 1){
                        return preProduct.price + product.price
                    }else{
                        return preProduct + product.price
                    }
                })
            }
        },
        computed:{
//            ...mapGetters([
//                'getFilteredOrders'
//              ]),
            filteredOrders(){
                return this.$store.getters.getFilteredOrders(this.filter)
            },

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
