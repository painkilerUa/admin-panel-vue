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
                    <div class="input-group-addon">
                        <span class="glyphicon glyphicon-search"></span>
                    </div>
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
                        <th width="60px">Дата</th>
                        <th width="300px">Заказ</th>
                        <th class="order-full-cost-column">грн</th>
                        <th>Пр</th>
                        <th width="100px">ФИО</th>
                        <th width="110px">Телефон</th>
                        <th>Адресс</th>
                        <th width="110px">Статус</th>
                        <th>ТТН</th>
                    </tr>
                </thead>
                <tbody>
                    <tr :class="getOrderRowClass(order)" v-for="(order, index) in filteredOrders">
                        <td  @click="editOrder(order)">{{dateToString(order)}}</td>
                        <td>
                            <table>
                                <thead>
                                    <tr>
                                        <th  width="240px">Товар</th>
                                        <th width="40px">грн</th>
                                        <th width="20px">шт</th>
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
                        <td class="order-full-cost-column">{{getFullCostOrder(order)}}</td>
                        <td class="orders-prepay-column">{{getOrderPrepayBoolean(order)}}</td>
                        <td>{{getFullName(order)}}</td>
                        <td v-html="getAllPhones(order)"></td>
                        <td>{{getDeliveryAdress(order)}}</td>
                        <td>
                            <select class="form-control order-status-input" :value="order.order_status" @change="editOrderAction({method: 'changeStatusOrder', data: {order_status: $event.target.value, order_id: order.order_id}})">
                                <option :value="option.value" v-for="option in optionsOrderStatus">{{option.text}}</option>
                            </select>
                        </td>
                        <td>{{getOrderTrackNum(order)}}</td>
                    </tr>
                </tbody>

            </table>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import {getFilteredOrders} from  '../../store/getters'
    import EditOrder from './EditOrder.vue'
    export default{
        data(){
            return {
                filter: {
                    main_phone: null,
                    order_status: null,
                    surname: null
                },
            }
        },
        methods: {
            ...mapActions([
                'getOrders',
                'editOrderAction'
            ]),
            editOrder(orderData){
                this.$router.push({ path: '/orders/edit/' + orderData.order_id})
            },
            dateToString(orderData){
              let dateObj = new Date(orderData.order_date)
              return (dateObj.getDate().toString().length < 2 ? '0' + dateObj.getDate() : dateObj.getDate()) + '.' + ((+dateObj.getMonth() + 1).toString().length < 2 ? '0' + (+dateObj.getMonth() + 1) : (+dateObj.getMonth() + 1)) + '.' + dateObj.getFullYear().toString().slice(2, 4)
            },
            getFullName(orderData){
                return (orderData.customer_surname ? orderData.customer_surname: '')
                    + ' ' + (orderData.customer_name ? orderData.customer_name: '')
                    + ' ' + (orderData.customer_patronymic ? orderData.customer_patronymic: '')
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
                if(!orderData.order_prepay){
                    return 'Нет'
                }else if(orderData.order_prepay == 1){
                    return '?'
                }else{
                    return orderData.order_prepay
                }
            },
            getFullCostOrder(orderData){
                let fullCost = orderData.products.reduce((preProduct, product, i) => {
                    return preProduct + product.price*product.quantity;
                }, 0);
                return Math.round(fullCost);
            },
            getOrderRowClass(orderData){
                let className;
                switch (orderData.order_status) {
                    case 'processing':
                        className = 'danger'
                        break;
                    case 'paid':
                        className = 'danger'
                        break;
                    case 'holding':
                        className = 'danger'
                        break;
                    case 'sended':
                        className = 'danger'
                        break;
                    case 'completed':
                        className = 'info'
                        break;
                    case 'closed':
                        className = 'order-closed'
                        break;
                    case 'confirmed':
                        className = 'success'
                        break;
                }
                return className
            },
            getOrderTrackNum(orderData){
                return orderData.order_tracking_num ? orderData.order_tracking_num : ''
            }
        },
        computed:{
//            ...mapGetters([
//                'getUserSettings'
//              ]),
            filteredOrders(){
                return this.$store.getters.getFilteredOrders(this.filter)
            },
            optionsOrderStatus(){
                let isSuperUser = this.$store.getters.getUserSettings.isSuperUser;
                return this.$store.getters.getOptionsOrderStatus.filter((option) => {
                    return true;
//                    if(isSuperUser) return true;
//                    return option.value !== 'confirmed'
                })
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

<style scoped>
    .row {
        margin: 10px 0;
    }
    .order-status-input{
        padding: 3px;
        font-size: 12px;
    }
    .order-full-cost-column{
        vertical-align: middle;
    }
    .orders-prepay-column{
        vertical-align: middle;
    }
</style>
