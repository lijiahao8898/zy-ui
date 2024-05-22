<template>
    <div class="category-instance__example">
        <div class="example-component">
            <div class="example-component__card">
                <div class="example-component__card__title">全部功能</div>
                <div class="item">
                    <zy-table :column="columnData" :table-data="tableData" :table-loading="tableLoading" :isSelection="true"
                              :handleSelectionChange="handleSelectionChange" :pageInfo="pageInfo"
                              :handleCurrentChange="handleCurrentChange" :isHavePages="isHavePages" :headerCellStyles="headerCellStyles"
                              :isStripe="isStripe" :handleSizeChange="handleSizeChange">
                        <div slot="protocolSlot" slot-scope="scope">
                            <div>这是一个protocolSlot内容{{ 1 || scope }}</div>
                        </div>
                        <div slot="theadHeaderSlot1" slot-scope="scope">
                            <div>表头{{ scope }}</div>
                        </div>
                        <div slot="tableSlot" slot-scope="scope">
                            <div @click="tableSlotMed(scope.row)">表格tableSlot{{ scope.index }}</div>
                        </div>
                        <div slot="newSlot" slot-scope="scope">
                            <div @click="tableSlotMed(scope.row.name)">newSlot{{ scope.index }}</div>
                        </div>
                        <!-- 底部插槽 -->
                        <div slot="pageLeft">底部插槽</div>
                    </zy-table>
                </div>
            </div>

            <div class="example-component__card">
                <div class="example-component__card__title">空数据展示</div>
                <div class="item">
                    <zy-table :column="columnData" :table-data="[]" :table-loading="tableLoading" :isSelection="true"
                              :handleSelectionChange="handleSelectionChange" :pageInfo="pageInfo"
                              :handleCurrentChange="handleCurrentChange" :isHavePages="isHavePages" :headerCellStyles="headerCellStyles"
                              :isStripe="isStripe" :handleSizeChange="handleSizeChange">
                        <div slot="protocolSlot" slot-scope="scope">
                            <div>这是一个protocolSlot内容{{ 1 || scope }}</div>
                        </div>
                        <div slot="theadHeaderSlot1" slot-scope="scope">
                            <div>表头{{ scope }}</div>
                        </div>
                        <div slot="tableSlot" slot-scope="scope">
                            <div @click="tableSlotMed(scope.row)">表格tableSlot{{ scope.index }}</div>
                        </div>
                        <div slot="newSlot" slot-scope="scope">
                            <div @click="tableSlotMed(scope.row.name)">newSlot{{ scope.index }}</div>
                        </div>
                        <div slot="empty">空数据</div>
                    </zy-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isHavePages: true,// 是否有分页
            isStripe: true,
            headerCellStyles: {
                background: '#FAFAFA', color: '#2B2E36'
            },
            pageInfo: {
                total: 25,
                size: 10,
                sizes: [1, 2, 3, 4, 5],
                layout: 'total ,prev, pager, next, jumper,sizes'
            },
            tableLoading: false,
            columnData: [
                {
                    type: '',
                    label: '',
                    prop: '',
                    dataType: 'slot', //  类型   dataType为slot时可不写    slot 列表插槽  progress  进度条  tag 标签  不写时是默认值
                    slot: 'tableSlot', // 列表插槽 名
                    theadSlot: 'theadHeaderSlot1'    // 表头  插槽名
                },
                {
                    type: '',
                    label: '默认值',
                    prop: 'name',
                    dataType: "", // 默认值

                },
                {
                    dataType: 'progress', // 进度条
                    label: '进度条',
                    prop: 'progress',
                },
                {
                    dataType: 'tag', // 标签
                    label: '标签',
                    prop: 'tab',
                    minWidth: 120,
                    tagGroup: {
                        // tag 显示哪个字段
                        label: 'name',
                    },
                    formatType: (e) => {
                        // 返回 tag 类型
                        if (e) {
                            return e.type || 'warning'
                        } else {
                            return 'warning'
                        }
                    },
                    formatData: (e) => {
                        return e
                    },

                },
                {
                    dataType: 'slot',
                    slot: 'newSlot',
                    label: 'newSlot1',
                    prop: 'newSlot1',
                },
                {
                    dataType: 'option',
                    // slot: 'newSlot',
                    label: 'newSlot2',
                    prop: 'newSlot2',
                    operation: [
                        {
                            name: '编辑',
                            type: 'text',
                            size: 'mini',
                            // icon: 'el-icon-edit',
                            plain: false,
                            showHide: (row) => {
                                console.log(1 || row);
                                // 是否显示
                                return true
                            },
                            clickFun: (row) => {
                                // 触发方法
                                console.log(2 || row);
                            }
                        },
                    ],
                },
                {
                    type: '',
                    label: '启用状态',
                    prop: 'is_active',
                    formatData: (item) => {
                        // 处理展示文本
                        const str = item == true ? '已启用' : '未启用'
                        return str
                    }
                },
                {
                    type: '',
                    label: '协议',
                    prop: 'protocol',
                    dataType: 'slot',
                    slot: 'protocolSlot' // 插槽名
                },
                {
                    dataType: 'option',
                    label: '操作',
                    width: '300px',
                    operation: [
                        {
                            name: '编辑',
                            type: '',
                            size: 'mini',
                            icon: 'el-icon-edit',
                            plain: true,
                            showHide: (row) => {
                                console.log(1 || row);
                                // 是否显示
                                return true
                            },
                            clickFun: (row) => {
                                // 触发方法
                                console.log(2 || row);
                            }
                        },
                        {
                            name: '删除',
                            type: 'danger',
                            size: 'mini',
                            showHide: (row) => {
                                console.log(3 || row);
                                return true
                            },
                            icon: 'el-icon-delete',
                            plain: true,
                            clickFun: (row) => {
                                console.log(4 || row);
                            }
                        }

                    ]

                }
            ],

            //表格数据
            tableData: [{ name: 111, is_active: true, protocol: 'TCP', progress: 10, tab: [1, 2, 3] },
            {
                name: 111, is_active: true, protocol: 'TCP', progress: 10, tab: [
                    { name: '标签一', type: '', color: "#0f0", textColor: '#000' },
                    { name: '标签二', type: 'success' },
                    { name: '标签三', type: 'info' },
                    { name: '标签四', type: 'warning' },
                    { name: '标签五', type: 'danger' }
                ]
            },
            { name: 111, is_active: true, protocol: 'TCP', type: 1, flag: 1 },
            { name: 111, is_active: true, protocol: 'TCP' },
            { name: 111, is_active: true, protocol: 'TCP' },
            { name: 111, is_active: true, protocol: 'TCP' },
            { name: 111, is_active: true, protocol: 'TCP' },
            { name: 111, is_active: true, protocol: 'TCP' },
            { name: 111, is_active: true, protocol: 'TCP' },
            { name: 111, is_active: true, protocol: 'TCP' },
            ],
        }
    },
    mounted() {
    },
    methods: {
        handleSelectionChange(e) {
            console.log(e, 123);
        },
        handleCurrentChange(e) {
            console.log(e, 456);
        },
        tableSlotMed(_row) {
            console.log(_row);
        },
        handleSizeChange(val) {
            console.log(val);
        },
    }
}
</script>

<style lang="scss" scoped>
.example-component__card {
    width: 100%;
}
</style>