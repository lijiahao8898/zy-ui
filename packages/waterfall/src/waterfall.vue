<template>
    <div class="waterfall" ref="waterfall">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'zy-waterfall',
    props: ['len', 'commonWidth'],
    components: {},
    data() {
        return {
            // commonWidth: 440,
        }
    },
    methods: {
        cal() {
            const containerWidth = this.$refs.waterfall.clientWidth; // 容器的宽度
            // 计算列的数量
            const columns = Math.floor(containerWidth / this.commonWidth);
            // 计算间隙
            // 间隙数量
            const spaceNumber = columns - 1;
            const leftSpace = containerWidth - columns * this.commonWidth; // 计算剩余的空间
            const space = leftSpace / spaceNumber;
            console.log(space, columns)
            return {
                space,
                columns
            }
        },
        setPosition(waterfallItem) {
            console.log('cal', this.commonWidth)
            const info = this.cal();
            const nextTops = new Array(info.columns);
            nextTops.fill(0);
            for (let i = 0; i < this.len; i++) {
                const div = waterfallItem[i];
                const minTop = Math.min.apply(null, nextTops);
                div.style.top = minTop + 'px';
                const index = nextTops.indexOf(minTop);
                console.log(div);
                nextTops[index] += div.getBoundingClientRect().height + info.space;
                const left = index * info.space + index * this.commonWidth;
                div.style.left = left + 'px';
            }
            const max = Math.max.apply(null, nextTops);
            this.$refs.waterfall.style.height = max + 'px';
        },
    }
}
</script>

<style lang="scss" scoped>
.waterfall {
    width: 100%;
    position: relative;

    &-item {
        position: absolute;
        transition: .3s;
    }
}
</style>
