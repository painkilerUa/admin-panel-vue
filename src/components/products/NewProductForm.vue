<template>
  <form class="container" >
      <div class="row">
          <label for="product-name">Название</label>
          <input type="text" class="form-control" id="product-name" placeholder="Моторное масло ..." v-model.lazy="product.name">
      </div>
      <div class="row">
          <label for="short-description-product">Краткое описание товара</label>
          <textarea type="text" class="form-control" id="short-description-product" v-model.lazy="product.short_description"></textarea>
      </div>
      <div class="row">
          <label for="description-product">Описание товара</label>
          <textarea type="text" class="form-control" id="description-product" v-model.lazy="product.description"></textarea>
      </div>
      <div class="row">
          <div class="col-lg-4">
              <label for="product-price">Цена продажи</label>
              <input type="text" class="form-control" id="product-price" placeholder="999" v-model.lazy.number="product.price">
          </div>
          <div class="col-lg-4">
              <label for="product-purchase-price">Цена закупки</label>
              <input type="text" class="form-control" id="product-purchase-price" placeholder="999" v-model.lazy.number="product.purchase_price">
          </div>
          <div class="col-lg-4">
              <label for="product-status">Показывать на сайте</label>
              <select class="form-control" id="product-status" v-model.lazy.number="product.status">
                  <option value="1">Да</option>
                  <option value="0" selected>Нет</option>
              </select>
          </div>
      </div>
      <div class="row">
          <label for="meta-title-product">Meta title</label>
          <input type="text" class="form-control" id="meta-title-product" placeholder="..." v-model.lazy="product.meta_title">
      </div>
      <!--<div class="row">-->
          <!--<label for="product-url">Ссылка на товар</label>-->
          <!--<input type="text" class="form-control" id="product-url" placeholder="..." v-model.lazy="product.product_url">-->
      <!--</div>-->
      <!--<div class="row">-->
          <!--<label for="product-img-url">Ссылка на изображение</label>-->
          <!--<input type="text" class="form-control" id="product-img-url" placeholder="..." v-model.lazy="product.img_url">-->
      <!--</div>-->
      <div class="row">
          <div class="col-lg-4">
              <label for="product-quantity">Колличество</label>
              <input type="text" class="form-control" id="product-quantity" placeholder="9" v-model.lazy.number="product.quantity">
          </div>
          <div class="col-lg-4">
              <label for="product-vendor">Артикул</label>
              <input type="text" class="form-control" id="product-vendor" placeholder="001jk" v-model.lazy="product.vendor">
          </div>
          <div class="col-lg-4">
              <label for="product-category-id">ID категории</label>
              <input type="text" class="form-control" id="product-category-id" placeholder="7" v-model.lazy.number="product.category_id">
          </div>
      </div>
      <div class="row">
          <div class="col-lg-3">
              <label for="product-attr-type">Атрибут(тип масла)</label>
              <input type="text" class="form-control" id="product-attr-type" placeholder="Моторное масло" v-model.lazy="product.attr_type">
          </div>
          <div class="col-lg-3">
              <label for="product-attr-manufacturer">Атрибут(производитель)</label>
              <input type="text" class="form-control" id="product-attr-manufacturer" placeholder="total" v-model.lazy="product.attr_manufacturer">
          </div>
          <div class="col-lg-2">
              <label for="product-attr-vid">Атрибут(вид)</label>
              <input type="text" class="form-control" id="product-attr-vid" placeholder="semi-sent" v-model.lazy="product.attr_vid">
          </div>
          <div class="col-lg-2">
              <label for="product-attr-sae">Атрибут(SAE)</label>
              <input type="text" class="form-control" id="product-attr-sae" placeholder="5w30" v-model.lazy="product.attr_sae">
          </div>
          <div class="col-lg-2">
              <label for="product-attr-capacity">Атрибут(емкость, л)</label>
              <input type="text" class="form-control" id="product-attr-capacity" placeholder="4" v-model.lazy.number="product.attr_capacity">
          </div>
      </div>
      <div class="row">
          <div class="col-lg-3">
              <label for="product-attr-color">Атрибут(цвет антифриза)</label>
              <input type="text" class="form-control" id="product-attr-color" placeholder="Красный" v-model.lazy="product.attr_color">
          </div>
          <div class="col-lg-3">
              <label for="product-attr-antifreeze-class">Атрибут(класс антифриза)</label>
              <input type="text" class="form-control" id="product-attr-antifreeze-class" placeholder="G12" v-model.lazy="product.attr_antifreeze_class">
          </div>
          <div class="col-lg-3">
              <label for="product-attr-provider-num">Номер поставщика</label>
              <input type="text" class="form-control" id="product-attr-provider-num" placeholder="5" v-model.lazy.number="product.provider_num">
          </div>
          <div class="col-lg-3">
              <label for="product-image">Изображение</label>
              <input type="file" id="product-image" @change="upload($event)">
          </div>
      </div>
      <div class="row">
          <div class="col-lg-12">
              <button type="submit" class="btn btn-default" @click.prevent="createOrUpdateProduct()">Создать</button>
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
          price: null,
          purchase_price: null,
          status: null,
          meta_title: '',
//          product_url: '',
//          img_url: '',
          quantity: null,
          vendor: '',
          category_id: null,
          attr_type: null,
          attr_manufacturer: null,
          attr_vid: null,
          attr_sae: null,
          attr_capacity: null,
          attr_color: null,
          attr_antifreeze_class: null,
          update_time: null,
          provider_num: null
        },
        formData: new FormData()
      }
    },
    methods: {
        ...mapActions([
            'createNewProductAction',
            'updateProductAction',
            'setInformationMsg'
        ]),
        upload(e){
            this.formData.set('images', e.target.files[0])
        },
        createOrUpdateProduct(){
            if(!this.checkInsertedValue()) return;

            let product = JSON.stringify(this.product);
            this.formData.set('props', product);
            if(this.$route.params.product_id !== undefined){
                this.updateProductAction(this.formData)
            }else{
                this.createNewProductAction(this.formData)
            }
        },
        checkInsertedValue(){
//            if(this.product.name.length > 255 || this.product.short_description.length > 10000 || this.product.description.length > 10000 || this.product.meta_title > 255 || this.product.vendor > 100){
//              console.log('Too huge text field')
//              return false;
//            }
//            if(this.product.quantity.length > 3){
//              console.log('Too huge quantity')
//              return false;
//            }
//            if(this.product.category_id.length > 9){
//              console.log('Too huge category id')
//              return false;
//            }
//            if(this.product.price.length > 7 || this.product.purchase_price.length > 6){
//                console.log('Too huge price')
//                return false;
//            }
//            if(product.attr_type.length > 40 || product.attr_manufacturer.length > 40 || product.attr_vid.length > 40 || product.attr_sae.length > 10 || product.attr_color.length > 20 || product.attr_antifreeze_class.length > 20 || product.attr_capacity.length > 10){
//              console.log('Attr fields are incorrect');
//              return false;
//            }
//            if(this.product.provider_num.length > 3){
//              console.log('Too huge provider_num')
//              return false;
//            }

            if(!this.product.name || !this.product.price || !this.product.purchase_price || !this.product.vendor){
                this.setInformationMsg({'text' : 'Form filled up incorrectly', 'className': 'alert-danger'});
                console.log('Form filled up incorrectly');
                return false;
            }
            return true;
        }
    },
    created(){
        if(this.$route.params.product_id !== undefined){
            let editingProduct = this.$store.getters.getProductById(this.$route.params.product_id);
            this.product = Object.assign(editingProduct);
        }
    }
  }
</script>

<style>

</style>
