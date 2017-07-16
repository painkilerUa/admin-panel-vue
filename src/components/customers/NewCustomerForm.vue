<template>
  <form class="container" >
      <div class="row">
          <div class="col-lg-4">
              <label for="customer_surname">Фамилия</label>
              <input type="text" class="form-control" id="customer_surname" placeholder="Гиршман" v-model.lazy="customer.customer_surname">
          </div>
          <div class="col-lg-4">
            <label for="customer_name">Имя</label>
            <input type="text" class="form-control" id="customer_name" placeholder="Леонард" v-model.lazy="customer.customer_name">
          </div>
          <div class="col-lg-4">
              <label for="customer_patronymic">Отчество</label>
              <input type="text" class="form-control" id="customer_patronymic" placeholder="Леопольдович" v-model.lazy="customer.customer_patronymic">
          </div>
      </div>
      <div class="row">
          <div class="col-lg-4">
              <label for="customer_main_phone">Телефон</label>
              <input type="tel" class="form-control" id="customer_main_phone" placeholder="380502747000" v-model.lazy.number="customer.customer_main_phone">
          </div>
          <div class="col-lg-4">
              <label for="customer_add_phone">Дополнительный телефон</label>
              <input type="tel" class="form-control" id="customer_add_phone" placeholder="380502747000" v-model.lazy.number="customer.customer_add_phone">
          </div>
          <div class="col-lg-4">
            <label for="customer_add_1_phone">Дополнительный телефон</label>
            <input type="tel" class="form-control" id="customer_add_1_phone" placeholder="380502747000" v-model.lazy.number="customer.customer_add_1_phone">
          </div>
      </div>
      <div class="row">
          <div class="col-lg-4">
              <label for="customer_email">Email</label>
              <input type="email" class="form-control" id="customer_email" placeholder="example@gmail.com" v-model.lazy="customer.customer_email">
          </div>
        <div class="col-lg-4"></div>
        <div class="col-lg-4"></div>
        <div class="col-lg-4"></div>
      </div>
      <div class="row">
          <div class="col-lg-4">
              <label for="customer_city">Город</label>
              <input type="text" class="form-control" id="customer_city" placeholder="Клайпеда" v-model.lazy="customer.customer_city">
          </div>
          <div class="col-lg-4">
              <label for="customer_del_name">Перевозчик</label>
              <select class="form-control" id="customer_del_name" v-model.lazy="customer.customer_del_name">
                <option value="new_post">Новая Почта</option>
                <option value="intime">Интайм</option>
                <option value="delivery">Деливери</option>
              </select>
          </div>
          <div class="col-lg-4">
              <label for="customer_del_depart_num">№ отделения</label>
              <input type="text" class="form-control" id="customer_del_depart_num" placeholder="5" v-model.lazy.number="customer.customer_del_depart_num">
          </div>
      </div>
      <div class="row">
          <div class="col-lg-12">
              <label for="customer_local_address">Местоположение адресной доставки</label>
              <input type="text" class="form-control" id="customer_local_address" placeholder="ул. Молочная, д 27, кв 15" v-model.lazy="customer.customer_local_address">
          </div>
      </div>
      <div class="row">
          <div class="col-lg-12">
              <label for="customer_comment">Комментарий</label>
            <textarea type="text" class="form-control" id="customer_comment" v-model.lazy="customer.customer_comment"></textarea>
          </div>
      </div>
      <div class="row">
          <div class="col-lg-12">
              <button type="submit" class="btn btn-default" @click.prevent="createNewCustomer(customer)">Создать</button>
          </div>
      </div>
  </form>
</template>
<script>
  import {mapActions} from 'vuex'
  export default{
    data(){
      return {
        customer: {
          customer_surname: null,
          customer_name: null,
          customer_patronymic: null,
          customer_main_phone: null,
          customer_add_phone: null,
          customer_add_1_phone: null,
          customer_email: null,
          customer_city: null,
          customer_del_name: null,
          customer_del_depart_num: null,
          customer_local_address: null,
          customer_comment: null
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
    }
  }
</script>

<style>

</style>
