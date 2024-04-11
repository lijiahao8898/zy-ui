<template>
    <div class="category-instance__example">
        <!-- 翻牌效果 -->
        <div class="example-component">
            <div class="example-component__item">
                <zy-flip></zy-flip>
            </div>
        </div>

        <!-- 翻牌效果 - 滑动 -->
        <div class="example-component">
            <div class="example-component__item">
                <zy-count-up-slide :number="countUpSlideNumber"></zy-count-up-slide>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            countUpSlideNumber: 0,
        }
    },
    mounted() {
        setTimeout(() => {
            this.countUpSlideNumber = 1990.999;
        }, 2000)
    }
}
</script>