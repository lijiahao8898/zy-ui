<template>
    <div class="mind" :id="`zyMind${random}`">
        <div class="mind-item"
             @mousedown="(e) => onMouseDown(e, item, index)"
             :class="[`mind-item-${item.id}-${random}`]" v-for="(item, index) in dataSource" :key="index"
             :style="getStyle(item)">
            {{ item.label }}
        </div>
        <canvas :id="`mindCanvas-${random}`" class="mind-canvas"></canvas>
    </div>
</template>

<script>
export default {
    name: 'zy-mind',
    props: {
        isDraggable:{
            default: true
        },
        dataSource: {
            default: [
                {label: '中国石油化工集团有限公司浙江分公司', id: 1, x: 20, y: 200},
                {label: '子公司', id: 2, x: 200, y: 200, empty: true},
                {label: '中国石油化工集团有限公司', id: 3, x: 300, y: 200},
                {label: '法定代表人', id: 4, x: 500, y: 200, empty: true},
                {label: '江某某', id: 5, x: 690, y: 100},
                {label: '张某某', id: 6, x: 690, y: 300},
                {label: 'xxxx公司', id: 7, x: 900, y: 100},
                {label: '投资', id: 8, x: 800, y: 100, empty: true},
                {label: '配偶', id: 9, x: 670, y: 220, empty: true, autoHeight: true},
                {label: '法定代表人配偶', id: 10, x: 480, y: 280, empty: true, autoHeight: true},
            ]
        },
        dataLinks: {
            default: [
                {
                    source: 2,
                    target: 1
                },
                {
                    source: 2,
                    target: 3
                },
                {
                    source: 4,
                    target: 3
                },
                {
                    source: 4,
                    target: 5,
                    lineStyle: 'round'
                },
                {
                    source: 4,
                    target: 6,
                    color: '#ccc',
                    width: 2,
                    lineStyle: 'round'
                },
                {
                    source: 5,
                    target: 6,
                    width: 2,
                    color: '#ccc'
                },
                {
                    source: 8,
                    target: 7
                },
                {
                    source: 8,
                    target: 5
                }
            ]
        }
    },
    data() {
        return {
            isDown: false,
            random: (Math.random() * 10000000000).toFixed(0)
        }
    },
    mounted() {
        this.draw()
    },
    methods: {
        draw () {
            this.$nextTick(() => {
                const random = this.random
                const canvas = document.getElementById(`mindCanvas-${random}`)
                const ctx = canvas.getContext('2d')
                // ------------ 解决canvas画布模糊的问题 -------------
                const dpr = 3
                const mind = document.getElementById(`zyMind${random}`)
                const oldWidth = mind.offsetWidth
                const oldHeight = mind.offsetHeight
                canvas.width = Math.round(oldWidth * dpr)
                canvas.height = Math.round(oldHeight * dpr)
                canvas.style.width = oldWidth + 'px'
                canvas.style.height = oldHeight + 'px'
                ctx.scale(dpr, dpr)
                // ------------ 解决canvas滑膜模糊的问题 -------------
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                for (let i = 0; i < this.dataLinks.length; i++) {
                    let item = this.dataLinks[i];
                    let start = document.getElementsByClassName(`mind-item-${item.source}-${random}`)[0]
                    let end = document.getElementsByClassName(`mind-item-${item.target}-${random}`)[0]
                    let fromLeft = start.offsetLeft
                    let fromTop = start.offsetTop
                    let fromWidth = start.offsetWidth
                    let fromHeight = start.offsetHeight
                    let toLeft = end.offsetLeft
                    let toTop = end.offsetTop
                    let toWidth = end.offsetWidth
                    let toHeight = end.offsetHeight

                    if (toLeft > fromLeft) {
                        // 第一种 to 在 from 的右下角
                        let fromX = fromLeft + fromWidth
                        let fromY = fromTop + fromHeight / 2
                        let toX = toLeft
                        let toY = toTop + toHeight / 2
                        if(item.lineStyle === 'round') {
                            ctx.beginPath();
                            ctx.moveTo(fromX, fromY)
                            fromX = fromX + 10
                            ctx.lineTo(fromX, fromY)
                            ctx.lineTo(fromX, toY)
                            ctx.strokeStyle = item.color || 'red';
                            ctx.lineWidth = item.width || 1;
                            ctx.stroke();
                            fromY = toY
                        }
                        this.drawArrow(ctx, fromX, fromY, toX, toY, item.width || 1, item.color || 'red')
                    } else if (toLeft < fromLeft) {
                        // 第二种 to 在 from 的左上角
                        let fromX = fromLeft
                        let fromY = fromTop + fromHeight / 2
                        let toX = toLeft + toWidth
                        let toY = toTop + toHeight / 2
                        this.drawArrow(ctx, fromX, fromY, toX, toY, item.width || 1, item.color || 'red')
                    } else if (toLeft === fromLeft) {
                        let fromX = fromLeft + fromWidth/2
                        let fromY = fromTop + fromHeight
                        let toX = toLeft + toWidth/2
                        let toY = toTop
                        this.drawArrow(ctx, fromX, fromY, toX, toY, item.width || 1, item.color || 'red')
                    }
                }
                ctx.stroke()
            })
        },
        /**
         * 绘制箭头
         * @param ctx Canvas绘图环境
         * @param fromX 起点坐标（也可以换成p1，只不过它是一个数组）
         * @param fromY 起点坐标
         * @param toX 终点坐标 (也可以换成p2，只不过它是一个数组)
         * @param toY 终点坐标
         * @param width 箭头线宽度
         * @param color 箭头颜色
         *   * @param theta 三角斜边一直线夹角
         * @param headlen 三角斜边长度
         */
        drawArrow(ctx, fromX, fromY, toX, toY, width = 1, color = 'red', theta = 30, headlen = 10) {
            let angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI;
            let angle1 = (angle + theta) * Math.PI / 180;
            let angle2 = (angle - theta) * Math.PI / 180;
            let topX = headlen * Math.cos(angle1);
            let topY = headlen * Math.sin(angle1);
            let botX = headlen * Math.cos(angle2);
            let botY = headlen * Math.sin(angle2);
            ctx.save();
            ctx.beginPath();
            let arrowX = fromX - topX;
            let arrowY = fromY - topY;
            ctx.moveTo(arrowX, arrowY);
            ctx.moveTo(fromX, fromY);
            ctx.lineTo(toX, toY);
            arrowX = toX + topX;
            arrowY = toY + topY;
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(toX, toY);
            arrowX = toX + botX;
            arrowY = toY + botY;
            ctx.lineTo(arrowX, arrowY);
            ctx.strokeStyle = color;
            ctx.lineWidth = width;
            ctx.stroke();
            ctx.restore();
        },
        getStyle(item) {
            let style = {
                left: `${item.x}px`,
                top: `${item.y}px`
            }
            if (item.empty) {
                style.background = 'transparent'
                style.boxShadow = 'unset'
                style.padding = '0 15px'
            }
            if(item.autoHeight) {
                style.height = 'unset'
            }
            return style
        },
        onMouseDown (event, item, index) {
            if(!this.isDraggable) return
            this.isDown = true
            const random = this.random
            let dom = document.getElementById(`zyMind${random}`)
            let target = document.getElementsByClassName(`mind-item-${item.id}-${random}`)[0]
            let width = dom.offsetWidth
            let height = dom.offsetHeight
            let x = event.target.offsetLeft;
            let y = event.target.offsetTop;
            var disX = event.clientX - event.target.offsetLeft
            var disY = event.clientY - event.target.offsetTop
            let maxX = width - target.offsetWidth
            let maxY = height - target.offsetHeight
            document.onmousemove = (event) => {
                if(this.isDown == false) {
                    return;
                }
                x = event.clientX - disX;
                y = event.clientY - disY
                if(x >= maxX) {
                    x = maxX
                } else if (x <= 0) {
                    x = 0
                }
                if(y >= maxY) {
                    y = maxY
                } else if (y <= 0) {
                    y = 0
                }

                this.$emit('move', {x, y, index})
            }
            document.onmouseup = () => {
                this.isDown = false;
                console.log('onmouseup')
                document.onmousemove = document.onmouseup = null
                this.draw()
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.mind {
    background: #f0f0f0;
    height: 50vh;
    width: 100%;
    position: relative;
    user-select: none;
    background: url("./images/bg.png") repeat 0 0;
    background-size: 5px 5px;

    .mind-item {
        background: #fff;
        max-width: 140px;
        height: 60px;
        padding: 15px;
        border-radius: 4px;
        position: absolute;
        z-index: 20;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        transition: all .3s;
        box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.1);
        cursor: pointer;
    }

    .mind-canvas {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 10;
    }
}
</style>