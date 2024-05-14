<template>
    <div class="category-instance__example">
        <div class="example-component flex">
            <div class="example-component__card">
                <div class="example-component__card__title">银行选择框</div>
                <div class="item">
                    <zy-insurance-select
                        :row="row" @selected="(item) => insuranceSelectedHandler('row', item)"
                        :optionListCacheList="optionListCacheList"
                    ></zy-insurance-select>
                </div>
                <div class="item">
                    <zy-insurance-select
                        :row="row2" @selected="(item) => insuranceSelectedHandler('row2', item)"
                        :optionListCacheList="optionListCacheList"
                    ></zy-insurance-select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            row: {select: '中国人平安'},
            row2: {select: '中国人寿财产保险'},
            optionListCacheList: [
                {
                    name: '中国平安',
                },
                {
                    name: '中国人寿财产保险1',
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
            ]
        }
    },
    methods: {
        insuranceSelectedHandler(key, row) {
            this[key].select = row.name;
        },
    }
}
</script>