<template>
    <div ref="textRainWrapper" style="width: 100%;">
        <canvas id="textRainCanvas"></canvas>
    </div>
</template>

<script>
export default {
    name: 'zy-text-rain',
    data () {
        return {}
    },
    mounted() {
        this.$nextTick(() => {
            const canvas = document.getElementById('textRainCanvas');
            const width = this.$refs.textRainWrapper.offsetWidth;
            const height = 200;
            const ctx = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;
            // 列宽
            const columnWidth = 20;
            // 列数
            const columnCount = Math.floor(width / columnWidth)
            // 记录每列写到了第几个文字 初始[1,1,1,1....]
            const columnNextIndexes = new Array(columnCount);
            // columnNextIndexes.fill(Math.floor(height / 20) + 2)
            columnNextIndexes.fill(1)
            console.log(columnNextIndexes)

            let timer = setInterval(() => {
                this.draw(ctx, columnCount, columnWidth, columnNextIndexes, width, height);
                console.log(1);
            }, 40)

            this.$once('hook:beforeDestroy',()=>{
                clearTimeout(timer)
                timer = null
            })
        })
    },
    methods: {
        draw(ctx, columnCount, columnWidth, columnNextIndexes, w, h) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1'
            ctx.fillRect(0, 0, w, h)
            let fz = 20;
            ctx.fillStyle = this.getRandomColor();
            ctx.font = `${fz}px "Roboto Mono"`
            for (let i = 0; i < columnCount; i++) {
                let x = columnWidth * i
                let y = fz * columnNextIndexes[i]
                ctx.fillText(this.getRandomChar(), x, y)
                if (y > h && Math.random() > 0.99) {
                    // ctx.clearRect(x, 0, 20, y)
                    columnNextIndexes[i] = 0;
                } else {
                    // ctx.clearRect(x, y - 400, 20, 20)
                    columnNextIndexes[i]++;
                }
            }
        },
        getRandomColor() {
            let opacity = 1
            const fontColor = [
                `rgba(51, 181, 229, ${opacity})`,
                `rgba(0, 153, 204, ${opacity})`,
                `rgba(170, 102, 204, ${opacity})`,
                `rgba(153, 51, 204, ${opacity})`,
                `rgba(153, 204, 0, ${opacity})`,
                `rgba(102, 153, 0, ${opacity})`,
                `rgba(255, 187, 51, ${opacity})`,
                `rgba(255, 136, 0, ${opacity})`,
                `rgba(255, 68, 68, ${opacity})`,
                `rgba(204, 0, 0, ${opacity})`,
            ]
            return fontColor[Math.floor(Math.random() * 10)]
        },
        getRandomChar() {
            const str = "Data security management system";
            return str[Math.floor(Math.random() * str.length)]
        },
    }
}
</script>
