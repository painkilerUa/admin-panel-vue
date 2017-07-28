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
                <span class="glyphicon glyphicon-ok-sign" @click="addChosenProduct({id: product.id, quantity: 1, price: product.price, purchase_price: product.purchase_price})"></span>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="input-group">
                    <span class="input-group-addon" id="full-name-input">Фамилия</span>
                    <input type="text" class="form-control" id="basic-url" aria-describedby="full-name-input" @input="filterCustomers($event, 'customer_surname')">
                </div>
            </div>
            <div class="col-md-4">
                <div class="input-group">
                    <span class="input-group-addon" id="phone-input">Телефон</span>
                    <input type="text" class="form-control" id="basic-url" aria-describedby="phone-input" @change="filterCustomers($event, 'customer_main_phone')">
                </div>
            </div>
            <div class="col-md-4"></div>
        </div>
        <div class="row" v-for="customer in filteredCustomers">
            <div class="col-md-1"></div>
            <div class="col-md-7">
                {{customer.customer_surname}}
            </div>
            <div class="col-md-1">
                <span class="glyphicon glyphicon-ok-sign" @click="addChosenCustomer(customer.id)"></span>
            </div>
        </div>
        <div class="row">
            <button type="button" class="btn btn-primary btn-md active pull-right" @click="isNewProductFormShowed=!isNewProductFormShowed">Создать товар</button>
        </div>
        <app-new-product-form v-if="isNewProductFormShowed"></app-new-product-form>
        <div class="row">
            <button type="button" class="btn btn-primary btn-md active pull-right" @click="isNewCustomerFormShowed=!isNewCustomerFormShowed">Создать получателя</button>
        </div>
        <app-new-customer-form v-if="isNewCustomerFormShowed"></app-new-customer-form>
        <div class="row" v-for="product in getSelectedProductsDetail">
            <div class="col-md-8">
                <span>{{product.name}}</span>
            </div>
            <div class="col-md-1">
                <span>{{product.vendor}}</span>
            </div>
            <div class="col-md-1">
                <span>{{product.quantity}} шт</span>
            </div>
            <div class="col-md-1">
                <span>{{product.price}} грн</span>
            </div>
            <div class="col-md-1">
                <span class="glyphicon glyphicon-remove-sign" aria-hidden="true" @click="removeSelectedProduct(product.id)"></span>
            </div>
        </div>
        <div class="row" v-if="getSelectedCustomerDetail">
            <div class="col-md-4">
                <span>
                    {{getSelectedCustomerDetail.customer_surname + ' ' + getSelectedCustomerDetail.customer_name + ' ' + getSelectedCustomerDetail.customer_patronymic}}
                </span>
            </div>
            <div class="col-md-1">
                <span>{{getSelectedCustomerDetail.customer_main_phone}}</span>
                <span>{{getSelectedCustomerDetail.customer_add_phone}}</span>
                <span>{{getSelectedCustomerDetail.customer_add_1_phone}}</span>
            </div>
            <div class="col-md-1">
                <span>{{getSelectedCustomerDetail.customer_email}}</span>
            </div>
            <div class="col-md-1">
                <span>
                    {{getSelectedCustomerDetail.customer_city}}
                </span>
            </div>
            <div class="col-md-1">
                <span>
                    {{getSelectedCustomerDetail.customer_del_name}}
                </span>
            </div>
            <div class="col-md-1">
                <span>
                    {{getSelectedCustomerDetail.customer_del_depart_num}}
                </span>
            </div>
            <div class="col-md-2">
                <span>
                    {{getSelectedCustomerDetail.customer_local_address}}
                </span>
            </div>
            <div class="col-md-1">
                <span class="glyphicon glyphicon-remove-sign" aria-hidden="true" @click="removeSelectedCustomer"></span>
            </div>
        </div>
        <div class="row" v-if="getSelectedCustomerDetail">
            <div class="col-md-1"></div>
            <div class="col-md-10">
                <span>
                    {{getSelectedCustomerDetail.customer_comment}}
                </span>
            </div>
            <div class="col-md-1"></div>
        </div>
        <div class="row">
            <div class="col-lg-2">
                <label for="order-prepay">Статус предоплаты</label>
                <select class="form-control" id="order-prepay" @change="setValueNewOrder({'order_prepay' : $event})">
                    <option value="false" selected>Отсутствует</option>
                    <option value="pending">Присутствует</option>
                    <option value="waiting">Присутствует(отправлено СМС)</option>
                    <option value="true">Оплачено</option>
                </select>
            </div>
            <div class="col-md-3">
                <div class="input-group">
                    <label for="order-del-city">Город</label>
                    <input type="text" class="form-control" id="order-del-city" placeholder="" @change="setValueNewOrder({'order_del_city' : $event})">
                </div>
            </div>
            <div class="col-lg-2">
                <label for="order-del-name">Перевозчик</label>
                <select class="form-control" id="order-del-name" @change="setValueNewOrder({'order_del_name' : $event})">
                    <option value="" default>Отсутствует</option>
                    <option value="new_post">Новая Почта</option>
                    <option value="intime">Интайм</option>
                    <option value="delivery">Деливери</option>
                </select>
            </div>
            <div class="col-md-1">
                <div class="input-group">
                    <label for="order-del-depart-num">Номер отделения</label>
                    <input type="text" class="form-control" id="order-del-depart-num" placeholder="" @change="setValueNewOrder({'order_del_depart_num' : $event})">
                </div>
            </div>
            <div class="col-md-3">
                <div class="input-group">
                    <label for="order-del-address">Адресс</label>
                    <input type="text" class="form-control" id="order-del-address" placeholder="" @change="setValueNewOrder({'order_del_address' : $event})">
                </div>
            </div>
            <div class="col-lg-1">
                <label for="order-status">Статус заказа</label>
                <select class="form-control" id="order-status" @change="setValueNewOrder({'order_status' : $event})">
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
            <div class="col-lg-12">
                <label for="order_comment">Комментарий</label>
                <textarea type="text" class="form-control" id="order_comment" @change="setValueNewOrder({'order_comment' : $event})"></textarea>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <button type="button" class="btn btn-default" @click="createNewOrder">Создать</button>
            </div>
        </div>
    </div>
