<template>
    <div class="category-instance__example">
        <div class="example-component flex">
            <div class="example-component__card">
                <div class="example-component__card__title">声音动画（默认）</div>
                <zy-voice></zy-voice>
            </div>
            <div class="example-component__card">
                <div class="example-component__card__title">声音动画（渐变 is-linear）</div>
                <zy-voice is-linear></zy-voice>
            </div>
            <div class="example-component__card">
                <div class="example-component__card__title">声音动画（渐变反方向 is-reverse）</div>
                <zy-voice is-linear is-reverse></zy-voice>
            </div>
        </div>
    </div>
</template>