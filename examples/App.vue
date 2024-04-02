<template>
    <div id="app">
        <div class="app-wrapper">
            <div class="category">
                <div class="category-title"
                     v-for="(item, index) in categoryList"
                     :key="index"
                     :class="{active: currentCategory === index}"
                     @click="toggleHandler(index, item.label)"
                >{{ item.label }}
                </div>
            </div>
            <div class="category-instance">
                <div class="category-instance__example" v-if="currentCategory === 0">
                    <div class="example-component">
                        <div class="example-component__item">
                            <zy-item label="标签">你好，世界！</zy-item>
                        </div>
                    </div>

                    <div class="example-component">
                        <div class="example-component__item">
                            <zy-button/>
                        </div>
                    </div>
                </div>

                <div class="category-instance__example" v-if="currentCategory === 1">
                    <div class="example-component">
                        <div class="example-component__item">

                            <div class="item" style="width: 200px;">
                                <zy-progress :progress="0" :total="300"></zy-progress>
                            </div>

                            <div class="item" style="width: 200px;">
                                <zy-progress :progress="20" :total="300"></zy-progress>
                            </div>

                            <div class="item" style="width: 200px;">
                                <zy-progress :progress="50" :total="300"></zy-progress>
                            </div>

                            <div class="item" style="width: 200px;">
                                <zy-progress :progress="100" :total="300"></zy-progress>
                            </div>
                        </div>
                    </div>

                    <!-- 饼状进度条 -->
                    <div class="example-component">
                        <div class="example-component__item">

                            <div class="item">
                                <zy-pie
                                    value="0"
                                    ring="0"
                                    isShowNumber="false"
                                    color="#FFA958"
                                    size="36">
                                </zy-pie>
                            </div>

                            <div class="item">
                                <zy-pie
                                    value="30"
                                    ring="0"
                                    isShowNumber="false"
                                    color="#FFA958"
                                    size="36">
                                </zy-pie>
                            </div>

                            <div class="item">
                                <zy-pie
                                    value="50"
                                    ring="0"
                                    isShowNumber="false"
                                    color="#FFA958"
                                    size="36">
                                </zy-pie>
                            </div>

                            <div class="item">
                                <zy-pie
                                    value="80"
                                    ring="0"
                                    isShowNumber="false"
                                    color="#FFA958"
                                    size="36">
                                </zy-pie>
                            </div>

                            <div class="item">
                                <zy-pie
                                    value="100"
                                    ring="0"
                                    isShowNumber="false"
                                    color="#FFA958"
                                    size="36">
                                </zy-pie>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="category-instance__example" v-if="currentCategory === 2">
                    <div class="example-component">

                        <div class="example-component__item">
                            <div class="item">
                                <zy-star-score :score="'1'"></zy-star-score>
                            </div>

                            <div class="item">
                                <zy-star-score :score="'2'"></zy-star-score>
                            </div>

                            <div class="item">
                                <zy-star-score :score="'3'"></zy-star-score>
                            </div>

                            <div class="item">
                                <zy-star-score :score="'4'"></zy-star-score>
                            </div>

                            <div class="item">
                                <zy-star-score :score="'5'"></zy-star-score>
                            </div>
                        </div>

                        <div class="example-component__item">
                            <div class="item">
                                <zy-star-score :score="'1'" :type="2"></zy-star-score>
                            </div>

                            <div class="item">
                                <zy-star-score :score="'2'" :type="2"></zy-star-score>
                            </div>

                            <div class="item">
                                <zy-star-score :score="'3'" :type="2"></zy-star-score>
                            </div>

                            <div class="item">
                                <zy-star-score :score="'4'" :type="2"></zy-star-score>
                            </div>

                            <div class="item">
                                <zy-star-score :score="'5'" :type="2"></zy-star-score>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="category-instance__example" v-if="currentCategory === 3">
                    <div class="example-component">
                        <div class="example-component__item">

                            <zy-insurance-select
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

                <div class="category-instance__example" v-if="currentCategory === 4">
                    <!-- 翻牌效果 -->
                    <div class="example-component">
                        <div class="example-component__item">

                            <zy-flip></zy-flip>
                        </div>
                    </div>

                    <!-- 翻牌效果 - 滑动 -->
                    <div class="example-component">
                        <div class="example-component__item">

                            <zy-count-up-slide :number="countUpSlideNumber"></zy-count-up-slide>
                        </div>
                    </div>
                </div>

                <div class="category-instance__example" v-if="currentCategory === 5">
                    <div class="example-component">
                        <div class="example-component__item">

                            <zy-circle-scroll></zy-circle-scroll>
                        </div>
                    </div>
                </div>
                <div class="category-instance__example" v-if="currentCategory === 6">
                    <div class="example-component">
                        <div class="example-component__item">

                            <zy-text-rain></zy-text-rain>
                        </div>
                    </div>
                </div>
                <div class="category-instance__example" v-if="currentCategory === 7">
                    <div class="example-component">
                        <div class="example-component__item">

                            <zy-step></zy-step>
                        </div>
                    </div>
                </div>
                <div class="category-instance__example" v-if="currentCategory === 8">
                    <div class="example-component">
                        <div class="example-component__item">
                            <div class="star"></div>
                        </div>
                    </div>
                </div>

                <!-- 瀑布流 -->
                <div class="category-instance__example" v-show="currentCategory === 9">
                    <div class="example-component">
                        <div class="example-component__item" style="position: relative;width: calc(100vw - 480px);">
                            <zy-waterfall ref="waterfallInstance" :len="waterfallList.length" :commonWidth="waterfallItemWidth">
                                <template v-for="(item, index) in waterfallList">
                                    <div class="waterfall-item" ref="waterfallItem" :key="index">
                                        <div class="waterfall-example-div" :style="{height: 50 + Math.floor(Math.random() * 200) + 'px'}">{{item.label}}</div>
                                    </div>
                                </template>
                            </zy-waterfall>
                        </div>
                    </div>
                </div>

                <!-- 关系图 -->
                <div class="category-instance__example" v-show="currentCategory === 10">
                    <div class="example-component">
                        <div class="example-component__item" style="position: relative;width: calc(100vw - 480px);background: #000;">
                            <zy-relation ref="relation" @select="relationSelectHandler" :category="list" :user="user"></zy-relation>
                        </div>
                    </div>
                </div>

                <!-- 验证码输入框 -->
                <div class="category-instance__example" v-show="currentCategory === 11">
                    <div class="example-component">
                        <div class="example-component__item" style="position: relative;width: calc(100vw - 480px);">
                            <zy-verify-box></zy-verify-box>
                        </div>
                    </div>
                </div>

                <!-- 验证码输入框 -->
                <div class="category-instance__example" v-show="currentCategory === 12">
                    <div class="example-component">
                        <div class="example-component__item" style="position: relative;width: calc(100vw - 480px);">
                            <zy-image-compare></zy-image-compare>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--        &lt;!&ndash;        <el-button>1</el-button>&ndash;&gt;-->
    </div>
