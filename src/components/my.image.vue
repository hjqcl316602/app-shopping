<template>
    <div class="my-image"
         :data-type="type"
         :style="style"
         :class="className"
    >
        <img :src="src" :alt="title" @error="ErrorImage">
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            src:{type:String},
            title:{type:String,default:""},
            type:{type:String,default:'normal'},   // normal  head
            radius:{type:String,default:""},
            scale:{type:Number,default:0.5},
            backgroundColor:{type:String,default:""},
            className:{type:String,default:""}
        },
        computed:{
            style(){
                let style = {};
                if(!!this.radius){
                    style['border-radius'] = this.radius ;
                    style['overflow'] = 'hidden' ;
                }
                if(!!this.backgroundColor){
                    style['background-color'] = this.backgroundColor ;

                }
                style['background-size'] = 'auto '+ this.scale * 100 +'%';
                return style;
            }
        },
        data(){
            return {

            }
        },
        methods: {
            ErrorImage(e){
                e.target.src= '';
            }
        },
    }
</script>

<style scoped></style>