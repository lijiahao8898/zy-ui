<template>
    <div class="wrapper">
        <div class="circle-scroll" ref="circleScroll">
            <div class="circle-scroll-wrapper">
                <div class="circle-scroll__item"
                     v-for="(item) in length"
                     :ref="'circleScrollItem'"
                     :key="item"
                >
                    <div class="item"></div>
                </div>
            </div>
        </div>
        <div class="circle-scroll2" ref="circleScrol2">
            <div class="circle-scroll-wrapper">
                <div class="circle-scroll__item"
                     v-for="(item) in length"
                     :ref="'circleScrollIte2'"
                     :key="item"
                >
                    <div class="item"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'zy-circle-scroll',
    data () {
        return {
            length: 3
        }
    },
    mounted() {
        this.$nextTick(() => {
            let circleScroll = this.$refs.circleScroll;
            let circleScrollItem = this.$refs.circleScrollItem;
            let r = circleScroll.clientWidth / 2;
            let deg = 360 / this.length;

            for(let i = 0; i < this.length; i ++) {
                // t 是弧度
                let t = Math.PI / 180 * (deg * i);
                let x = Math.sin(t) * r;
                let y = -Math.cos(t) * r;
                circleScrollItem[i].style.transform = `translate(${x - circleScrollItem[i].clientWidth / 2}px, ${y - circleScrollItem[i].clientHeight / 2}px)`
            }

            let circleScroll2 = this.$refs.circleScrol2;
            let circleScrollItem2 = this.$refs.circleScrollIte2;
            let r2 = circleScroll2.clientWidth / 2;
            let deg2 = 360 / this.length;

            for(let i = 0; i < this.length; i ++) {
                // t 是弧度
                let t = Math.PI / 180 * (deg2 * i);
                let x = Math.sin(t) * r2;
                let y = -Math.cos(t) * r2;
                circleScrollItem2[i].style.transform = `translate(${x - circleScrollItem[i].clientWidth / 2}px, ${y - circleScrollItem[i].clientHeight / 2}px)`
            }
        })
    }
}
</script>

<style lang="scss" scoped>

.wrapper {
    position: relative;
    width: 1000px;
    height: 1000px;
}
.circle-scroll-wrapper {
    position: relative;
    width: inherit;
    height: inherit;
    animation: rotateAni linear infinite 20s;
    &:hover {
        animation-play-state: paused;
    }
}
.circle-scroll {
    width: 250px;
    height: 250px;
    border-radius: 100%;
    border: 1px solid #000;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);

    &:hover {
        animation-play-state: paused;
    }

    &__item {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);

        .item {
            width: 60px;
            height: 60px;
            border-radius: 100%;
            margin-right: 0;
            margin-bottom: 0;
            background: #ccc;
            animation: rotateAni linear infinite reverse 20s;
        }
    }
}

.circle-scroll2 {
    width: 500px;
    height: 500px;
    border-radius: 100%;
    border: 1px solid #000;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    //animation: rotateAni linear infinite 20s;

    &:hover {
        animation-play-state: paused;
    }

    &__item {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);

        .item {
            width: 60px;
            height: 60px;
            border-radius: 100%;
            margin-right: 0;
            margin-bottom: 0;
            background: #ccc;
            animation: rotateAni linear infinite reverse 20s;
        }
    }
}

@keyframes rotateAni {
    to {
        transform: rotate(360deg);
    }
}
</style>
