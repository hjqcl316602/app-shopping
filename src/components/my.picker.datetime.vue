<template>
    <van-popup v-model="isShow" position="bottom">
        <van-datetime-picker
                v-model="currentDate"
                type="datetime"
                :min-date="minDate"
                :max-date="maxDate"
        />
    </van-popup>
</template>

<script type="text/ecmascript-6">
    export default {
        name:"picker",
        components: {},
        beforeRouteEnter (to, from, next) {
            //document.title = '搜索结果';
            next(vm=> {
                //console.log(vm);
            })
        },
        beforeRouteLeave(to, from, next){
            next();
        },
        beforeRouteUpdate (to, from, next) {
            next();
        },
        beforeCreate(){
        },
        created(){
        },
        beforeMount(){
        },
        mounted(){
        },
        activated(){
        },
        props: [],
        data(){
            return {
                isShow:false,
                minHour: 10,
                maxHour: 20,
                minDate: new Date(),
                maxDate: new Date(2019, 10, 1),
                currentDate: new Date(),
            }
        },
        methods: {
            hide(){
                this.isShow = false;
            },
            show(){
                this.isShow = true;
            }
        },
        watch: {

            '': {
                handler(val, olval){

                },
                deep: true,
            }
        }
    }
</script>

<style scoped></style>