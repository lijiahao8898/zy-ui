<template>
    <div class="progress">
        <div class="progress-wrapper" :style="{width: isText ? '60%' : '100%'}">
            <div class="progress-empty"></div>
            <div class="progress-value"
                 :style="{width: percent + '%', background: color}">
            </div>
        </div>
        <p class="progress-text" v-if="isText">{{ progress }}</p>
    </div>
</template>

<script>
export default {
    name: 'zy-progress',
    props: {
        // 进度条的数值
        progress: {
            type: [String, Number],
            default: 0
        },
        // 进度条的总数
        total: {
            type: [String, Number],
            default: 0
        },
        // 进度条的颜色
        color: {
            type: String,
            default: '#2D93FB'
        },
        // 进度条文字的颜色
        textColor: {
            type: String,
            default: '#000'
        },
        // 进度条是否显示文字
        isText: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        percent() {
            if (this.progress > this.total) {
                return 100
            } else {
                return (this.progress / this.total) * 100
            }
        }
    },
    data() {
        return {}
    }
}
</script>

<style type="text/scss" lang="scss" scoped>
.progress {
    overflow: hidden;

    &-wrapper {
        position: relative;
        height: 16px;
        float: left;
    }

    &-empty {
        width: 100%;
        height: inherit;
        border-radius: 8px;
        background: #ECEDF6;
        position: absolute;
        left: 0;
        right: 0;
    }

    &-value {
        height: inherit;
        border-radius: 8px;
        position: absolute;
        left: 0;
        right: 0;
        transition: all .3s;
    }

    &-text {
        height: inherit;
        line-height: 16px;
        float: right;
        width: 35%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0;
        font-size: 14px;
    }
}
</style>
