<template>
    <div class="category-instance__example">
        <div class="example-component">
            <div class="example-component__item">
                <zy-insurance-select
                    style="margin-bottom: 20px;"
                    :row="row" @selected="(item) => insuranceSelectedHandler('row', item)"
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
                <zy-insurance-select
                    :row="row2" @selected="(item) => insuranceSelectedHandler('row2', item)"
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
</template>

<script>
export default {
    data () {
        return {
            row: {select: '中国人寿财产保险'},
            row2: {select: '中国人寿财产保险'},
        }
    },
    methods: {
        insuranceSelectedHandler(key, row) {
            this[key].select = row.name;
        },
    }
}
</script>