<template>
    <div>
<!--        {{numSplitArr}}-->
        <div class="flip-wrapper">
            <!-- 翻牌的外框 -->
            <div class="flip down" :class="{go: item.go}" v-for="(item, index) in numSplitArr" :key="index">
                <!-- 位于前面的纸牌 -->
                <div class="digital front" :class="'number' + getBeforeNum(index)"></div>
                <!-- 位于后面的纸牌 -->
                <div class="digital back" :class="'number' + (numArr.includes(item.num) ? item.num : '')"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'zy-flip',
    props: {
        decLength: {
            default: 1
        },
        digit: {
            default: 400,
            type: Number
        },
        target: {
            default: 515.50,
            type: Number
        },
        timer: {
            default: 3000,
            type: Number
        },
        numberSplit: {
            default: 10,
            type: Number
        }
    },
    data() {
        return {
            numBefore: 0,
            numSplitArr: [],
            numBeforeSplitArr: [],
            numArr: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
            goMark: true
        }
    },
    mounted() {
        this.num = this.digit;
        // this.target = this.target;

        let arr =  this.num.toString().split('')
        this.numSplitArr = arr.map(item => ({
            go: true,
            num: item
        }));

        let beforeArr = this.numBefore.toString().split('');
        this.numBeforeSplitArr = arr.map((item, index) => ({
            go: true,
            num: beforeArr[index] ? beforeArr[index] : '0'
        }))
        this.reset();

        let timer = setInterval(() => {
            if(Number(this.target) <= Number(this.num)) {
                clearInterval(timer)
            } else {
                this.add();
            }
        }, 350
            //this.timer / ((this.target - this.num) / this.numberSplit) > 350 ? 350 : this.timer / ((this.target - this.num) / this.numberSplit)
        )
    },
    methods: {
        reset () {
            setTimeout(() => {
                this.numSplitArr.forEach((item) => {
                    item.go = false
                })
                this.setBeforeNumber();
            }, 300)
        },
        setBeforeNumber () {
            let arr = this.num.toString().split('')
            this.numBeforeSplitArr = arr.map((item) => ({
                go: true,
                num: item
            }))
        },
        add() {
            this.num = (this.num + this.numberSplit > this.target ? this.target : this.num + this.numberSplit);
            let numSplitArr = this.num.toString().split('');
            console.log(numSplitArr)
            if(numSplitArr.length > this.numSplitArr.length) {
                let between = numSplitArr.length - this.numSplitArr.length;
                for(let i = 0; i < between; i ++) {
                    this.numSplitArr.unshift({
                        go: true,
                        num: 0
                    })
                }
                this.numSplitArr.forEach((item, index) => {
                    item.go = false
                    if (item.num !== numSplitArr[index]) {
                        item.go = true;
                        this.numSplitArr[index].num = numSplitArr[index]
                    }
                })
            } else {
                this.numSplitArr.forEach((item, index) => {
                    item.go = false
                    if (item.num !== numSplitArr[index]) {
                        item.go = true;
                        this.numSplitArr[index].num = numSplitArr[index]
                    }
                })
            }
            this.reset();
        },
        getBeforeNum(index) {
            let num = this.numBeforeSplitArr[index];
            if (num) {
                if (this.numArr.includes(num.num)) {
                    return num.num;
                } else {
                    return ''
                }
            } else {
                return '0'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.flip {
    display: inline-block;
    position: relative;
    width: 60px;
    height: 100px;
    line-height: 100px;
    border: solid 1px #000;
    border-radius: 10px;
    background: #fff;
    font-size: 66px;
    color: #fff;
    box-shadow: 0 0 6px rgba(0, 0, 0, .5);
    text-align: center;
    font-family: "Helvetica Neue";
    margin-right: 10px;
}

.flip .digital:before,
.flip .digital:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    background: #000;
    overflow: hidden;
    box-sizing: border-box;
}

.flip .digital:before {
    top: 0;
    bottom: 50%;
    border-radius: 10px 10px 0 0;
    border-bottom: solid 1px #666;
}

.flip .digital:after {
    top: 50%;
    bottom: 0;
    border-radius: 0 0 10px 10px;
    line-height: 0;
}

.flip .number0:before,
.flip .number0:after {
    content: "0";
}

.flip .number1:before,
.flip .number1:after {
    content: "1";
}

.flip .number2:before,
.flip .number2:after {
    content: "2";
}

.flip .number3:before,
.flip .number3:after {
    content: "3";
}

.flip .number4:before,
.flip .number4:after {
    content: "4";
}

.flip .number5:before,
.flip .number5:after {
    content: "5";
}

.flip .number6:before,
.flip .number6:after {
    content: "6";
}

.flip .number7:before,
.flip .number7:after {
    content: "7";
}

.flip .number8:before,
.flip .number8:after {
    content: "8";
}

.flip .number9:before,
.flip .number9:after {
    content: "9";
}

.flip .number:before,
.flip .number:after {
    content: ".";
}

/*向下翻*/
.flip.down .front:before {
    z-index: 3;
}

.flip.down .back:after {
    z-index: 2;
    transform-origin: 50% 0%;
    transform: perspective(160px) rotateX(180deg);
}

.flip.down .front:after,
.flip.down .back:before {
    z-index: 1;
}

/*向上翻*/
.flip.up .front:after {
    z-index: 3;
}

.flip.up .back:before {
    z-index: 2;
    transform-origin: 50% 100%;
    transform: perspective(160px) rotateX(-180deg);
}

.flip.up .front:before,
.flip.up .back:after {
    z-index: 1;
}

.flip.down.go .front:before {
    transform-origin: 50% 100%;
    animation: frontFlipDown 0.3s ease-in-out both;
    box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
}

.flip.down.go .back:after {
    animation: backFlipDown 0.3s ease-in-out both;
}

@keyframes frontFlipDown {
    0% {
        transform: perspective(160px) rotateX(0deg);
    }

    100% {
        transform: perspective(160px) rotateX(-180deg);
    }
}

@keyframes backFlipDown {
    0% {
        transform: perspective(160px) rotateX(180deg);
    }

    100% {
        transform: perspective(160px) rotateX(0deg);
    }
}

.flip.up.go .front:after {
    transform-origin: 50% 0;
    animation: frontFlipUp 0.3s ease-in-out both;
    box-shadow: 0 2px 6px rgba(255, 255, 255, 0.3);
    backface-visibility: hidden;
}

.flip.up.go .back:before {
    animation: backFlipUp 0.3s ease-in-out both;
}

@keyframes frontFlipUp {
    0% {
        transform: perspective(160px) rotateX(0deg);
    }

    100% {
        transform: perspective(160px) rotateX(180deg);
    }
}

@keyframes backFlipUp {
    0% {
        transform: perspective(160px) rotateX(-180deg);
    }

    100% {
        transform: perspective(160px) rotateX(0deg);
    }
}

.single-demo {
    margin: 50px auto;
    padding: 30px;
    width: 600px;
    text-align: center;
    border: solid 1px #999;
}
</style>
