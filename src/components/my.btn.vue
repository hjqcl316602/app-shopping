<template>
    <div class="my-btn" :class="classNames" :style="styleName" @click="$emit('click')">
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        computed:{
            classNames(){
                let className = ` my-btn__${this.type}` ;
                className += ` my-btn--${this.status} `;
                if(this.radiusType){
                    className += ` my-btn__radius--${this.radiusType}`
                }
                if(this.className){
                    className+= `  ${this.className}`
                }
                return className;
            },

        },
        props:{
            type:{type:String,default:'normal'}, // normal一般文本型 icon带有icon的  handle 操作型
            status:{type:String,default:'theme'},
            radiusType:{type:String,default:''}  ,     // sm lg
            styleName:String,
            className:String,
        },
    }
</script>

<style scoped></style>