</template>

<script>

export default {
    name: 'App',
    data() {
        return {
            row: {select: '中国人寿财产保险'},
            row2: {select: '中国人寿财产保险'},
            countUpSlideNumber: 0,
            currentCategory: 1,
            categoryList: [
                {label: '条目'},
                {label: '进度条'},
                {label: '推荐度'},
                {label: '选择保险公司'},
                {label: '翻牌'},
                {label: '圆形滚动'},
                {label: '文字雨特效'},
                {label: '步骤'},
                {label: '自定义五角星'},
                {label: '瀑布流'},
                {label: '关系图'},
                {label: '验证码输入框'},
                {label: '图片对比'},
            ],
            waterfallItemWidth: 200,
            waterfallList: [
                {label: 1},
                {label: 2},
                {label: 3},
                {label: 4},
                {label: 5},
                {label: 6},
                {label: 7},
                {label: 8},
                {label: 9},
                {label: 10},
            ],
            categoryIndex: 0,
            selectedInfo: {},
            list: [],
            listCopy: [],
            user: {},
            legend: [
                {text: '熟悉', label: '亲戚', color: 'rgba(255, 136, 81, 1)', type: 3},
                // {label: '商业', color: 'rgba(81, 121, 255, 1)'},
                {text: '信任', label: '同事', color: 'rgba(255, 81, 96, 1)', type: 5},
                // {label: '朋友', color: 'rgba(0, 192, 129, 1)',},
                {text: '影响力',label: '同学', color: 'rgba(172, 81, 255, 1)', type: 4},
            ],
        }
    },
    mounted() {},
    methods: {
        insuranceSelectedHandler(key, row) {
            this[key].select = row.name;
        },
        relationSelectHandler (e) {
            console.log(e);
        },
        toggleHandler(index, label) {
            this.currentCategory = index;
            switch (label) {
                case '翻牌':
                    setTimeout(() => {
                        this.countUpSlideNumber = 2000;
                    }, 2000)
                    break;
                case  '瀑布流':
                    this.$nextTick(() => {
                        this.$refs.waterfallInstance.setPosition(this.$refs.waterfallItem);
                    })
                    break;
            }
            if(label === '关系图') {
                setTimeout(() => {
                    this.$nextTick(() => {
                        let exampleNumber = [
                            [9, 15, 18, 5, 6, 10, 12, 12, 14, 11, 18, 19],
                            [1, 9, 4, 19, 11, 6, 5, 3, 7, 8, 2, 10],
                            [16, 14, 7, 11, 6, 10, 12, 3, 7, 1, 8, 9],
                            [7, 18, 11, 15, 6, 7, 12, 3, 1, 11, 8, 9],
                            [8, 18, 11, 7, 6, 7, 12, 3, 1, 11, 8, 9],
                            [8, 18, 11, 9, 6, 7, 12, 3, 1, 11, 8, 9],
                        ]
                        const res = {
                            "msg": "success",
                            "code": 0,
                            "data": [
                                {
                                    "hh": "007046425",
                                    "lxdh": "13500000000",
                                    "gxcd": "1",
                                    "gj": "中国",
                                    "czrkxb": "男",
                                    "hjdz": "浙江省绍兴市越城区",
                                    "hhid": "3300000001001565083",
                                    "mz": "汉族",
                                    "relation": "本人",
                                    "gx": "本人",
                                    "czrkgmsfhm_md5": "746ec95a5a348935cc66f889ec18e1ce",
                                    "gjrq": "是",
                                    "czrkgmsfhm": "330602******4014",
                                    "czrkkwhcd": "已婚",
                                    "sffy": "未服兵役",
                                    "jzdz": "兴苑小区12幢1607室",
                                    "sfbr": "是",
                                    "czrkcsrq": "19570503",
                                    "czrkxm": "陈**",
                                    "hklx": "家庭户(户号：2441941 )"
                                },
                                {
                                    "hh": "007045979",
                                    "lxdh": "136****",
                                    "gxcd": "3",
                                    "gj": "中国",
                                    "czrkxb": "男",
                                    "hjdz": "浙江省绍兴市越城区",
                                    "hhid": "3300000001001563771",
                                    "mz": "汉族",
                                    "relation": "亲戚",
                                    "relationStr": "同乡 同学 同事",
                                    "type": 1,
                                    "gx": "同学",
                                    "czrkgmsfhm_md5": "03fafa026d20e5ca058318913608a54f",
                                    "gjrq": "是",
                                    "czrkgmsfhm": "330602******4035",
                                    "czrkkwhcd": "已婚",
                                    "sffy": "未服兵役",
                                    "jzdz": "绍兴市越*******",
                                    "sfbr": "否",
                                    "czrkcsrq": "1956****",
                                    "czrkxm": "俞**",
                                    "hklx": "家庭户",
                                    additional: [
                                        {key: '关系表征', data: ['余**（信访人儿媳）小学到高中同学', '余**（信访人儿媳）近3月通话累计12小时', '余**（信访人儿媳）结婚伴娘']},
                                        {key: '个人信息', data: ['女   1989年3月  未婚', '国有企业 行政主管', '父亲：国有企业 副总', '住址：海宁小区18幢1904房', '经济情况：良好']},
                                    ]
                                },
                                {
                                    "hh": null,
                                    "lxdh": null,
                                    "gxcd": "4",
                                    "gj": "中国",
                                    "czrkxb": "男",
                                    "hjdz": "浙江省宁波市",
                                    "hhid": null,
                                    "mz": "汉",
                                    "relation": "亲戚",
                                    "relationStr": "同乡 同学 同事",
                                    type: 1,
                                    "gx": "同学",
                                    "czrkgmsfhm_md5": "0f9093e669abf8a1f489e73c5d46c322",
                                    "gjrq": "否",
                                    "czrkgmsfhm": "330282******2022",
                                    "czrkkwhcd": "未婚",
                                    "sffy": "未服兵役",
                                    "jzdz": "浙江省宁波市******",
                                    "sfbr": "否",
                                    "czrkcsrq": "19950723",
                                    "czrkxm": "赵**",
                                    "hklx": "家庭户",
                                    additional: [
                                        {key: '关系表征', data: ['余**（信访人儿媳）小学到高中同学', '余**（信访人儿媳）近3月通话累计12小时', '余**（信访人儿媳）结婚伴娘']},
                                        {key: '个人信息', data: ['女   1989年3月  未婚', '国有企业 行政主管', '父亲：国有企业 副总', '住址：海宁小区18幢1904房', '经济情况：良好']},
                                    ]
                                },
                                {
                                    "hh": "007046425",
                                    "lxdh": "15100000000",
                                    "gxcd": "1",
                                    "gj": "中国",
                                    "czrkxb": "女",
                                    "hjdz": "浙江省绍兴市",
                                    "hhid": "3300000001001565083",
                                    "mz": "汉族",
                                    "relation": "亲戚",
                                    "relationStr": "同乡 同学 同事",
                                    "type": 1,
                                    "gx": "亲戚",
                                    "czrkgmsfhm_md5": "0adf6d9f7d305e52180285fccb3d2488",
                                    "gjrq": "是",
                                    "czrkgmsfhm": "330602******4065",
                                    "czrkkwhcd": "已婚",
                                    "sffy": "未服兵役",
                                    "jzdz": "兴苑小区12幢1607室",
                                    "sfbr": "否",
                                    "czrkcsrq": "19680712",
                                    "czrkxm": "许**",
                                    "hklx": "家庭户",
                                    additional: [
                                        {key: '关系表征', data: ['余**（信访人儿媳）小学到高中同学', '余**（信访人儿媳）近3月通话累计12小时', '余**（信访人儿媳）结婚伴娘']},
                                        {key: '个人信息', data: ['女   1989年3月  未婚', '国有企业 行政主管', '父亲：国有企业 副总', '住址：海宁小区18幢1904房', '经济情况：良好']},
                                    ]
                                },
                                {
                                    "hh": "007049173",
                                    "lxdh": null,
                                    "gxcd": "2",
                                    "gj": "中国",
                                    "czrkxb": "男",
                                    "hjdz": "浙江省绍兴市",
                                    "hhid": "3300000001018596478",
                                    "mz": "汉族",
                                    "relation": "亲戚",
                                    "relationStr": "同乡 同学 同事",
                                    "type": 1,
                                    "gx": "同事",
                                    "czrkgmsfhm_md5": "cde6419c276cc52972141f9592c41afe",
                                    "gjrq": "否",
                                    "czrkgmsfhm": "330602******4014",
                                    "czrkkwhcd": "未婚",
                                    "sffy": "未服兵役",
                                    "jzdz": "绍兴市越*******",
                                    "sfbr": "否",
                                    "czrkcsrq": "1981****",
                                    "czrkxm": "沈**",
                                    "hklx": "家庭户",
                                    additional: [
                                        {key: '关系表征', data: ['余**（信访人儿媳）小学到高中同学', '余**（信访人儿媳）近3月通话累计12小时', '余**（信访人儿媳）结婚伴娘']},
                                        {key: '个人信息', data: ['女   1989年3月  未婚', '国有企业 行政主管', '父亲：国有企业 副总', '住址：海宁小区18幢1904房', '经济情况：良好']},
                                    ]
                                },
                                {
                                    "hh": null,
                                    "lxdh": null,
                                    "gxcd": "2",
                                    "gj": null,
                                    "czrkxb": null,
                                    "hjdz": null,
                                    "hhid": null,
                                    "mz": null,
                                    relation: "同学",
                                    "relationStr": "领导",
                                    "type": 3,
                                    "gx": "同学",
                                    "czrkgmsfhm_md5": "bcbe3365e6ac95ea2c0343a2395834dd",
                                    "gjrq": "否",
                                    "czrkgmsfhm": "222",
                                    "czrkkwhcd": null,
                                    "sffy": null,
                                    "jzdz": null,
                                    "sfbr": "否",
                                    "czrkcsrq": null,
                                    "czrkxm": "李**",
                                    "hklx": null,
                                    additional: [
                                        {key: '关系表征', data: ['陈**（信访人儿子）单位领导', '陈**（信访人儿子）介绍人、主婚人']},
                                        {key: '个人信息', data: ['XX市X县派出所  所长',]},
                                    ]
                                },
                                {
                                    "hh": null,
                                    "lxdh": null,
                                    "gxcd": "1",
                                    "gj": null,
                                    "czrkxb": null,
                                    "hjdz": null,
                                    "hhid": null,
                                    "mz": null,
                                    "relation": "同学",
                                    "relationStr": "宗教",
                                    "type": 3,
                                    "gx": "同事",
                                    "czrkgmsfhm_md5": "8d74592c8464913bffc89395bad1434b",
                                    "gjrq": "否",
                                    "czrkgmsfhm": "420222******",
                                    "czrkkwhcd": null,
                                    "sffy": null,
                                    "jzdz": null,
                                    "sfbr": "否",
                                    "czrkcsrq": null,
                                    "czrkxm": "李**",
                                    "hklx": null,
                                    additional: [
                                        {key: '关系表征', data: ['许**（信访人妻子）信教17年', '许**（信访人妻子）每周去百草园教堂礼拜']},
                                        {key: '个人信息', data: ['男   1952年7月 ', '百草园教堂牧师，任职24年，在绍兴地区具有较高声望',]},
                                    ]
                                },
                                {
                                    "hh": "007046425",
                                    "lxdh": "13400000000",
                                    "gxcd": "2",
                                    "gj": "中国",
                                    "czrkxb": "女",
                                    "hjdz": "浙江省绍兴市",
                                    "hhid": "3300000001001565083",
                                    "mz": "汉族",
                                    "relationStr": "朋友",
                                    relation: "同事",
                                    "gx": "亲戚",
                                    "type": 2,
                                    "czrkgmsfhm_md5": "75ca719823975eac09a6237995e8482f",
                                    "gjrq": "否",
                                    "czrkgmsfhm": "330602******1043",
                                    "czrkkwhcd": "已婚",
                                    "sffy": "未服兵役",
                                    "jzdz": "浙江省绍兴市越城区",
                                    "sfbr": "否",
                                    "czrkcsrq": "198907025 ",
                                    "czrkxm": "余**",
                                    "hklx": "家庭户",
                                    additional: [
                                        {key: '关系表征', data: ['为陈**（信访人）民间借贷担保15万', '与陈**（信访人）2021年合作工程项目']},
                                        {key: '个人信息', data: ['男   1956年3月  已婚   一子一女', '私营企业 法定代表人 董事长',]},
                                    ]
                                    // additional: [
                                    //     {key: '关系表征', data: ['余**（信访人儿媳）小学到高中同学', '余**（信访人儿媳）近3月通话累计12小时', '余**（信访人儿媳）结婚伴娘']},
                                    //     {key: '个人信息', data: ['女   1989年3月  未婚', '国有企业 行政主管', '父亲：国有企业 副总', '住址：海宁小区18幢1904房', '经济情况：良好']},
                                    // ]
                                }
                            ]
                        }
                        console.log(this.categoryIndex)
                        let filter = res.data;
                        if(this.categoryIndex) {
                            filter = res.data.filter(item => item.type === this.categoryIndex);
                            console.log(filter)
                        }
                        const filterList = filter.filter(item => item.sfbr === '否');
                        if(this.list.length <= 0) {
                            this.list = filterList.map((item) => ({
                                ...item,
                                level: item.gxcd ? parseInt(item.gxcd) : 6,
                                type: this.getType(item.relation),
                            }))
                            let n = [0, 0, 0, 0, 0, 0];
                            this.list.forEach((item) => {
                                console.log(item.czrkxm, parseInt(item.gxcd), n, exampleNumber[parseInt(item.gxcd)][n]);
                                item.positionNumber = exampleNumber[parseInt(item.gxcd) - 1][n[parseInt(item.gxcd)]];
                                if(n[parseInt(item.gxcd)] > 24) {
                                    n[parseInt(item.gxcd)] = 0
                                } else {
                                    n[parseInt(item.gxcd)] ++
                                }
                            })
                            this.listCopy = this.list.map(item => ({...item}));
                        } else {
                            let arr = []
                            filterList.forEach(item => {
                                this.listCopy.forEach(copyItem => {
                                    if(item.czrkgmsfhm_md5 === copyItem.czrkgmsfhm_md5) {
                                        arr.push(copyItem)
                                    }
                                })
                            })
                            this.list = [];
                            arr.forEach(item => {
                                this.list.push(item)
                            })
                        }
                        this.user = res.data.filter(item => item.sfbr !== '否')[0];
                        this.user.level = 0;
                        this.user.type = 1;
                        this.$nextTick(() => {
                            this.$refs.relation.render();
                        })
                    })
                }, 2000)
            }
        },
        getType (relation) {
            let type = null
            this.legend.forEach(item => {
                if(item.label === relation) {
                    type = item.type
                }
            })
            if(!type) {
                type = 3;
            }
            return type;
        },
    }
}
</script>

