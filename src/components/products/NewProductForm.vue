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
              <input type="text" class="form-control" id="product-price" placeholder="999" v-model.lazy="product.price">
          </div>
          <div class="col-lg-4">
              <label for="product-purchase-price">Цена закупки</label>
              <input type="text" class="form-control" id="product-purchase-price" placeholder="999" v-model.lazy="product.purchase_price">
          </div>
          <div class="col-lg-4">
              <label for="product-status">Показывать на сайте</label>
              <select class="form-control" id="product-status" v-model.lazy="product.status">
                  <option value="1">Да</option>
                  <option value="0" selected>Нет</option>
              </select>
          </div>
      </div>
      <div class="row">
          <label for="meta-title-product">Meta title</label>
          <input type="text" class="form-control" id="meta-title-product" placeholder="..." v-model.lazy="product.meta_title">
      </div>
      <div class="row">
          <label for="product-url">Ссылка на товар</label>
          <input type="text" class="form-control" id="product-url" placeholder="..." v-model.lazy="product.product_url">
      </div>
      <div class="row">
          <label for="product-img-url">Ссылка на изображение</label>
          <input type="text" class="form-control" id="product-img-url" placeholder="..." v-model.lazy="product.img_url">
      </div>
      <div class="row">
          <div class="col-lg-4">
              <label for="product-quantity">Колличество</label>
              <input type="text" class="form-control" id="product-quantity" placeholder="9" v-model.lazy="product.quantity">
          </div>
          <div class="col-lg-4">
              <label for="product-vendor">Артикул</label>
              <input type="text" class="form-control" id="product-vendor" placeholder="001jk" v-model.lazy="product.vendor">
          </div>
          <div class="col-lg-4">
              <label for="product-category-id">ID категории</label>
              <input type="text" class="form-control" id="product-category-id" placeholder="7" v-model.lazy="product.category_id">
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
              <input type="text" class="form-control" id="product-attr-capacity" placeholder="4" v-model.lazy="product.attr_capacity">
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
              <input type="text" class="form-control" id="product-attr-provider-num" placeholder="5" v-model.lazy="product.provider_num">
          </div>
          <div class="col-lg-3">
              <label for="product-image">Изображение</label>
              <input type="file" id="product-image" @change="upload($event)">
          </div>
      </div>
      <div class="row">
          <div class="col-lg-12">
              <button type="submit" class="btn btn-default" @click.prevent="createNewProduct()">Создать</button>
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
        },
        formData: new FormData()
      }
    },
    methods: {
        ...mapActions([
            'createNewProductAction'
        ]),
        upload(e){
            this.formData = new FormData()
            this.formData.append('images', e.target.files[0])
        },
        createNewProduct(){
            for(let key in this.product){
                if(this.product[key]){
                    this.formData.append(key, this.product[key]);
                }else{
                    this.formData.append(key, '');
                }
            }
            this.createNewProductAction(this.formData)
        }
    },
    created(){
//      this.getOrders()
    }
  }
</script>

<style>

</style>
