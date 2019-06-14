<template>
    <div class="hello" style="height:300px;background-color: #dcdcdc">
        <cube-scroll
                ref="scroll"
                :options="options"
                @pulling-up="onPullingUp"  @pulling-down="onPullingDown">
            <div class="">
                <div class="" v-for="item in items" style="width: 100%;height:50px;background-color: #777777">
                    {{ item }}
                </div>
            </div>
            <template slot="pullup"   slot-scope="props">
                <div class="cube-pullup-wrapper" v-if="props.pullUpLoad">
                    <div class="before-trigger" v-if="!props.isPullUpLoad">
                        <span>{{ props.pullUpTxt + '1212122'}}</span>
                    </div>
                    <div class="after-trigger" v-else>
                        <loading></loading>
                    </div>
                </div>
            </template>
            <template slot="pulldown" slot-scope="props">
                <div
                        v-if="props.pullDownRefresh"
                        class="cube-pulldown-wrapper"
                        :style="props.pullDownStyle">
                    <div
                            v-if="props.beforePullDown"
                            class="before-trigger"
                            :style="{paddingTop: props.bubbleY + 'px'}">
                        <span :class="{rotate: props.bubbleY > 40}">↓</span>
                    </div>
                    <div class="after-trigger" v-else>
                        <div v-if="props.isPullingDown" class="loading">
                            <cube-loading></cube-loading>
                        </div>
                        <div v-else><span>Refresh success</span></div>
                    </div>
                </div>
            </template>
            <template slot="pullup" slot-scope="props">
                <div class="cube-pullup-wrapper" v-if="props.pullUpLoad">
                    <div class="before-trigger" v-if="!props.isPullUpLoad">
                        <span>{{ props.pullUpTxt + '1212122'}}</span>
                    </div>
                    <div class="after-trigger" v-else>
                        加载中...
                    </div>
                </div>
            </template>
        </cube-scroll>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                items: [1, 2, 3, 4, 5,1,1],
                itemIndex: 5,
                options: {
                    pullUpLoad: {
                        threshold: 60,
                        stop: 50,
                        txt: {
                            more: 'Load more',
                            noMore: 'No more data'
                        }
                    },
                    pullDownRefresh: {
                        threshold: 60,
                        stop: 50,
                        txt: '加载完成'
                    }
                }
            }
        },
        methods: {
            getDataList(){
                return new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        let newPage = [
                            'I am new  line ' + ++this.itemIndex,
                            'I am new  line ' + ++this.itemIndex,
                            'I am new  line ' + ++this.itemIndex,
                            'I am new  line ' + ++this.itemIndex,
                            'I am new  line ' + ++this.itemIndex
                        ];
                        this.items = this.items.concat(newPage)
                    },10000);

                })
            },
            onPullingDown() {
                this.getDataList().then(()=>{
                    this.$refs.scroll.forceUpdate()
                });
            },
            onPullingUp() {
                this.getDataList().then(()=>{
                    this.$refs.scroll.forceUpdate()
                });
            },
        }
    }
</script>

<style scoped>
</style>
