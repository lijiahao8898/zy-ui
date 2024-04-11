<template>
    <div class="image-compare"
         :style="{
            width: width + 'px',
            height: height + 'px'
         }"
    >
        <div class="image-compare__before"
             :style="{
                width: x + 'px'
             }"
             @click.stop="goLeft"
        >
            <div
                :style="{
                    width: width + 'px',
                    height: height + 'px'
                }"
            >
                <img src="./images/comapre.jpg" alt="">
            </div>
        </div>
        <div class="image-compare__after" @click="goRight">
            <div
                :style="{
                    width: width + 'px',
                    height: height + 'px'
                }"
            >
                <img src="./images/5.jpg" alt="">
            </div>
        </div>
        <div class="divider-bar" :style="{left: x + 'px'}" @mousedown.prevent="onMouseDown()"></div>
    </div>
</template>

<script>
export default {
    name: 'zy-image-compare',
    data() {
        return {
            width: '1100',
            height: '600',
            isDown: false,     // 鼠标是否按住
            moveX: 0,          // 鼠标移动的位置
            x: this.width / 2, // 设置位置
        }
    },
    methods: {
        onMouseDown () {
            this.isDown = true
            this.x = event.target.offsetLeft;
            var disX = event.clientX - event.target.offsetLeft
            document.onmousemove = (event) => {
                console.log(event)
                console.log(this.isDown)
                if(this.isDown == false) {
                    return;
                }
                this.x = event.clientX - disX;
                console.log(this.x)
                if(this.x >= this.width) {
                    this.x = this.width
                } else if (this.x <= 0) {
                    this.x = 0
                }
            }
            document.onmouseup = () => {
                this.isDown = false;
                document.onmousemove = document.onmouseup = null
                return false
            }
        },
        goLeft () {
            this.x = 0
        },
        goRight () {
            this.x = this.width
        }
    }
}
</script>

<style lang="scss" scoped>
.image-compare {
    position: relative;
    display: inline-block;
    margin: 0 auto;
    min-height: 273px;
    margin-bottom: 40px;
    overflow: hidden;

    .image-compare__before {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 50%;
        overflow: hidden;
    }

    .image-compare__after {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
    }

    img {
        width: 100%;
        height: 100%;
    }

    .divider-bar {
        cursor: move;
        position: absolute;
        width: 1px;
        left: 50%;
        top: 0;
        background: white;
        height: 100%;
        display: block;
        z-index: 2;
        box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.4);
        &::after {
            content: '<|>';
            position: absolute;
            color: #ccc;
            text-align: center;
            line-height: 18px;
            width: 40px;
            height: 20px;
            background: #fff;
            border-radius: 10px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}
</style>