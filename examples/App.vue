<template>
    <div id="app">
        <zy-item label="标签">你好，世界！</zy-item>
        <zy-button/>
        <zy-button/>
<!--        <el-button>1</el-button>-->

        <div class="example">
            <div class="example-title">进度条【zyProgress】</div>
            <div class="example-component">
                <div class="example-component__item">
                    <zy-progress :progress="20" :total="300"></zy-progress>
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
