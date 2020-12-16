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

        <div class="example">
            <div class="example-title">进度条</div>
            <div class="example-component">
                <div class="example-component__item">
                    <zy-progress :progress="20" :total="300"></zy-progress>
                </div>
            </div>
        </div>

        <div class="example">
            <div class="example-title">饼状进度条</div>
            <div class="example-component">
                <div class="example-component__item">
                    <zy-pie
                        value="80"
                        ring="0"
                        isShowNumber="false"
                        color="#FFA958"
                        size="36">
                    </zy-pie>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'App',
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    background: #ECEDF6;
}

.example {
    margin: 20px 0;
}

.example-title {
    font-size: 18px;
    margin: 10px 0;
}

.example-component {
    background: #303133;
    border-radius: 4px;
    padding: 40px;
}

.example-component__item {
    background: #fff;
}
</style>
