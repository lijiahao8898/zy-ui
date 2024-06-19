<template>
    <div class="category-instance__example">
        <div class="example-component flex">
            <div class="example-component__card" style="width: 100%;">
                <div class="example-component__card__title">思维导图</div>
                <zy-mind :data-source="dataSource" :data-links="dataLinks"></zy-mind>
            </div>
            <div class="example-component__card" style="width: 100%;">
                <div class="example-component__card__title">思维导图（可拖拽）</div>
                <zy-mind :data-source="dataSource" :data-links="dataLinks" :is-draggable="true" @move="moveHandle"></zy-mind>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataSource: [
                {label: '中国石油化工集团有限公司浙江分公司', id: 1, x: 20, y: 200},
                {label: '子公司', id: 2, x: 200, y: 200, empty: true},
                {label: '中国石油化工集团有限公司', id: 3, x: 300, y: 200},
                {label: '法定代表人', id: 4, x: 500, y: 200, empty: true},
                {label: '江某某', id: 5, x: 690, y: 100},
                {label: '张某某', id: 6, x: 690, y: 300},
                {label: 'xxxx公司', id: 7, x: 900, y: 100},
                {label: '投资', id: 8, x: 800, y: 100, empty: true},
                {label: '配偶', id: 9, x: 670, y: 220, empty: true, autoHeight: true},
                {label: '法定代表人配偶', id: 10, x: 480, y: 280, empty: true, autoHeight: true},
            ],
            dataLinks: [
                {
                    source: 2,
                    target: 1
                },
                {
                    source: 2,
                    target: 3
                },
                {
                    source: 4,
                    target: 3
                },
                {
                    source: 4,
                    target: 5,
                    lineStyle: 'round'
                },
                {
                    source: 4,
                    target: 6,
                    color: '#ccc',
                    width: 2,
                    lineStyle: 'round'
                },
                {
                    source: 5,
                    target: 6,
                    width: 2,
                    color: '#ccc'
                },
                {
                    source: 8,
                    target: 7
                },
                {
                    source: 8,
                    target: 5
                }
            ]
        }
    },
    methods: {
        moveHandle ({x, y, index}) {
            this.dataSource[index].x = x
            this.dataSource[index].y = y
        }
    }
}
</script>