<template>
    <div class="container">
        <div class="alert" :class="getMsg.className" role="alert" v-show="getMsg.text">
            <p>{{getMsg.text}}</p>
        </div>
        <div class="row">
          <button type="button" class="btn btn-primary btn-md active pull-right" @click="isNewCustomerFormShowed=!isNewCustomerFormShowed">Создать получателя</button>
        </div>
        <app-new-customer-form v-show="isNewCustomerFormShowed"></app-new-customer-form>
        <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-10">
                {{getNewOrder.order_user_id}}
            </div>
            <div class="col-md-1"></div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="input-group">
                    <span class="input-group-addon" id="full-name-input">ФИО</span>
                    <input type="text" class="form-control" id="basic-url" aria-describedby="full-name-input">
                </div>
            </div>
            <div class="col-md-4">
                <div class="input-group">
                    <span class="input-group-addon" id="phone-input">Телефон</span>
                    <input type="text" class="form-control" id="basic-url" aria-describedby="phone-input">
                </div>
            </div>
            <div class="col-md-4"></div>
        </div>
        <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-10">
                {{getSelectedCustomerDetail}}
            </div>
            <div class="col-md-1"></div>
        </div>
    </div>
</template>

<script>
    import newCustomerForm from  '../customers/NewCustomerForm.vue'
    import {mapGetters, mapActions} from 'vuex'
    export default{
        data(){
            return {
                isNewCustomerFormShowed: false
            }
        },
        components: {
          appNewCustomerForm: newCustomerForm
        },
        methods: {
            ...mapActions([
                'getOrders',
                'getCustomers'
            ])
        },
        created(){
            this.getOrders({
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
            });
            this.getCustomers();
        },
        computed: {
            ...mapGetters([
                'getMsg',
                'getNewOrder',
                'getSelectedCustomerDetail'
            ])
        }
    }
</script>

<style>

</style>
