<template>
    <div class="voice-top-wrap">
        <div class="voice-top-div">
              <span v-for="(item,index) in dLength"
                    class="span-class"
                    :class="'busy-' + templateName"
                    :key="'动' + index"
                    :style="{
                        'height': Math.ceil(Math.random()*30),
                        'background-color': color,
                        'opacity': isLinear ? (isReverse ? 1 - (1 - index/10) : 1 - index/10) : 1
                    }">
              </span>
        </div>

    </div>
</template>

<script>
export default {
    name: 'zy-voice',
    props: {
        color: {
            type: String,
            default: '#999'
        },
        isLinear: {
            type: Boolean,
            default: false
        },
        isReverse: {
            type: Boolean,
            default: false
        },
        dLength: {
            type: Number,
            default: 10
        },
        maxHeight: {
            type: Number,
            default: 15
        }
    },
    data() {
        return {
            templateName: '',
            timer: null,
            frameCount: 0,
            between: 10
        };
    },
    watch: {},
    mounted() {
        this.init();
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
            cancelAnimationFrame(this.timer)
        }
    },
    computed: {},

    methods: {
        init() {
            this.templateName = Math.random().toFixed(3);
            if(requestAnimationFrame) {
                this.timer = requestAnimationFrame(this.animate)
            } else {
                this.timer = setInterval(() => {
                    this.animate()
                }, 200);
            }
        },
        animate () {
            if(requestAnimationFrame){
                this.frameCount ++
                if(this.frameCount % this.between === 0) {
                    this.animateHandle()
                    this.frameCount = 0
                }
                requestAnimationFrame(this.animate)
            } else {
                this.animateHandle()
            }
        },
        animateHandle () {
            let domArr = document.getElementsByClassName('busy-' + this.templateName);
            let a = Math.ceil(Math.random() * this.dLength)
            let b = Math.ceil(Math.random() * this.dLength)
            // let c = Math.max(a, b)
            Array.from(domArr).forEach((item, index) => {
                if (index < b - a) {
                    item.style.height = item.offsetHeight + 1 + 'px'
                    if (item.offsetHeight >= this.maxHeight) {
                        item.style.height = 10 + 'px'
                    }

                } else if (index < b) {
                    item.style.height = item.offsetHeight - 1 + 'px'
                    if (item.offsetHeight <= this.maxHeight) {
                        item.style.height = Math.ceil(Math.random() * this.dLength) + 'px'
                    }

                } else if (index > b) {
                    item.style.height = item.offsetHeight + 1 + 'px'
                    if (item.offsetHeight >= this.maxHeight) {
                        item.style.height = Math.ceil(Math.random() * this.dLength) + 'px'
                    }
                }
            })
        }
    },
};
</script>

<style lang="scss" scoped>
.voice-top-wrap {
    display: inline-block;
    vertical-align: middle;
    .voice-top-div {
        overflow: hidden;
        display: flex;
        align-items: center;
    }
    .span-class {
        display: inline-block;
        width: 2px;
        height: 1px;
        margin-right: 2px;
        transition: 0.3s;
    }
}
</style>
