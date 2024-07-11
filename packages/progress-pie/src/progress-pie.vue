<template>
    <div class="pie">
        <div class="pie-left">
            <div class="pie-wrapper" :style="colorStyle">
                <strong v-if="this.isShowNumber=='true'" :style="strongStyle">{{ value }}%</strong>
                <div class="div_1" :style="div1Style"></div>
                <div class="div_2" :style="div2Style"></div>
                <span :style="ringStyle" v-if="this.ring!=0"></span>
            </div>
        </div>
        <div class="pie-right">{{ value }}%</div>
    </div>
</template>

<script>
export default {
    name: "zyProgressPie",
    props: {
        "value": String,
        "ring": String,
        "isShowNumber": String,
        "color": String,
        "rotate": String,
        "isAnimate": String,
        size: String,
    },
    data() {
        return {
            ringStyle: {},
            colorStyle: {},
            div1Style: {
                transform: 'rotate(0turn)'
            },
            div2Style: {
                opacity: 0,
                transform: 'rotate(0turn)'
            },
            strongStyle: {}
        }
    },
    watch: {
        value(val) {
            if (val) {
                this.ringStyle = {}
                this.colorStyle = {}
                this.div1Style = {
                    transform: 'rotate(0turn)'
                }
                this.div2Style = {
                    opacity: 0,
                    transform: 'rotate(0turn)'
                }
                this.strongStyle = {}
                this.initPie()
            }
        },
    },
    created() {
        this.initPie();
    },
    methods: {
        initPie() {
            let isAnimate = this.isAnimate; // 是否动画
            if (isAnimate === 'true') {
                setTimeout(this._showPie, 100);
            } else {
                this._showPie()
            }
        },

        _showPie() {
            let percent = Number(this.value / 100), // 百分比
                isRing = this.ring || 0,                   // 是否空心
                color = this.color,                        // 自定义颜色
                rotate = this.rotate,                      // 是否旋转
                isAnimate = this.isAnimate || 'false';     // 是否动画

            // 最多只有1
            if (percent > 1) {
                percent = 1;
            }

            this.colorStyle.width = this.size + 'px';
            this.colorStyle.lineHeight = this.colorStyle.height = this.size + 'px';

            // 是否空心
            if (isRing) {
                const w = isRing * 100;
                this.ringStyle = {
                    width: w + '%',
                    height: w + '%',
                    top: (50 - w / 2) + '%',
                    left: (50 - w / 2) + '%',
                    background: '#fff'
                }
            }

            if (color && percent > 0) {
                this.colorStyle.backgroundImage = 'linear-gradient(to right, transparent 50%, ' + color + ' 0)';
                this.div2Style.background = color;
            }

            if (percent > 0.5) {
                this.div1Style.transform = 'rotate(0.5turn)';

                if (isAnimate == 'true') {
                    setTimeout(() => {
                        this._setDiv2Style(percent);
                    }, 800);
                } else {
                    this._setDiv2Style(percent);
                }

            } else if (percent <= 0) {
                this.div1Style.transform = 'rotate(0turn)';
            } else {
                this.div1Style.transform = 'rotate(' + percent + 'turn)';
            }

            if (rotate) {
                this.colorStyle.transform = 'rotate(' + rotate + 'deg)';
                // 文字转回来
                this.strongStyle.transform = 'rotate(' + -rotate + 'deg)';
            }
        },

        _setDiv2Style(percent) {
            this.div2Style.opacity = 1;
            this.div2Style.transform = 'rotate(' + (percent - 0.5) + 'turn)';
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.pie {
    display: inline-block;
    overflow: hidden;
    //width: 110px;
    margin: 0 auto;

    &-wrapper {
        position: relative;
        z-index: 0;
        left: 0;
        top: 0;
        width: 36px;
        height: 36px;
        line-height: 36px;
        border-radius: 50%;
        text-align: center;
        color: #000;
        font-size: 36%;
        background-color: #f0f0f0;
        background-image: linear-gradient(to right, transparent 50%, yellowgreen 0);
        cursor: pointer;
        overflow: hidden;
        margin: 0 auto;

        strong {
            position: absolute;
            width: 100%;
            left: 0;
            z-index: 1;
            margin: 0;
            padding: 0;
        }

        span {
            display: block;
            border-radius: 50%;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            margin: 0;
            padding: 0;
        }

        div {
            position: absolute;
            top: 0;
            width: 60%;
            height: 100%;
            left: 50%;
            transform: rotate(0turn);
            transform-origin: center left;
            transition: transform 0.7s linear;
            margin: 0;
            padding: 0;
        }

        > .div_1 {
            background-color: inherit;
            z-index: -2;
        }

        > .div_2 {
            opacity: 0;
            z-index: -1;
            background-color: yellowgreen;
        }
    }

    &-left {
        float: left;
        //width: 40%;
    }

    &-right {
        float: right;
        //width: 60%;
        margin-top: 10px;
        margin-left: 10px;
        text-align: right;
    }
}
</style>
