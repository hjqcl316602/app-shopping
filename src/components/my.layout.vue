
<!--

使用方式 - 通过配置，基本能满足各种布局
<my-flex flex col="2 fix" flex-direction="row" flex-wrap="wrap" align-content="space-between" style="height:500px;" align-items="center"></my-flex>

实现垂直方向的布局
<my-flex flex col="24" flex-direction="column" flex-wrap="nowrap"  style="height:100%;">
    <my-flex col="fix" style="width: 100px;height:100px;background-color: olive">

    </my-flex>
    <my-flex col="auto" style="overflow: auto;position: relative">
        <div style="background-color: blue;width: 100px;height:1000px;">

        </div>
    </my-flex>

    <my-flex  col="24" style="height:100px; background-color: red">

    </my-flex>
</my-flex>

实现table布局
<my-flex  table >
    <my-flex  table-tr >
        <my-flex table-th v-for="(item,key) in columns" :key="key">
            <my-text className="my-text__bold">{{ item.title}}</my-text>
        </my-flex>
    </my-flex>
    <my-flex  table-tr v-for="(item,key) in data" :key="key">
        <my-flex table-td ></my-flex>
    </my-flex>
    <my-flex  table-tr >
        <my-flex table-td></my-flex>
    </my-flex>
</my-flex>
-->


<template>
    <div :class="classNames" :style="styleName" @click="$emit('click')">
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        computed:{
            classNames(){
                let className = this.className;

                if(this.flex){
                    className += ` my-flex` ;
                }
                if(this.col){
                    className += ` my-flex__col--`+this.col;
                }
                if(this.justifyContent){
                    className += ` my-flex__justify-content--${this.justifyContent}` ;
                }
                if(this.alignItems){
                    className += ` my-flex__align-items--${this.alignItems}`   ;
                }
                if(this.alignContent){
                    className += ` my-flex__align-content--${this.alignContent}` ;
                }
                if(this.flexWrap){
                    className += ` my-flex__flex-wrap--${this.flexWrap}`;
                }
                if(this.flexDirection){
                    className += ` my-flex__flex-direction--${this.flexDirection}` ;
                }

                if(this.table){
                    className += ` my-table` ;
                }
                if(this.tableTr){
                    className += ` my-table__tr` ;
                }
                if(this.tableTh){
                    className += ` my-table__th` ;
                }
                if(this.tableTd){
                    className += ` my-table__td` ;
                }

                return className;
            },
        },
        props: {
            className: {
                type: String, default: ""
            },
            flex: {
                type: Boolean, default: false
            },
            col: {
                type: String, default: ""     // col - 1 - 24  auto fix 100px(宽度)
            },

            justifyContent: {
                type: String, default: ""
            },

            alignItems: {
                type: String, default: ""
            },

            alignContent:{
                type: String, default: ""
            },

            flexWrap:{
                type: String, default: ""
            },

            flexDirection:{
                type: String, default: ""
            },

            styleName: {
                type: String, default: ""
            }
            // table 布局
            ,
            table:{
                type: Boolean, default: false
            },
            tableTr:{
                type: Boolean, default: false
            },
            tableTh:{
                type: Boolean, default: false
            },
            tableTd:{
                type: Boolean, default: false
            }
        }
    }
</script>

<style scoped></style>
