<template>
    <div class="circle-scroll" ref="circleScroll">
        <div class="circle-scroll__item"
             v-for="(item) in length"
             :ref="'circleScrollItem'"
             :key="item"
        >
            <div class="item"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'zy-circle-scroll',
    data () {
        return {
            length: 6
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
        })
    }
}
</script>

<style lang="scss" scoped>
.circle-scroll {
    width: 250px;
    height: 250px;
    border-radius: 100%;
    border: 1px solid #000;
    position: relative;
    animation: rotateAni linear infinite 20s;

    &__item {
        position: absolute;
        top: 50%;
        left: 50%;

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
