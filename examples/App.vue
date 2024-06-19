<template>
    <div id="app">
        <div class="app-wrapper">
            <div class="category">
                <div class="category-sub"
                     v-for="(item, index) in categoryList"
                     :key="index"
                     :class="{active: String(currentCategory) === `${index}`}"
                     @click="toggleHandler(`${index}`, item)"
                >
                    <div class="category-sub__title">{{ item.label }}</div>
                    <div class="category-title"
                         v-for="(sub, subIndex) in item.child"
                         :key="subIndex"
                         :class="{active: currentCategory === `${index}-${subIndex}`}"
                         @click.stop="toggleHandler(`${index}-${subIndex}`, item)"
                    >
                        {{ sub.label }}
                    </div>
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
import ExampleAnimate from './components/animate'
import ExampleElm from './components/elElement'
import ExampleTable from './components/tableEl.vue'
import ExampleMind from './components/mind.vue'
import ExampleFontTitle from './components/fontTitle.vue'

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
        ExampleVerify,
        ExampleAnimate,
        ExampleElm,
        ExampleTable,
        ExampleFontTitle,
        ExampleMind,
    },
    data() {
        return {
            currentComponent: 'basic',
            currentCategory: 1,
            categoryList: [
                {label: '条目', value: 'Basic'},
                {label: '进度条 - progress', value: 'ExampleProgress'},
                {label: '推荐度', value: 'ExampleScore'},
                {label: '选择框 - select', value: 'ExampleSelect'},
                {label: '翻牌', value: 'ExampleFlip'},
                {label: '圆形滚动', value: 'ExampleScroll'},
                {
                    label: '特效',
                    value: 'ExampleTextRain',
                    child: [
                        {
                            label: '文字雨特效',
                            value: 'ExampleTextRain'
                        },
                    ]
                },
                {label: '步骤', value: 'ExampleStep'},
                {label: '自定义五角星', value: 'ExampleShape'},
                {label: '瀑布流', value: 'ExampleWaterfall'},
                {label: '关系图', value: 'ExampleRelation'},
                {label: '验证码输入框', value: 'ExampleVerify'},
                {label: '图片对比', value: 'ExampleCompare'},
                {label: '动画', value: 'ExampleAnimate'},
                {label: 'elementUI', value: 'ExampleElm'},
                {label: '表格', value: 'ExampleTable'},
                {label: '字体渐变', value: 'ExampleFontTitle'},
                {label: '思维导图', value: 'ExampleMind'},
            ],
        }
    },
    mounted() {
        console.log(this.getUrlParams())
        this.currentCategory = this.getUrlParams().cur
        if(this.currentCategory.indexOf('-') !== -1) {
            let [a, b] = this.currentCategory.split('-')
            this.currentComponent = this.categoryList[a].child[b].value
        } else {
            this.currentComponent = this.categoryList[this.currentCategory].value
        }
    },
    methods: {
        getUrlParams:function(){
            var args=new Object();
            var query=location.search.substring(1);//获取查询串
            var pairs=query.split("&");//在逗号处断开
            for(var i=0;i<pairs.length;i++)
            {
                var pos=pairs[i].indexOf('=');//查找name=value
                if(pos==-1) continue;//如果没有找到就跳过
                var argname=pairs[i].substring(0,pos);//提取name
                var value=pairs[i].substring(pos+1);//提取value
                args[argname]=unescape(value);//存为属性
            }
            return args;
        },
        toggleHandler(index, {value}) {
            this.currentCategory = index;
            this.currentComponent = value;
            history.replaceState('', '',`${window.location.origin}?cur=${this.currentCategory}`)
        },
    }
}
</script>

<style lang="scss">

:root {
    --theme-bg-color: rgba(16 18 27 / 40%);
    --theme-color: #f9fafb;
    --border-color: rgba(113 119 144 / 25%);
    --inactive-color: rgb(113 119 144 / 78%);
}

* {
    padding: 0;
    margin: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    min-height: 100vh;
    background-image: url("./assets/images/macos-big-sur-1280x720-dark-wwdc-2020-22655.jpg");
    background-size: cover;
    background-attachment: fixed;
    padding: 20px;
}

.app-wrapper {
    background: var(--theme-bg-color);
    backdrop-filter: blur(20px);
    border-radius: 14px;
    display: flex;

    .category {
        width: 220px;
        padding: 15px 0;
        overflow-y: auto;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        border-right: 1px solid var(--border-color);

        &-instance {
            margin: 20px;
            min-width: calc(100vw - 300px);
        }

        &-sub {
            &__title {
                font-size: 14px;
                line-height: 45px;
                cursor: pointer;
                color: var(--inactive-color);
                transition: background, font-size .3s;
                text-align: left;
                text-indent: 50px;
            }

            &:hover, &.active {


                .category-sub__title {
                    font-weight: bold;
                    font-size: 16px;
                    color: var(--theme-color);
                }
            }
        }

        &-title {
            font-size: 16px;
            height: 40px;
            line-height: 40px;
            cursor: pointer;
            transition: background, font-size .3s;
            text-align: left;
            text-indent: 50px;
            color: var(--theme-color);

            &:hover, &.active {
                background: rgba(16, 18, 27, 0.4);
                font-weight: bold;
                font-size: 16px;
                box-shadow: 1px 0 5px rgba(255, 255, 255, 0.2) inset;
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
    padding: 30px;

    &.flex {
        display: flex;
        flex-wrap: wrap;
    }
}

.example-title {
    font-size: 40px;
    padding-top: 40px;
    font-weight: bold;
    color: var(--theme-color);

    span {
        font-size: 14px;
        margin-left: 20px;
    }
}

.example-component__item {
    //background: #fff; display: flex; flex-wrap: wrap;
}

.example-component__card {
    transition: all .3s;
    border-radius: 4px;
    background: #F1F8FF;
    padding: 20px;
    min-width: 20%;
    margin: 0 10px 10px 0;

    .item {
        margin-bottom: 15px;
    }
}

.example-component__card .example-component__card__title {
    font-size: 14px;
    margin-bottom: 20px;
}

.example-component__title {
    font-size: 28px;
    font-weight: bold;
    line-height: 1.2;
    margin-bottom: 20px;
}

.example-component__card:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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
