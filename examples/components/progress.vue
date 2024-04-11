<template>
    <div class="category-instance__example">
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
</template>