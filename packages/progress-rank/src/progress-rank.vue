<template>
    <div class="progress-rank">
        <div class="item-wrapper">
            <div class="item" v-for="(item, index) in topList" :key="index">
                <div class="item-label">{{ item.name }}</div>
                <div class="item-progress">
                    <div class="progress" :style="{width: getPercent(item.value)}"></div>
                    <div class="progress-value" :class="{absolute: item.value / maxValue * 100 > 80}">
                        {{ item.value}}
                    </div>
                </div>
            </div>
        </div>
        <div class="progress-rank__line">
            <div v-for="(item, index) in valueList" :key="index">{{ priceFormat(item) }}</div>
        </div>
    </div>
</template>

<script>
import {maxBy} from 'lodash'

/**
 * 公用处理数据---格式化金额  保留2位小数 千分位逗号
 * @param {type} number
 * @param {type} decimals
 * @param {type} thousands_sep
 * @param {type} dec_point
 * @param {type} roundtag  舍入参数，默认 "round" 四舍五入 ,"ceil" 向上取,"floor"向下取,
 * @returns {unresolved}
 */
const priceFormat = (number, decimals = 0, thousands_sep = ',', dec_point = '.', roundtag) => {
    /*
     * 参数说明：
     * number：要格式化的数字
     * decimals：保留几位小数
     * dec_point：小数点符号
     * thousands_sep：千分位符号
     * roundtag:舍入参数，默认 "round" 四舍五入 ,"ceil" 向上取,"floor"向下取,
     * */
    //if(!number) return 0.00*1;
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    roundtag = roundtag || "round"; //"ceil","floor","round"
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var s = n.toString();
            var sArr = s.split(".");
            var m = 0;
            try {
                m += sArr[1].length;
            } catch (e) {
                console.log(e)
            }

            if (prec > m) {
                return s;
                /*'' + Number(s.replace(".", "")) / Math.pow(10, m);*/
            } else {
                sArr[1] = Math[roundtag](Number(sArr[1]) / Math.pow(10, m - prec));
                while (sArr[1].toString().length < prec) {
                    sArr[1] = '0' + sArr[1];
                }
                return sArr.join('.');
            }
        };
    s = (prec ? toFixedFix(n, prec) : '' + Math.floor(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

export default {
    name: 'zyProgressRank',
    data () {
        return {
            topList: [
                {name: '钟管', value: 6117.25},
                {name: '新安', value: 2119.81},
                {name: '雷甸', value: 1461.01},
                {name: '莫干山', value: 1109.71},
                {name: '武康', value: 971.37},
                {name: '洛舍', value: 890.45},
                {name: '阜溪', value: 133.32},
                {name: '新市', value: 0.41},
                {name: '舞阳', value: 0},
                {name: '禹越', value: 0},
                {name: '乾元', value: 0},
                {name: '康乾', value: 0},
                {name: '下渚湖', value: 0},
            ],
            maxValue: 0,
            valueList: []
        }
    },
    mounted() {
        let maxValueObject = maxBy(this.topList, 'value');
        this.maxValue = maxValueObject.value;
        this.valueList = this.getValueList(0, 5);
    },
    methods: {
        getPercent(val) {
            let percent = val / this.maxValue * 100;
            if (percent > 100) {
                return 100 + '%'
            } else {
                return percent + '%'
            }
        },
        getValueList(min, length) {
            let arr = [];
            if (arr.length === 0) {
                arr.push(min);
            }
            let max = this.maxValue;
            let space = Math.ceil(max / length);
            for (let i = 0; i < length; i++) {
                let newMin = min + space
                arr.push(newMin);
                min = newMin;
            }
            return arr;
        },
        priceFormat(val, decimals) {
            return priceFormat(val, decimals);
        },
    }
}
</script>

<style lang="scss" scoped>
.progress-rank {
    .item {
        position: relative;

        &-wrapper {
            max-height: 290px;
            overflow-y: auto;
        }

        &-label {
            font-size: 14px;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 21px;
            position: absolute;
            top: 17px;
            left: 0;
            min-width: 60px;
            text-align: right;
        }

        &-progress {
            padding: 20px 20px 6px 70px;
            overflow: hidden;

            .progress {
                height: 12px;
                background: linear-gradient(90deg, rgba(251, 71, 66, 1) 0%, rgba(251, 177, 66, 1) 100%);
                border-radius: 10px;
                box-sizing: border-box;
                position: relative;
                float: left;
                //max-width: 330px;
                &-value {
                    font-size: 12px;
                    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                    font-weight: 400;
                    color: #FFFFFF;
                    line-height: 12px;
                    float: left;
                    margin-left: 12px;

                    &.absolute {
                        position: absolute;
                        right: 17px;
                        top: 2px;
                    }
                }
            }
        }
    }

    &__line {
        font-size: 12px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 18px;
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        margin: 10px 20px 0 70px;
        border-top: 1px solid rgba(255, 255, 255, 0.15);
    }
}
</style>