</template>
<script>
    import newCustomerForm from  '../customers/NewCustomerForm.vue'
    import newProductForm from '../products/NewProductForm.vue'
    import {mapGetters, mapActions} from 'vuex'
    export default{
        data(){
            return {
                isNewCustomerFormShowed: false,
                isNewProductFormShowed: false,
                filteredCustomers: [],
                filteredProducts: []
            }
        },
        components: {
            appNewCustomerForm: newCustomerForm,
            appNewProductForm: newProductForm
        },
        methods: {
            ...mapActions([
                'getOrders',
                'getCustomers',
                'getProducts',
                'removeSelectedCustomer',
                'removeSelectedProduct',
                'addChosenCustomer',
                'addChosenProduct',
                'setValueNewOrder',
                'createNewOrder'
            ]),
            filterCustomers($event, filterBy){
                this.filteredCustomers = [];
                let customers = this.$store.getters.getCustomers;
                for(let customer of customers){
                    if(this.filteredCustomers.length > 5){
                        break;
                    }else{
                        if($event.target.value !== '' && customer[filterBy].toString().indexOf($event.target.value) > -1){
                            this.filteredCustomers.push(customer)
                        }
                    }
                }
            },
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
            }
        },
        created(){
            this.getOrders({
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
            });
            this.getCustomers();
            this.getProducts();
        },
        computed: {
            ...mapGetters([
                'getMsg',
                'getNewOrder',
                'getSelectedCustomerDetail',
                'getSelectedProductsDetail'
            ])
        }
    }
</script>

<style>

</style>
