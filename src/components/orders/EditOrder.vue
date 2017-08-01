<template>
    <div class="container">
        <div class="row">
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
        <div class="row" v-for="product in filteredProducts">
          <div class="col-md-1"></div>
          <div class="col-md-3">
            {{product.name}}
          </div>
          <div class="col-md-7">
          </div>
          <div class="col-md-1">
            <span class="glyphicon glyphicon-ok-sign" @click="addChosenProduct({id: product.id, quantity: 1, price: product.price, purchase_price: product.purchase_price, name: product.name})"></span>
          </div>
        </div>
        <div class="row" v-for="product in order.products">
            <div class="col-md-4">
              {{product.name}}
            </div>
            <div class="col-md-4">
            </div>
            <div class="col-md-1">
                <input type="text" v-model.number="product.price">
            </div>
            <div class="col-md-1">
              <input type="text" v-model.number="product.purchase_price">
            </div>
            <div class="col-md-1">
              <input type="text" v-model.number="product.quantity">
            </div>
            <div class="col-md-1">
                <!--<span class="glyphicon glyphicon-remove-sign" aria-hidden="true" @click="removeSelectedProduct(product.id)"></span>-->
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <span>
                    {{order.customer_surname + ' ' + order.customer_name + ' ' + order.customer_patronymic}}
                </span>
            </div>
          <div class="col-md-1">
            <span>{{order.customer_main_phone}}</span>
            <span>{{order.customer_add_phone}}</span>
            <span>{{order.customer_add_1_phone}}</span>
          </div>
          <div class="col-md-7">
          </div>
        </div>
        <div class="row">
            <div class="col-lg-2">
                <div class="input-group">
                    <label for="order-del-city">Предоплата</label>
                    <input type="text" class="form-control" id="order-prepay" placeholder="" value="0" v-model="order.order_prepay">
                </div>
            </div>
            <div class="col-md-3">
                <div class="input-group">
                    <label for="order-del-city">Город</label>
                    <input type="text" class="form-control" id="order-del-city" v-model="order.order_del_city">
                </div>
            </div>
            <div class="col-lg-2">
                <label for="order-del-name">Перевозчик</label>
                <select class="form-control" id="order-del-name" v-model="order.order_del_name">
                    <option value="" default>Отсутствует</option>
                    <option value="new_post">Новая Почта</option>
                    <option value="intime">Интайм</option>
                    <option value="delivery">Деливери</option>
                </select>
            </div>
            <div class="col-md-1">
                <div class="input-group">
                    <label for="order-del-depart-num">Номер отделения</label>
                    <input type="text" class="form-control" id="order-del-depart-num" placeholder="" v-model.number="order.order_del_depart_num">
                </div>
            </div>
            <div class="col-md-3">
                <div class="input-group">
                    <label for="order-del-address">Адресс</label>
                    <input type="text" class="form-control" id="order-del-address" placeholder="" v-model="order.order_del_address">
                </div>
            </div>
            <div class="col-lg-1">
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
        </div>
        <div class="row">
            <div class="col-lg-2">
                <label for="order-racking-num">TTH</label>
                <input type="text" class="form-control" id="order-racking-num" placeholder="" v-model="order.order_tracking_num">
            </div>
            <div class="col-lg-10">
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
            'editOrderAction'
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
        }
    },
    created(){
        let editingOrder = this.$store.getters.getOrderById(this.$route.params.order_id);
        this.order = Object.assign(editingOrder);
    },
    computed: {
      ...mapGetters([
      ])
    }
  }
</script>

<style>

</style>
