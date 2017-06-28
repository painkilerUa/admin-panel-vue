<template>
  <form class="container" >
      <div class="row">
          <label for="product-name">Название</label>
          <input type="text" class="form-control" id="product-name" placeholder="Моторное масло ..." v-model.lazy="product.name">
      </div>

      <div class="row">
          <div class="col-lg-12">
              <button type="submit" class="btn btn-default" @click.prevent="">Создать</button>
          </div>
      </div>
  </form>
</template>
<script>
  import {mapActions} from 'vuex'
  export default{
    data(){
      return {
        product: {
          name: '',
          short_description: '',
          description: '',
          price: '',
          purchase_price: '',
          status: '',
          meta_title: '',
          product_url: '',
          img_url: '',
          quantity: '',
          vendor: '',
          category_id: '',
          attr_type: '',
          attr_manufacturer: '',
          attr_vid: '',
          attr_sae: '',
          attr_capacity: '',
          attr_color: '',
          attr_antifreeze_class: '',
          update_time: '',
          provider_num: ''
        }
      }
    },
    methods: {
        ...mapActions([
            'getOrders',
            'createNewCustomer'
        ]),
    },
    created(){
      this.getOrders()
    }
  }
</script>

<style>

</style>
