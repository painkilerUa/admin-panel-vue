<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <label for="file-price">Прайсы</label>
                <input type="file" id="file-price" @change="upload($event)">
            </div>
            <div class="col-md-4">
            </div>
            <div class="col-md-4"></div>
        </div>
        <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-4"><button type="submit" class="btn btn-default" @click.prevent="createOrUpdateProduct()">Обновить</button></div>
            <div class="col-md-4"></div>
        </div>
    </div>
</template>


<script>
    import {mapGetters, mapActions} from 'vuex'
    export default{
        data(){
            return {
              formData: new FormData()
            }
        },
        components: {
        },
        methods: {
            ...mapActions([
            ]),
            upload(e){
              this.formData.set('images', e.target.files)
            }
        },
        created(){

        },
        computed: {
            ...mapGetters([
            ])
        }
    }
</script>

<style>

</style>
