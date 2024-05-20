<template>
    <div :class="{'table-wrap':isTableClass} ">
        <el-table  ref="multipleTable" v-loading="tableLoading" :data="tableData" element-loading-text="拼命加载中"
            :height="height" element-loading-spinner="el-icon-loading"
            :element-loading-background="loadingColor" tooltip-effect="dark" :class="{'tableEl-style' : isTableClass}"  :border="isBorder"
            :row-class-name="rowClassName" 
            :header-cell-style="headerCellStyles" 

            :stripe="isStripe"
            @selection-change="handleSelectionChange">
            <template v-if="isSelection" >
                <el-table-column type="selection" width="50" align="center" />
            </template>
            <template v-if="$index">
                <el-table-column  label="序号" width="55" align="center" >
                    <template slot-scope="scope">
                        <span v-if="pageInfo">{{ scope.$index+1 +  (pageInfo.size || 10) * (pageInfo.currentPage-1) }}</span>
                        <span v-else> {{  scope.$index+1 }}</span>
                    </template>
                </el-table-column>
            </template>
            <template v-for="(item, index) in column">
                <el-table-column :label="item.label" :prop="item.prop" :type="item.type" :width="item.width"
                    :fixed="item.fixed" :sortable="item.sortable ? true : false" :filters="item.filters"
                    :column-key="item.columnKey" :filtered-value="item.filteredValue"
                    :filter-multiple="item.filterMultiple" :min-width="item.minWidth" align="center" :key="index">
                    <template slot="header" slot-scope="scope">
                        <slot v-if="item.theadSlot" :name="item.theadSlot" :row="scope.row" :index="index" />
                        <div v-else>{{ item.label }}</div>
                    </template>
                    <template slot-scope="scope">
                        <!-- 插槽 -->
                        <div v-if="item.slot || item.dataType == 'slot'">
                            <slot v-if="item.slot" :name="item.slot" :row="scope.row" :index="scope.$index" />
                        </div>
                        <!-- 进度条 -->
                        <div v-else-if="item.dataType == 'progress' && Number(scope.row[item.prop])">
                            <el-progress :percentage="Number(scope.row[item.prop])" />
                        </div>
                        <!-- tag -->
                        <div v-else-if="item.dataType == 'tag' && scope.row[item.prop] ">
                            <el-tag v-if="typeof dataTypeFn(scope.row[item.prop], item.formatData) == 'string'"
                                :title="scope.row[item.prop] | formatters(item.formatData)"
                                :type="formatType(scope.row[item.prop], item.formatType)">
                                {{ scope.row[item.prop] | formatters(item.formatData) }}
                            </el-tag>
                            <el-tag v-for="(tag, index) in dataTypeFn(scope.row[item.prop], item.formatData)"
                                v-else-if="typeof dataTypeFn(scope.row[item.prop], item.formatData) == 'object'"
                                :key="index" :title="scope.row[item.prop] | formatters(item.formatData)"
                                :type="formatType(tag, item.formatType)" :color=" tag.color" :style="{'color':tag.textColor||''}">
                                {{ item.tagGroup ? tag[item.tagGroup.label] ? tag[item.tagGroup.label] : tag : tag }}
                            </el-tag>
                            <el-tag v-else :title="scope.row[item.prop] | formatters(item.formatData)"
                                :type="formatType(scope.row[item.prop], item.formatType)">
                                {{ scope.row[item.prop] | formatters(item.formatData) }}
                            </el-tag>
                        </div>

                        <!-- 按钮 -->
                        <div v-else-if="item.dataType == 'option'">
                            <el-button v-for="(o, key) in item.operation"
                                v-show="o.showHide ? o.showHide(scope.row) : true" :key="key"
                                :icon="o.icon | iconFn(scope.row)"
                                :disabled="o.disabled ? o.disabled(scope.row) : false" :plain="o.plain"
                                :type="o.type | typeFn(scope.row)" :size="o.size" @click="o.clickFun(scope.row)">
                                {{ o.name }}</el-button>
                        </div>
                        <!-- -->
                        <!-- 默认纯展示数据 -->
                        <div v-else>
                            <span v-if="!item.formatData">{{ scope.row[item.prop] }}</span>
                            <span v-else>{{ scope.row[item.prop] | formatters(item.formatData) }}</span>
                        </div>

                    </template>

                    <!-- </div>   -->

                </el-table-column>
            </template>

        </el-table>
        <div class="pagination-container" v-if="isHavePages">
            <div>
                <slot name="pageLeft"></slot>
            </div> 
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageInfo.currentPage"  @size-change="handleSizeChange" background
                :page-size="pageInfo.size" :layout="layout" :total="pageInfo.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: "zy-table",
    filters: {
        iconFn(val, row) {
            if (typeof (val) === 'function') {
                return val(row)
            } else return val
        },
        typeFn(val, row) {
            if (typeof (val) === 'function') {
                return val(row)
            } else return val
        },
        formatters(val, format) {
            if (typeof (format) === 'function') {
                return format(val)
            } else return val
        }
    },
    props: {
        // 是否有边框
        isTableClass:{
            type: Boolean,
            default: true
        },
        // 是否有边框
        isBorder:{
            type: Boolean,
            default: true
        },
        // loading加载背景色
        loadingColor:{
            type: String,
            default: 'rgba(20, 60, 133, 0.8)'
        },
         // 是否栅格布局
        isStripe:{
            type: Boolean,
            default: true
        },
        // 表头样式
        headerCellStyles:{
            type: Object,
            default: () => {
                return {
                    background: '#FAFAFA', color: '#2B2E36'
                }
            }
        },
        // 是否有序号
        $index:{
            type: Boolean,
            default: true
        },
        // 是否有分页
        isHavePages:{
            type: Boolean,
            default: true
        },
        // 分页信息
        pageInfo:{
            type: Object,
            default: () => {
                return {
                    total:0,
                    size:10,
                    currentPage:1,
                }
            }
        },
        // 分页layout值
        layout:{
            type: String,
            default: 'total ,prev, pager, next, jumper'
        },
        // 分页方法
        handleCurrentChange:{
            type: Function,
            default: () => {
                return () => { }
            }
        },
        // 页码总数改变方法 
        handleSizeChange:{
            type: Function,
            default: () => {
                return () => { }
            }
        },
        // 是否可多选
        isSelection: {
            type: Boolean,
            default: false
        },
        // 高度
        height: {
            type: Number,
            default: null
        },
        // 加载动画
        tableLoading: {
            type: Boolean,
            default: false
        },
        // 多选方法
        handleSelectionChange: {
            type: Function,
            default: () => {
                return () => { }
            }
        },
        // 表头样式
        headerCellStyle: {
            type: Object,
            default: () => {
                return {}
            }
        },
        // 表格属性 prop label 等
        column: {
            type: Array,
            default() {
                return [
                ]
            }
        },
        // 行样式
        rowClassName: {
            type: Function,
            default: () => {

            }
        },
        // 表格数据
        tableData: {
            type: Array,
            default() {
                return []
            }
        }
    },

    methods: {
        formatType(val, format) {
            if (typeof (format) === 'function') {
                return format(val)
            } else return ''
        },
        dataTypeFn(val, format) {
            if (typeof (format) === 'function') {
                return format(val)
            } else return val
        }
    }
}
</script>

<style scoped lang="scss">
span {
    white-space: pre-wrap;
}
.pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
}
.table-wrap {
  background: #FFFFFF;
  border-radius: 4px;
  border: 1px solid #ECECEE;
}
.tableEl-style{
    width: 100%; border-collapse: collapse; border-top: none; border-left: none;
}

.el-table--border::after, .el-table--group::after{
    width: 0 !important;
}
.el-tag{
    margin-right: 10px;
    &:last-child{
        margin-right: 0px;
    }
}
</style>