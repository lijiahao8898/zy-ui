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
                        <slot v-if="item.theadSlot" :item="item"  :name="item.theadSlot" :row="scope.row" :index="index" />
                        <div v-else>{{ item.label }}</div>
                    </template>
                    <template slot-scope="scope">
                        <!-- 插槽 -->
                        <div v-if="item.slot || item.dataType == 'slot'">
                            <slot v-if="item.slot" :item="item" :name="item.slot" :row="scope.row" :index="scope.$index" />
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
            <slot name="empty" slot="empty">
                <div class="zy-table-empty">
                    <svg width="160px" height="160px" viewBox="0 0 160 160" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <title>暂无信息</title>
                        <defs>
                            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
                                <stop stop-color="#F1FAFF" offset="0%"></stop>
                                <stop stop-color="#D0ECFF" offset="100%"></stop>
                            </linearGradient>
                            <path d="M100,11.5470054 L129.282032,28.4529946 C141.658075,35.5983064 149.282032,48.8033872 149.282032,63.0940108 L149.282032,96.9059892 C149.282032,111.196613 141.658075,124.401694 129.282032,131.547005 L100,148.452995 C87.6239569,155.598306 72.3760431,155.598306 60,148.452995 L30.7179677,131.547005 C18.3419246,124.401694 10.7179677,111.196613 10.7179677,96.9059892 L10.7179677,63.0940108 C10.7179677,48.8033872 18.3419246,35.5983064 30.7179677,28.4529946 L60,11.5470054 C72.3760431,4.40169359 87.6239569,4.40169359 100,11.5470054 Z" id="path-2"></path>
                            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-4">
                                <stop stop-color="#4491FE" offset="0%"></stop>
                                <stop stop-color="#79C4FF" offset="100%"></stop>
                            </linearGradient>
                        </defs>
                        <g id="2.0" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="关系挖掘" transform="translate(-880, -572)">
                                <g id="登记信息" transform="translate(880, 572)">
                                    <g id="矩形">
                                        <mask id="mask-3" fill="white">
                                            <use xlink:href="#path-2"></use>
                                        </mask>
                                        <use id="蒙版" fill="url(#linearGradient-1)" xlink:href="#path-2"></use>
                                        <g id="组织" mask="url(#mask-3)">
                                            <g transform="translate(28, 41)">
                                                <rect id="矩形" fill="#000000" fill-rule="nonzero" opacity="0" x="9.09494702e-13" y="0" width="116" height="116"></rect>
                                                <path d="M92.868114,37.1189232 C93.4231887,36.5625782 94.2727927,36.4376844 94.9864601,36.7896578 C96.9462134,37.7774541 99.1551839,38.3337991 101.500091,38.3337991 C109.509025,38.3337991 116,31.8279685 116,23.8007047 C116,15.7847948 109.497697,9.26761028 101.500091,9.26761028 C93.491157,9.26761028 87.0001821,15.7734408 87.0001821,23.8007047 C87.0001821,25.9352529 87.4646323,27.9676153 88.2915803,29.7956061 C88.5974377,30.4768449 88.438845,31.2829775 87.9177545,31.8166146 L85.1763655,34.5642777 C84.5306664,35.2114546 83.4884854,35.2795785 82.774818,34.7005255 C78.4588295,31.2829775 72.9987076,29.2506151 67.0741354,29.2506151 C64.9444613,29.2506151 62.8714274,29.5117566 60.889018,30.0113317 C60.1073823,30.2043494 59.2917624,29.852376 58.8839525,29.1597832 L58.1363009,27.8654295 C57.7511471,27.2068987 57.8304434,26.3780581 58.3175498,25.7876512 C60.4245678,23.2216517 61.6819818,19.9289975 61.6366695,16.3411398 C61.523389,8.47283168 55.0890544,2.06918697 47.2387131,2.00052737 C39.2411071,1.93293921 32.7274761,8.37064586 32.6255236,16.3411398 C32.5235711,24.3229878 38.9352496,30.9423581 46.8988715,31.0558979 C47.9637085,31.0786059 49.0058895,30.97642 50.0027582,30.7720484 C50.7730659,30.6130927 51.5433736,30.9650661 51.9398554,31.6463049 L52.1890726,32.0777561 C52.6421948,32.8725347 52.4382898,33.8830389 51.7132944,34.4393839 C46.9101995,38.1067195 43.4438151,43.4544441 42.1977291,49.6083012 C42.0278083,50.4484957 41.2801568,51.0502567 40.4192247,51.0502567 L29.759526,51.0502567 C29.0118744,51.0502567 28.3321912,50.5960975 28.071646,49.8921507 C26.0212682,44.4422403 20.7877073,40.5591792 14.6479021,40.4910553 C6.65029613,40.4115774 0.057368783,46.906054 0.000361900384,54.9219639 C-0.0559117556,62.9946436 6.45771921,69.5572441 14.5006374,69.5572441 C20.923644,69.5572441 26.3724379,65.3676255 28.2755509,59.5770957 C28.5247681,58.827733 29.2157794,58.3168039 29.9974151,58.3168039 L40.4192247,58.3168039 C41.2801568,58.3168039 42.0278083,58.9299188 42.1977291,59.7814673 C43.2738942,65.083776 45.9926272,69.7729697 49.7875252,73.3154115 C50.3992401,73.8831105 50.5351768,74.8141368 50.1160388,75.5407915 L47.6578511,79.809888 C47.2500411,80.5251888 46.4004371,80.8771621 45.5961453,80.6500825 C44.3387313,80.2981092 43.0246771,80.1164455 41.6539825,80.1164455 C33.747001,80.1277995 27.2673541,86.5655061 27.1767297,94.4905841 C27.0861053,102.631388 33.6790326,109.250758 41.8012472,109.182634 C49.6742447,109.11451 56.1085793,102.676804 56.1765476,94.7857876 C56.2105317,91.6066732 55.213663,88.6659924 53.5144549,86.2589486 C53.106645,85.6798957 53.0726608,84.919179 53.4238305,84.3060641 L56.2445159,79.4124987 C56.68631,78.6517821 57.6038824,78.3111627 58.4308303,78.6177201 C61.1155791,79.5941624 64.0155609,80.1164455 67.0401512,80.1164455 C70.993642,80.1164455 74.7318998,79.2081271 78.0623476,77.5958619 C78.9232797,77.1871186 79.9541326,77.4936761 80.4299109,78.3225166 L84.6212908,85.5890638 C81.6420127,88.2572491 79.7502277,92.1403103 79.7502277,96.4661767 C79.7502277,104.516148 86.3204989,111.056041 94.3520891,110.999638 C102.247743,110.942501 108.648093,104.561564 108.750046,96.6591943 C108.851998,88.7000543 102.293055,81.9784982 94.3520891,81.9330823 C93.6497497,81.9330823 92.9587385,81.9784982 92.2790552,82.06933 C91.5427317,82.1715159 90.8290643,81.8195425 90.4552386,81.1837196 L86.0146414,73.4743672 C85.6294876,72.8044824 85.708784,71.9642878 86.2185464,71.3852349 C90.0927408,66.9231207 92.437648,61.087175 92.437648,54.6948843 C92.437648,50.278186 91.3161706,46.1226294 89.3337612,42.5007097 C88.9486074,41.796763 89.084544,40.9225065 89.6509467,40.3548075 L92.868114,37.1189232 L92.868114,37.1189232 Z M97.8864419,21.6775104 C98.0337066,19.9062895 99.4723694,18.4756881 101.250874,18.3507943 C103.36922,18.2031925 105.125068,19.8835816 105.125068,21.9727139 C105.125068,23.051342 104.64929,24.0277843 103.901638,24.6976691 C104.536009,25.2540141 104.966476,26.0260848 105.091084,26.9003412 C105.136396,27.1728367 104.921163,27.4226243 104.637962,27.4226243 L98.3622201,27.4226243 C98.0903469,27.4226243 97.8751138,27.1728367 97.909098,26.9003412 C98.0337066,26.0260848 98.4641726,25.2540141 99.0985436,24.6976691 C98.2829238,23.9823684 97.7958175,22.8810323 97.8864419,21.6775104 L97.8864419,21.6775104 Z M18.0916305,57.7945208 C18.1369427,58.0670163 17.9217097,58.3168039 17.6385084,58.3168039 L11.3627665,58.3168039 C11.0908932,58.3168039 10.8756602,58.0670163 10.9096444,57.7945208 C11.034253,56.9202643 11.464719,56.1481937 12.09909,55.5918487 C11.2721421,54.865194 10.7850358,53.7638579 10.8869883,52.560336 C11.034253,50.7891151 12.4729158,49.3585137 14.2514203,49.2336199 C16.3697663,49.0860181 18.1256147,50.7664072 18.1256147,52.8555395 C18.1256147,53.9341676 17.6498364,54.9106099 16.9021849,55.5804947 C17.5252278,56.1481937 17.9670219,56.9202643 18.0916305,57.7945208 L18.0916305,57.7945208 Z M45.2789598,97.7605304 C45.324272,98.0330259 45.109039,98.2828135 44.8258376,98.2828135 L38.5500958,98.2828135 C38.2782225,98.2828135 38.0629895,98.0330259 38.0969736,97.7605304 C38.2215822,96.8862739 38.6520483,96.1142033 39.2864193,95.5578583 C38.4594714,94.8312035 37.972365,93.7298675 38.0743175,92.5263456 C38.2215822,90.7551247 39.6602451,89.3245232 41.4387495,89.1996295 C43.5570956,89.0520277 45.3129439,90.7324168 45.3129439,92.8215491 C45.3129439,93.9001772 44.8371657,94.8766195 44.0895141,95.5465043 C44.7125571,96.1142033 45.1543512,96.8862739 45.2789598,97.7605304 Z M50.7164256,19.645148 C50.7617378,19.9176435 50.5465048,20.1674311 50.2633035,20.1674311 L43.9875616,20.1674311 C43.7156883,20.1674311 43.5004553,19.9176435 43.5344395,19.645148 C43.6590481,18.7708915 44.0895141,17.9988209 44.7238851,17.4424759 C43.8969372,16.7158212 43.4098309,15.6144851 43.5117834,14.4109632 C43.6590481,12.6397423 45.0977109,11.2091409 46.8762154,11.0842471 C48.9945614,10.9366453 50.7504098,12.6170344 50.7504098,14.7061667 C50.7504098,15.7847948 50.2746315,16.7612371 49.52698,17.4311219 C50.1500229,17.9988209 50.591817,18.7708915 50.7164256,19.645148 Z M74.2447935,62.7335021 C74.3240899,63.2784931 73.8936238,63.7667143 73.3498772,63.7667143 L60.7870655,63.7667143 C60.2319909,63.7667143 59.8128529,63.2784931 59.8921493,62.7335021 C60.2206628,60.4399981 61.6140134,58.4871136 63.5511106,57.4084855 C61.2288596,56.1141318 59.6882443,53.5821942 59.8241809,50.6982833 C59.9941017,46.9741779 63.0073641,43.9540192 66.7229657,43.7837095 C70.8803615,43.5906918 74.3240899,46.917408 74.3240899,51.0389027 C74.3240899,53.7752119 72.8174587,56.1595477 70.5858321,57.3971315 C72.5229293,58.4871136 73.9162799,60.4399981 74.2447935,62.7335021 Z M90.6364874,94.3429824 C90.7837521,92.5717615 92.222415,91.14116 94.0009194,91.0162663 C96.1192655,90.8686645 97.8751138,92.5490536 97.8751138,94.6381859 C97.8751138,95.716814 97.3993356,96.6932563 96.651684,97.3631411 C97.286055,97.9194861 97.7165211,98.6915567 97.8411297,99.5658132 C97.8864419,99.8383087 97.6712089,100.088096 97.3880075,100.088096 L91.1122657,100.088096 C90.8403924,100.088096 90.6251594,99.8383087 90.6591435,99.5658132 C90.7837521,98.6915567 91.2142182,97.9194861 91.8485892,97.3631411 C91.0329693,96.6478403 90.545863,95.5465043 90.6364874,94.3429824 L90.6364874,94.3429824 Z" id="形状" fill="url(#linearGradient-4)" fill-rule="evenodd"></path>
                                            </g>
                                        </g>
                                    </g>
                                    <path d="M130.5,18.5 C131.855608,18.5 132.954545,19.5989374 132.954545,20.9545455 L132.954,25.045 L137.045455,25.0454545 C138.401063,25.0454545 139.5,26.144392 139.5,27.5 C139.5,28.855608 138.401063,29.9545455 137.045455,29.9545455 L132.954,29.954 L132.954545,34.0454545 C132.954545,35.4010626 131.855608,36.5 130.5,36.5 C129.144392,36.5 128.045455,35.4010626 128.045455,34.0454545 L128.045,29.954 L123.954545,29.9545455 C122.598937,29.9545455 121.5,28.855608 121.5,27.5 C121.5,26.144392 122.598937,25.0454545 123.954545,25.0454545 L128.045,25.045 L128.045455,20.9545455 C128.045455,19.5989374 129.144392,18.5 130.5,18.5 Z" id="形状结合" fill="#379DFF" fill-rule="nonzero"></path>
                                    <circle id="椭圆形" stroke="#A1DDFF" stroke-width="6" cx="12" cy="88" r="6"></circle>
                                </g>
                            </g>
                        </g>
                    </svg>
                    <div class="zy-table-empty__text">暂无信息</div>
                </div>
            </slot>
        </el-table>
        <div class="pagination-container" v-if="isHavePages">
            <div>
                <slot name="pageLeft"></slot>
            </div> 
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageInfo.currentPage"  @size-change="handleSizeChange" background
                :page-size="pageInfo.size" :layout="pageInfo.layout || layout "     :page-sizes="pageInfo.sizes" :total="pageInfo.total">
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
                    sizes:[100,200],
                    layout:'total ,prev, pager, next, jumper,sizes'
                }
            }
        },
        // 分页layout值
        layout:{
            type: String,
            default: 'total ,prev, pager, next, jumper,sizes'
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

.zy-table-empty {
    margin: 50px 0;

    svg {
        line-height: unset;
    }

    .zy-table-empty__text {
        font-size: 14px;
        color: #A6A6A6;
        line-height: 14px;
        font-style: normal;
    }
}
</style>