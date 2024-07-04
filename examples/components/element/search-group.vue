<template>
    <div class="category-instance__example">
        <div class="example-component flex">
            <div class="example-component__card" style="width: 100%;">
                <div class="example-component__card__title">查询项</div>
                <zy-search-group :init-data="searchOptions" @search="search"></zy-search-group>
                <div class="example-component__card__title">查询项结果</div>
                {{ searchResult }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchOptions: [
                {
                    label: '授权人姓名',
                    type: 'input',
                    key: 'czrkxm',
                    value: '',
                },
                {
                    label: '身份照',
                    type: 'input',
                    key: 'czrkgmsfhm',
                    value: '',
                }
            ],
            searchResult: {}
        }
    },
    methods: {
        search(val) {
            this.searchResult = val
        }
    }
}
</script>