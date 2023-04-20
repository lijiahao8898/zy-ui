<template>
    <div id="app">
        <div class="app-wrapper">
            <div class="category">
                <div class="category-title"
                     v-for="(item, index) in categoryList"
                     :key="index"
                     :class="{active: currentCategory === index}"
                     @click="toggleHandler(index, item.label)"
                >{{ item.label }}
                </div>
            </div>
            <div class="category-instance">
                <div class="category-instance__example" v-if="currentCategory === 0">
                    <div class="example-component">
                        <div class="example-component__item">
                            <zy-item label="标签">你好，世界！</zy-item>
                        </div>
                    </div>

                    <div class="example-component">
                        <div class="example-component__item">
                            <zy-button/>
                        </div>
                    </div>
                </div>

                <div class="category-instance__example" v-if="currentCategory === 1">
                    <div class="example-component">
                        <div class="example-component__item">

                            <div class="item" style="width: 200px;">
                                <zy-progress :progress="0" :total="300"></zy-progress>
                            </div>

                            <div class="item" style="width: 200px;">
                                <zy-progress :progress="20" :total="300"></zy-progress>
                            </div>

                            <div class="item" style="width: 200px;">
                                <zy-progress :progress="50" :total="300"></zy-progress>
                            </div>

                            <div class="item" style="width: 200px;">
                                <zy-progress :progress="100" :total="300"></zy-progress>
                            </div>
                        </div>
                    </div>

                    <!-- 饼状进度条 -->
                    <div class="example-component">
                        <div class="example-component__item">

                            <div class="item">
                                <zy-pie
                                    value="0"
                                    ring="0"
                                    isShowNumber="false"
                                    color="#FFA958"
                                    size="36">
                                </zy-pie>
                            </div>

                            <div class="item">
                                <zy-pie
                                    value="30"
                                    ring="0"
                                    isShowNumber="false"
                                    color="#FFA958"
                                    size="36">
                                </zy-pie>
                            </div>

                            <div class="item">
                                <zy-pie
                                    value="50"
                                    ring="0"
                                    isShowNumber="false"
                                    color="#FFA958"
                                    size="36">
                                </zy-pie>
                            </div>

                            <div class="item">
                                <zy-pie
                                    value="80"
                                    ring="0"
                                    isShowNumber="false"
                                    color="#FFA958"
                                    size="36">
                                </zy-pie>
                            </div>

                            <div class="item">
                                <zy-pie
                                    value="100"
                                    ring="0"
                                    isShowNumber="false"
                                    color="#FFA958"
                                    size="36">
                                </zy-pie>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="category-instance__example" v-if="currentCategory === 2">
                    <div class="example-component">

                        <div class="example-component__item">
                            <div class="item">
                                <zy-star-score :score="'1'"></zy-star-score>
                            </div>

                            <div class="item">
                                <zy-star-score :score="'2'"></zy-star-score>
                            </div>

                            <div class="item">
                                <zy-star-score :score="'3'"></zy-star-score>
                            </div>

                            <div class="item">
                                <zy-star-score :score="'4'"></zy-star-score>
                            </div>

                            <div class="item">
                                <zy-star-score :score="'5'"></zy-star-score>
                            </div>
                        </div>

                        <div class="example-component__item">
                            <div class="item">
                                <zy-star-score :score="'1'" :type="2"></zy-star-score>
                            </div>

                            <div class="item">
                                <zy-star-score :score="'2'" :type="2"></zy-star-score>
                            </div>

                            <div class="item">
                                <zy-star-score :score="'3'" :type="2"></zy-star-score>
                            </div>

                            <div class="item">
                                <zy-star-score :score="'4'" :type="2"></zy-star-score>
                            </div>

                            <div class="item">
                                <zy-star-score :score="'5'" :type="2"></zy-star-score>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="category-instance__example" v-if="currentCategory === 3">
                    <div class="example-component">
                        <div class="example-component__item">

                            <zy-insurance-select
                                :row="row" @selected="(item) => insuranceSelectedHandler('row', item)"
                                :optionListCacheList="[
                                    {
                                        name: '中国人寿财产保险',
                                    },
                                    {
                                        name: '中国平安',
                                    },
                                    {
                                        name: '中国人寿财产保险2',
                                    },
                                    {
                                        name: '中国人寿财产保险3',
                                    },
                                    {
                                        name: '中国人寿财产保险4',
                                    },
                                ]"
                            ></zy-insurance-select>

                            <zy-insurance-select
                                :row="row2" @selected="(item) => insuranceSelectedHandler('row2', item)"
                                :optionListCacheList="[
                                    {
                                        name: '中国人寿财产保险',
                                    },
                                    {
                                        name: '中国平安',
                                    },
                                    {
                                        name: '中国人寿财产保险2',
                                    },
                                    {
                                        name: '中国人寿财产保险3',
                                    },
                                    {
                                        name: '中国人寿财产保险4',
                                    },
                                ]"
                            ></zy-insurance-select>
                        </div>
                    </div>
                </div>

                <div class="category-instance__example" v-if="currentCategory === 4">
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

                <div class="category-instance__example" v-if="currentCategory === 5">
                    <div class="example-component">
                        <div class="example-component__item">

                            <zy-circle-scroll></zy-circle-scroll>
                        </div>
                    </div>
                </div>
                <div class="category-instance__example" v-if="currentCategory === 6">
                    <div class="example-component">
                        <div class="example-component__item">

                            <zy-text-rain></zy-text-rain>
                        </div>
                    </div>
                </div>
                <div class="category-instance__example" v-if="currentCategory === 7">
                    <div class="example-component">
                        <div class="example-component__item">

                            <zy-step></zy-step>
                        </div>
                    </div>
                </div>
                <div class="category-instance__example" v-if="currentCategory === 8">
                    <div class="example-component">
                        <div class="example-component__item">
                            <div class="star"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--        &lt;!&ndash;        <el-button>1</el-button>&ndash;&gt;-->
    </div>
</template>

<script>

export default {
    name: 'App',
    data() {
        return {
            row: {select: '中国人寿财产保险'},
            row2: {select: '中国人寿财产保险'},
            countUpSlideNumber: 0,
            currentCategory: 1,
            categoryList: [
                {label: '条目'},
                {label: '进度条'},
                {label: '推荐度'},
                {label: '选择保险公司'},
                {label: '翻牌'},
                {label: '圆形滚动'},
                {label: '文字雨特效'},
                {label: '步骤'},
                {label: '自定义五角星'},
            ]
        }
    },
    mounted() {},
    methods: {
        insuranceSelectedHandler(key, row) {
            this[key].select = row.name;
        },
        toggleHandler(index, label) {
            switch (label) {
                case '翻牌':
                    setTimeout(() => {
                        this.countUpSlideNumber = 2000;
                    }, 2000)
                    break;
            }
            this.currentCategory = index;
        }
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
        width: 230px;
        background: #fff;
        padding: 20px 0;

        &-title {
            font-size: 18px;
            padding: 20px;
            border-bottom: 1px solid #f8f8f8;
            cursor: pointer;
            transition: background .3s;

            &:hover,&.active {
                background: #f8f8f8;
                font-weight: bold;
                letter-spacing: 1px;
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
</style>
