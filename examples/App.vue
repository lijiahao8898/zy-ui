<template>
    <div id="app">
        <div class="example">
            <div class="example-title">条目</div>
            <div class="example-component">
                <div class="example-component__item">
                    <zy-item label="标签">你好，世界！</zy-item>
                </div>
            </div>
        </div>

        <div class="example">
            <div class="example-title">条目</div>
            <div class="example-component">
                <div class="example-component__item">
                    <zy-button/>
                </div>
            </div>
        </div>
        <!--        <el-button>1</el-button>-->

        <!-- 进度条 -->
        <div class="example">
            <div class="example-title">进度条</div>
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
        </div>

        <!-- 饼状进度条 -->
        <div class="example">
            <div class="example-title">饼状进度条</div>
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

        <!-- 推荐度 -->
        <div class="example gary">
            <div class="example-title">推荐度</div>
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

        <!-- 选择保险公司 -->
        <div class="example">
            <div class="example-title">选择保险公司</div>
            <div class="example-component">
                <div class="example-component__item">

                    <zy-insurance-select
                        :row="row" @selected="(row) => insuranceSelectedHandler(row)"
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
    </div>
</template>

<script>

export default {
    name: 'App',
    data() {
        return {
            row: {select: '中国人寿财产保险'}
        }
    },
    methods: {
        insuranceSelectedHandler (row) {
            console.log(row)
            this.row.select = row.name;
        }
    }
}
</script>

<style>
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
}

.example {
    margin: 20px 0;
    width: 50%;
}

.example.gary {
    background: #ddd;
}

.example-title {
    font-size: 18px;
    padding: 20px 0 0;
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
</style>
