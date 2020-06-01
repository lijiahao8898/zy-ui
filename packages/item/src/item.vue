<template>
    <div class="zy-item">
        <div class="zy-item__label">{{label}}:</div>
        <div class="zy-item__value">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'zyItem',
        props: [
            'label'
        ],
        data() {
            return {}
        },
        mounted() {
            console.log(this)
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    .zy-item {
        overflow: hidden;
        background: #eceef0;
        /*display: inline-block;*/
        padding: 10px;
        transition: all .3s;
        margin: 0 5px 8px 0;
        &:hover {
            box-shadow: 1px 1px 1px rgba(0, 0, 0, .4);
        }

        &__label {
            float: left;
            width: 120px;
            text-align: right;
            margin-right: 20px;
        }

        &__value {
            float: left;
        }
    }
</style>
