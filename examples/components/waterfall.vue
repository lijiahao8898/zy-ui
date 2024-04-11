<template>
    <!-- 瀑布流 -->
    <div class="category-instance__example">
        <div class="example-component">
            <div class="example-component__item" style="position: relative;width: calc(100vw - 480px);">
                <zy-waterfall ref="waterfallInstance" :len="waterfallList.length" :commonWidth="waterfallItemWidth">
                    <template v-for="(item, index) in waterfallList">
                        <div class="waterfall-item" ref="waterfallItem" :key="index">
                            <div class="waterfall-example-div" :style="{height: 50 + Math.floor(Math.random() * 200) + 'px'}">{{item.label}}</div>
                        </div>
                    </template>
                </zy-waterfall>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            waterfallItemWidth: 200,
            waterfallList: [
                {label: 1},
                {label: 2},
                {label: 3},
                {label: 4},
                {label: 5},
                {label: 6},
                {label: 7},
                {label: 8},
                {label: 9},
                {label: 10},
            ],
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.waterfallInstance.setPosition(this.$refs.waterfallItem);
        })
    }
}
</script>