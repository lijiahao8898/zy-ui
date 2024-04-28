<template>
    <div class="voice-top-wrap">
        <div class="voice-top-div">
              <span v-for="(item,index) in dLength" class="span-class" :class="'busy-' + templateName" :key="'动' + index"
                    :style="{'height':Math.ceil(Math.random()*30)}"></span>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'zy-voice',
        props: [],
        data() {
            return {
                templateName: '',
                dLength: 10,
                timer: null,
            };
        },
        watch: {},
        mounted() {
            this.init(15);
        },
        beforeDestroy() {
            if (this.timer) {
                clearTimeout(this.timer);
            }
        },
        computed: {},

        methods: {
            init(_height ) {
                this.templateName = Math.random().toFixed(3);
                this.timer = setInterval(() => {
                    let domArr = document.getElementsByClassName('busy-' + this.templateName);
                    let a = Math.ceil(Math.random() * this.dLength)
                    let b = Math.ceil(Math.random() * this.dLength)
                    // let c = Math.max(a, b)
                    Array.from(domArr).forEach((item, index) => {
                        if (index < b - a) {
                            item.style.height = item.offsetHeight + 1 + 'px'
                            if (item.offsetHeight >= _height) {
                                item.style.height = 10 + 'px'
                            }

                        } else if (index < b) {
                            item.style.height = item.offsetHeight - 1 + 'px'
                            if (item.offsetHeight <= _height) {
                                item.style.height = Math.ceil(Math.random() * this.dLength) + 'px'
                            }

                        } else if (index > b) {
                            item.style.height == item.offsetHeight + 1 + 'px'
                            if (item.offsetHeight >= _height) {
                                item.style.height = Math.ceil(Math.random() * this.dLength) + 'px'
                            }
                        }
                    })

                }, 200);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .voice-top-wrap {
        display: inline-block;
        vertical-align: middle;
        .voice-top-div {
            height: 50px;
            overflow: hidden;
            display: flex;
            align-items: center;
        }
        .span-class {
            display: inline-block;
            background-color: #999;
            width: 2px;
            height: 10px;
            margin-right: 2px;
            transition: 0.3s;
        }
    }
</style>
