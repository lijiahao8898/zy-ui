<template>
    <div id="app">
        <div class="app-wrapper">
            <div class="category">
                <div class="category-title"
                     v-for="(item, index) in categoryList"
                     :key="index"
                     :class="{active: currentCategory === index}"
                     @click="toggleHandler(index, item)"
                >{{ item.label }}
                </div>
            </div>
            <div class="category-instance">
                <component :is="currentComponent"></component>
            </div>
        </div>

        <!--        &lt;!&ndash;        <el-button>1</el-button>&ndash;&gt;-->
    </div>
</template>

<script>
import Basic from './components/basic'
import ExampleProgress from './components/progress'
import ExampleScore from './components/score'
import ExampleSelect from './components/select'
import ExampleFlip from './components/flip'
import ExampleScroll from './components/scroll'
import ExampleTextRain from './components/textRain'
import ExampleStep from './components/step'
import ExampleShape from './components/shape'
import ExampleCompare from './components/compare'
import ExampleRelation from './components/relation'
import ExampleVerify from './components/verify'
import ExampleWaterfall from './components/waterfall'

export default {
    name: 'App',
    components: {
        Basic,
        ExampleProgress,
        ExampleSelect,
        ExampleScore,
        ExampleFlip,
        ExampleScroll,
        ExampleTextRain,
        ExampleStep,
        ExampleCompare,
        ExampleShape,
        ExampleWaterfall,
        ExampleRelation,
        ExampleVerify
    },
    data() {
        return {
            currentComponent: 'basic',
            currentCategory: 1,
            categoryList: [
                {label: '条目', value: 'Basic'},
                {label: '进度条', value: 'ExampleProgress'},
                {label: '推荐度', value: 'ExampleScore'},
                {label: '选择保险公司', value: 'ExampleSelect'},
                {label: '翻牌', value: 'ExampleFlip'},
                {label: '圆形滚动', value: 'ExampleScroll'},
                {label: '文字雨特效', value: 'ExampleTextRain'},
                {label: '步骤', value: 'ExampleStep'},
                {label: '自定义五角星', value: 'ExampleShape'},
                {label: '瀑布流', value: 'ExampleWaterfall'},
                {label: '关系图', value: 'ExampleRelation'},
                {label: '验证码输入框', value: 'ExampleVerify'},
                {label: '图片对比', value: 'ExampleCompare'},
            ],
        }
    },
    methods: {
        toggleHandler(index, {value}) {
            this.currentCategory = index;
            this.currentComponent = value;
        },
    }
}
</script>

<style lang="scss">
* {
    padding: 0;
    margin: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;
    background: #f8f8f8;
}

.app-wrapper {
    display: flex;

    .category {
        width: 220px;
        background: #fff;
        padding: 15px 0;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

        &-instance {
            background: #fff;
            margin: 20px;
            min-width: calc(100vw - 260px);
        }

        &-title {
            font-size: 16px;
            height: 45px;
            line-height: 45px;
            border-bottom: 1px solid #f8f8f8;
            cursor: pointer;
            transition: background, font-size .3s;

            &:hover,&.active {
                background: #f8f8f8;
                font-weight: bold;
                letter-spacing: 1px;
                font-size: 18px;
                box-shadow: 1px 0 5px rgba(0, 0, 0, 0.1) inset;
            }
        }
    }
}

.example {
    margin: 20px 0;
    width: 50%;
}

.example.gary {
    background: #ddd;
}

.example-component {
    border-radius: 4px;
    padding: 40px;
}

.example-component__item {
    //background: #fff; display: flex; flex-wrap: wrap;
}

.example-component__item .item {
    margin-right: 20px;
    margin-bottom: 10px;
}

.star {
    position: relative;
    margin: 20px auto;
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent transparent red transparent;
    border-width: 70px 100px;
    transform: rotate(35deg);
}

.star::before {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    top: -128px;
    left: -95px;
    border-style: solid;
    border-color: transparent transparent red transparent;
    border-width: 80px 30px;
    transform: rotate(-35deg);
}

.star::after {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    top: -45px;
    left: -140px;
    border-style: solid;
    border-color: transparent transparent red transparent;
    border-width: 70px 100px;
    transform: rotate(-70deg);
}

.waterfall-item {
    transition: .3s;
}

.waterfall-example-div {
    width: 200px;
    background: #ccc;
    font-size: 28px;
    color: #000;
    font-weight: bold;
}
</style>
