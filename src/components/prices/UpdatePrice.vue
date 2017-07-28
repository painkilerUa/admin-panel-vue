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
            ]),

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
