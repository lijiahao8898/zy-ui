<template>
    <div class="wrapper">
        <div class="user" @click="selectItem(user)" :class="{selected: selected.czrkgmsfhm_md5 === user.czrkgmsfhm_md5}">
            <div class="user-circle"></div>
            <div class="user-name">{{user.czrkxm}}</div>
        </div>
<!--        <img src="../../../assets/images/screen/relation/relation-bg.png" alt="">-->
        <div class="circle-scroll" ref="circleScroll"
             v-for="(item, index) in length" :key="index"
             :class="`circle-scroll-${index}`"
        >
            <div class="circle-scroll-wrapper">
                <template v-for="(subItem, i) in category">
                    <div class="circle-scroll__item"
                         v-if="(index+1) === subItem.level"
                         :ref="`circle-scroll-${index}-item`"
                         :key="i"
                         :data-pos="subItem.positionNumber"
                    >
                        <div class="item" @click="selectItem(subItem)" :class="{selected: selected.czrkgmsfhm_md5 === subItem.czrkgmsfhm_md5}">
                            <div class="item-circle" :class="`item-circle-${subItem.type}`"></div>
                            <div class="item-name">{{category[i].czrkxm}}</div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'zy-relation',
    props: {
        category: {
            default: () => []
        },
        user: {
            default: () => {}
        }
    },
    data () {
        return {
            length: 6,
            selected: {}
        }
    },
    mounted() {},
    methods: {
        render () {
            let circleScrollArr = this.$refs.circleScroll;
            // let exampleNumber = [
            //     [1, 3, 7, 5, 6, 10, 12, 2, 4, 11, 8, 9],
            //     [1, 9, 4, 6, 11, 12, 5, 3, 7, 8, 2, 10],
            //     [5, 2, 4, 11, 6, 10, 12, 3, 7, 1, 8, 9],
            //     [10, 2, 4, 5, 6, 7, 12, 3, 1, 11, 8, 9],
            //     [1, 2, 4, 5, 6, 10, 12, 3, 7, 11, 8, 9],
            //     [1, 2, 4, 5, 6, 10, 12, 3, 7, 11, 8, 9],
            // ]
            this.$nextTick(() => {
                for(let i = 0; i < circleScrollArr.length; i ++) {
                    let circleScroll = circleScrollArr[i];
                    let circleScrollItem = this.$refs[`circle-scroll-${i}-item`];
                    let r = circleScroll.clientWidth / 2;
                    let length = this.category.filter(item => item.level === i+1).length;
                    let otherLength = (length < 24 ? 24 : length)
                    let deg = 360 / otherLength;
                    let arr = []

                    // 头像展示位置随机数
                    for(let i = 0; i < otherLength; i ++) {
                        // t 是弧度
                        let t = Math.PI / 180 * (deg * i);
                        let x = Math.sin(t) * r;
                        let y = -Math.cos(t) * r;
                        arr.push({x,y})
                    }
                    // 防止重复
                    // let numberObj = {}
                    for(let n = 0; n < length; n ++) {
                        // let number = Math.floor(Math.random() * 12)
                        // let number = exampleNumber[i][n]
                        let number = circleScrollItem[n].getAttribute('data-pos');
                        // if(numberObj[number]) {
                        //     n --;
                        // } else {
                        //     numberObj[number] = true;
                        // console.log(number);
                        //     console.log(arr);
                        let {x,y} = arr[number];
                        circleScrollItem[n].style.transform = `translate(${x - circleScrollItem[n].clientWidth / 2}px, ${y - circleScrollItem[n].clientHeight / 2}px)`
                        // }
                    }
                }
            })
        },
        selectItem (item) {
            if(this.selected.czrkgmsfhm_md5 === item.czrkgmsfhm_md5) {
                this.selected = {};
            } else {
                this.selected = item;
            }
            this.$emit('select', item)
        }
    }
}
</script>

<style lang="scss" scoped>

//.xkd(@n, @i: 0) when (@i =< @n) {
//    .circle-scroll-@{i} {
//        width: 300px + (@i * 220);
//        height: 300px + (@i * 220);
//        z-index: 20 - @i * 1;
//    }
//    .xkd(@n, (@i + 1));
//}
//.xkd(6);


@for $i from 0 through 6{
    .circle-scroll-#{$i} {
        width: 300px + ($i * 220);
        height: 300px + ($i * 220);
        z-index: 20 - $i * 1;
    }
}

.wrapper {
    position: relative;
    width: 1440px;
    height: 1440px;

    img {
        width: 1440px;
    }
}
.circle-scroll-wrapper {
    position: relative;
    width: inherit;
    height: inherit;
}
.circle-scroll {
    border-radius: 100%;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    border: 1px solid #ccc;

    &__item {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);

        .item {
            margin-right: 0;
            margin-bottom: 0;
            cursor: pointer;

            &.selected {
                .item-circle {
                    position: relative;
                }

                .item-circle:before {
                    content: "";
                    width: 70px;
                    height: 70px;
                    //background: url("../../../assets/images/screen/relation/icon-selected.png") no-repeat 0 0;
                    background-size: 70px 70px;
                    position: absolute;
                    left: -3px;
                    top: -3px;
                    animation: ani infinite linear 3s;
                }
            }

            &-circle {
                width: 64px;
                height: 64px;
                border-radius: 100%;
                background: #ccc;

                &-0 {
                    //background: url("../../../assets/images/screen/relation/icon-0.png") no-repeat 0 0;
                    background-size: 64px 64px;
                }

                &-1 {
                    //background: url("../../../assets/images/screen/relation/icon-1.png") no-repeat 0 0;
                    background-size: 64px 64px;
                }

                &-2 {
                    //background: url("../../../assets/images/screen/relation/icon-2.png") no-repeat 0 0;
                    background-size: 64px 64px;
                }
                /*** 黄色 亲戚 3 ***/
                &-3 {
                    //background: url("../../../assets/images/screen/relation/icon-3.png") no-repeat 0 0;
                    background-size: 64px 64px;
                }
                /*** 紫色 同学 4 ***/
                &-4 {
                    //background: url("../../../assets/images/screen/relation/icon-4.png") no-repeat 0 0;
                    background-size: 64px 64px;
                }
                /*** 红色 同事 5 ***/
                &-5 {
                    //background: url("../../../assets/images/screen/relation/icon-5.png") no-repeat 0 0;
                    background-size: 64px 64px;
                }
            }

            &-name {
                text-align: center;
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: #FFFFFF;
                line-height: 14px;
                margin-top: 5px;
                position: absolute;
                bottom: -20px;
                left: 0;
                right: 0;
            }
        }
    }
}

.user {
    margin-right: 0;
    margin-bottom: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 500;
    cursor: pointer;
    background: #fff;
    border-radius: 100%;

    &.selected {
        .user-circle {
            position: relative;
        }

        .user-circle:before {
            content: "";
            width: 70px;
            height: 70px;
            //background: url("../../../assets/images/screen/relation/icon-selected.png") no-repeat 0 0;
            background-size: 70px 70px;
            position: absolute;
            left: -3px;
            top: -3px;
            animation: ani infinite linear 3s;
        }
    }

    &-circle {
        width: 64px;
        height: 64px;
        border-radius: 100%;
        //background: url("../../../assets/images/screen/relation/icon-0.png") no-repeat 0 0;
        background-size: 64px 64px;
    }

    &-name {
        text-align: center;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #FFFFFF;
        line-height: 14px;
        margin-top: 5px;
        position: absolute;
        bottom: -20px;
        left: 0;
        right: 0;
    }
}

@keyframes ani {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