<style lang="scss">
* {
    padding: 0;
    margin: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;
    background: #f8f8f8;
}

.app-wrapper {
    display: flex;

    .category {
        width: 220px;
        background: #fff;
        padding: 15px 0;

        &-title {
            font-size: 16px;
            height: 45px;
            line-height: 45px;
            border-bottom: 1px solid #f8f8f8;
            cursor: pointer;
            transition: background, font-size .3s;

            &:hover,&.active {
                background: #f8f8f8;
                font-weight: bold;
                letter-spacing: 1px;
                font-size: 18px;
            }
        }
    }
}

.example {
    margin: 20px 0;
    width: 50%;
}

.example.gary {
    background: #ddd;
}

.example-component {
    border-radius: 4px;
    padding: 40px;
}

.example-component__item {
    //background: #fff; display: flex; flex-wrap: wrap;
}

.example-component__item .item {
    margin-right: 20px;
    margin-bottom: 10px;
}

.star {
    position: relative;
    margin: 20px auto;
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent transparent red transparent;
    border-width: 70px 100px;
    transform: rotate(35deg);
}

.star::before {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    top: -128px;
    left: -95px;
    border-style: solid;
    border-color: transparent transparent red transparent;
    border-width: 80px 30px;
    transform: rotate(-35deg);
}

.star::after {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    top: -45px;
    left: -140px;
    border-style: solid;
    border-color: transparent transparent red transparent;
    border-width: 70px 100px;
    transform: rotate(-70deg);
}

.waterfall-item {
    transition: .3s;
}

.waterfall-example-div {
    width: 200px;
    background: #ccc;
    font-size: 28px;
    color: #000;
    font-weight: bold;
}
</style>
