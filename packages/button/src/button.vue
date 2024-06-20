<template>
    <div class="zy-button" @click="clickHandle">
        zy-button
    </div>
</template>

<script>
export default {
    name: "zy-button",
    props: ['name'],
    data () {
        return {
            hha: 223,
        }
    },
    methods: {
        clickHandle () {
            // this.$options.cancel()
            console.log(this)
            console.log(this.name)
        }
    }
}
</script>

<style lang="scss">
.zy-button {
    background-color: maroon;
    color: white;
}
</style>
