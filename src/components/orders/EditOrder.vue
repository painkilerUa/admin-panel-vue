<template>
    <div class="container">
        <div class="row filter-group-orders">
            <div class="col-md-4">
                <div class="input-group">
                    <span class="input-group-addon" id="full-name-input">Наименование</span>
                    <input type="text" class="form-control" id="basic-url" aria-describedby="full-name-input" @input="filterProducts($event, 'name')">
                </div>
            </div>
            <div class="col-md-4">
                <div class="input-group">
                    <span class="input-group-addon" id="phone-input">Артикул</span>
                    <input type="text" class="form-control" id="basic-url" aria-describedby="phone-input" @input="filterProducts($event, 'vendor')">
                </div>
            </div>
            <div class="col-md-4"></div>
        </div>
        <div class="wrapper-products">
            <div class="row" v-if="filteredProducts.length">
                <div class="col-md-6">
                    Наименование
                </div>
                <div class="col-md-2">
                    Артикул
                </div>
                <div class="col-md-2">
                    Цена
                </div>
                <div class="col-md-2">
                </div>
            </div>
            <div class="row" v-for="product in filteredProducts">
                <div class="col-md-6">
                    {{product.name}}
                </div>
                <div class="col-md-2">
                    {{product.vendor}}
                </div>
                <div class="col-md-2">
                    {{product.price}}
                </div>
                <div class="col-md-2">
                    <span class="glyphicon glyphicon-ok-sign glyphicon-add-item" @click="addChosenProduct({id: product.id, quantity: 1, price: product.price, purchase_price: product.purchase_price, name: product.name})"></span>
                </div>
            </div>
        </div>
        <div class="wrapper-editing-order">
            <div class="wrapper-ordered-products">
                <div class="row">
                    <div class="col-md-1"></div>
                    <div class="col-md-5">
                        Наименование
                    </div>
                    <div class="col-md-2">
                        <!--{{product.vendor}}-->
                    </div>
                    <div class="col-md-1">
                        Продажа
                    </div>
                    <div class="col-md-1">
                        Закупка
                    </div>
                    <div class="col-md-1">
                        Кол-во
                    </div>
                    <div class="col-md-1">
                    </div>
                </div>
                <div class="row" v-for="product in order.products">
                    <div class="col-md-1"></div>
                    <div class="col-md-5">
                        {{product.name}}
                    </div>
                    <div class="col-md-2">
                        <!--{{product.vendor}}-->
                    </div>
                    <div class="col-md-1">
                        <input type="text" class="form-control" v-model.number="product.price">
                    </div>
                    <div class="col-md-1">
                        <input type="text" class="form-control" v-model.number="product.purchase_price">
                    </div>
                    <div class="col-md-1">
                        <input type="text" class="form-control" v-model.number="product.quantity">
                    </div>
                    <div class="col-md-1">
                        <!--<span class="glyphicon glyphicon-remove-sign" aria-hidden="true" @click="removeSelectedProduct(product.id)"></span>-->
                    </div>
                </div>
            </div>
            <div class="wrapper-order-customer">
                <div class="row">
                    <div class="col-md-4">
                        {{getFullName(order)}}
                    </div>
                    <div class="col-md-1">
                        {{getAllPhones(order)}}
                    </div>
                    <div class="col-md-7">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <label for="order-del-city">Город</label>
                    <input type="text" class="form-control" id="order-del-city" v-model="order.order_del_city">
                </div>
                <div class="col-md-2">
                    <label for="order-del-name">Перевозчик</label>
                    <select class="form-control" id="order-del-name" v-model="order.order_del_name">
                        <option value="" default>Отсутствует</option>
                        <option value="new_post">Новая Почта</option>
                        <option value="intime">Интайм</option>
                        <option value="delivery">Деливери</option>
                    </select>
                </div>
                <div class="col-md-1">
                    <label for="order-del-depart-num">№ отдел.</label>
                    <input type="text" class="form-control" id="order-del-depart-num" placeholder="" v-model.number="order.order_del_depart_num">
                </div>
                <div class="col-md-6">
                    <label for="order-del-address">Адресс</label>
                    <input type="text" class="form-control" id="order-del-address" placeholder="" v-model="order.order_del_address">
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <label for="order-del-city">Предоплата</label>
                    <input type="text" class="form-control" id="order-prepay" placeholder="" value="0" v-model="order.order_prepay">
                </div>
                <div class="col-md-2">
                    <label for="order-status">Статус заказа</label>
                    <select class="form-control" id="order-status" v-model="order.order_status">
                        <option value="pending" selected>В ожидании</option>
                        <option value="processing">В обработке</option>
                        <option value="paid">Оплачен</option>
                        <option value="holding">Удержан</option>
                        <option value="sended">Отправлен</option>
                        <option value="completed">Выполнен</option>
                        <option value="closed">Закрыт</option>
                        <option value="confirmed">Подтвержден</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="order-racking-num">TTH</label>
                    <input type="text" class="form-control" id="order-racking-num" placeholder="" v-model="order.order_tracking_num">
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <label for="order_comment">Комментарий</label>
                    <textarea type="text" class="form-control" id="order_comment" v-model="order.order_comment"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <button type="button" class="btn btn-default" @click="editOrderAction({method: 'fullEditing', data: order})">Редактировать</button>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  export default{
    data(){
      return {
          order: {},
          filteredProducts: []
      }
    },
    components: {
    },
    methods: {
        ...mapActions([
            'editOrderAction',
            'getCustomers',
            'getProducts'
        ]),
        filterProducts($event, filterBy){
            this.filteredProducts = [];
            let products = this.$store.getters.getProducts;
            for(let product of products){
                if(this.filteredProducts.length > 5){
                    break;
                }else{
                    if($event.target.value !== '' && product[filterBy].toLowerCase().indexOf($event.target.value.toLowerCase()) > -1){
                      this.filteredProducts.push(product)
                    }
                }
            }
        },
        addChosenProduct(payload){
            let products = this.order.products;
            for(let product of products){
                if(payload.id === product.id){
                    product['quantity']++
                    return
                }
            }
            products.push(payload)
        },
        removeSelectedProduct(id){
            let products = this.order.products;
            for(let i in products){
                if(id === products[i].id){
                  products.splice(i, 1)
                  break;
                }
            }
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
        }
    },
    created(){
        let editingOrder = this.$store.getters.getOrderById(this.$route.params.order_id);
        this.order = Object.assign(editingOrder);
        this.getCustomers();
        this.getProducts();
    },
    computed: {
      ...mapGetters([
      ])
    }
  }
</script>

<style scoped>
    .glyphicon-add-item{
        font-size: 20px;
        line-height: 16px;
        cursor: pointer;
        color: #05ff24;
    }
    .filter-group-orders{
        border-bottom: 1px solid #ccc;
        padding-bottom: 30px;
    }
    .row {
        margin: 10px 0;
    }
    .wrapper-editing-order{
        padding: 20px 0;
        border: 1px solid #ccc;
        border-radius: 10px;
        margin-top: 30px;
    }
    .wrapper-ordered-products{
        padding: 0 0 10px 0;
        border-bottom: 1px solid #ccc;
    }
    .wrapper-order-customer{
        padding: 0 0 10px 0;
        border-bottom: 1px solid #ccc;
    }
</style>
