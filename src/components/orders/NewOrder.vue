<template>
    <div class="container">
        <div class="row">
          <button type="button" class="btn btn-primary btn-md active pull-right" @click="isNewCustomerFormShowed=!isNewCustomerFormShowed">Создать получателя</button>
        </div>
        <app-new-customer-form v-show="isNewCustomerFormShowed"></app-new-customer-form>
    </div>
</template>

<script>
    import newCustomerForm from  '../customers/NewCustomerForm.vue'
    import {mapActions} from 'vuex'
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
                'getOrders'
            ])
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
