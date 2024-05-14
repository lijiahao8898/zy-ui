<template>
    <div class="category-instance__example">
        <div class="example-component">
            <div class="example-component__item">
                <zy-text-rain :height="height"></zy-text-rain>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            height: 0
        }
    },
    mounted() {
        this.height = window.innerHeight - 105
    }
}
</script>