<template>
    <div class="container">
        <div class="row">
            <button type="button" class="btn btn-primary btn-md active pull-right" @click="$router.push({ path: 'customers/new' })">Новый Клиент</button>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Фамилия" v-model="filter.surname">
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
        </div>
        <div class="row">
            <table class="table">
                <thead>
                    <tr>
                        <th>ФИО</th>
                        <th>Контакты</th>
                        <th>Адресс</th>
                        <th>Комментарий</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(customer, index) in filteredCustomers">
                        <td @click="editCustomer(customer)">{{getFullName(customer)}}</td>
                        <td v-html="getAllContacts(customer)"></td>
                        <td>{{getDeliveryAdress(customer)}}</td>
                        <td>{{customer.customer_comment}}</td>
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
                    surname: null,
                    main_phone: null
                }
            }
        },
        methods: {
            ...mapActions([]),
            getFullName(customer){
                return (customer.customer_surname ? customer.customer_surname : '')
                    + ' ' + (customer.customer_name ? customer.customer_name : '')
                    + ' ' + (' ' + customer.customer_patronymic ? customer.customer_patronymic : '')
            },
            editCustomer(customerData){
                this.$router.push({ path: '/customers/edit/' + customerData.id})
            },
            getAllContacts(customer){
                return customer.customer_main_phone
                    + (customer.customer_add_phone ? '</br>' + customer.customer_add_phone : '')
                    + (customer.customer_add_1_phone ? '</br>' + customer.customer_add_1_phone : '')
                    + (customer.customer_email ? '</br>' + customer.customer_email : '')

            },
            getDeliveryAdress(customer){
                if(customer.customer_del_name){
                    let deliverName;
                    switch (customer.customer_del_name) {
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
                    return deliverName + ' г. ' + customer.customer_city + ' №' + customer.customer_del_depart_num
                }else{
                    return 'г. ' + customer.customer_city + customer.customer_local_address
                }
            }
        },
        computed:{
//            ...mapGetters([
//                'getUserSettings'
//              ]),
            filteredCustomers(){
                return this.$store.getters.getFilteredCustomers(this.filter)
            }
        },
        created(){

        }
    }
</script>

<style>

</style>
