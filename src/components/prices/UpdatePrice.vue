<template>
    <div class="container">
        <div class="row wrap-last-date-price-update">
            <div class="col-md-4">
                <span>Последнее обновление прайса: {{getLastUpdatePricesDate}}</span>
            </div>
            <div class="col-md-6"></div>
            <ul class="col-md-2">
              <li>busmarket.xlsx</li>
              <li>maslotochka.xlsx</li>
              <li>omega.xlsx</li>
              <li>asg.xlsx</li>
              <li>kaminion.xlsx</li>
              <li>vladislav.xlsx</li>
              <li>mkpp.xlsx</li>
            </ul>
        </div>
        <div class="row">
            <div class="col-md-4">
                <label for="file-price">Прайсы</label>
                <input type="file" id="file-price" multiple @change="upload($event)">
            </div>
            <div class="col-md-4">
            </div>
            <div class="col-md-4"></div>
        </div>
        <div class="row">
            <div class="col-md-4">
            </div>
            <div class="col-md-4">
                <button type="button" class="btn btn-default" @click="uploadPricesOnServer">Обновить</button>
            </div>
            <div class="col-md-4"></div>
        </div>
    </div>
</template>


<script>
    import {mapGetters, mapActions} from 'vuex'
    export default{
        data(){
            return {

            }
        },
        components: {
        },
        methods: {
            ...mapActions([
                'uploadPricesOnServer',
                'setLastUpdatePricesDate'
            ]),
            upload(event){
                console.log(event.target.files)
                let formData = new FormData();
                Object.keys(event.target.files).forEach((key, i) => {
                    formData.set('image' + i, event.target.files[key]);
                })

                this.uploadPricesOnServer(formData)
            }
        },
        created(){
            this.setLastUpdatePricesDate()
        },
        computed: {
            ...mapGetters([
                'getLastUpdatePricesDate'
            ])
        }
    }
</script>

<style scoped>
    .wrap-last-date-price-update{
      text-align: center;
    }
</style>
