<template>
    <div class="wrapper-option">
        <el-form ref="form" :inline="true">
            <el-form-item v-for="(item,index) in data" :key="String(index)">

                <!-- input -->
                <el-input v-if="item.type === 'input'"
                          v-model="item.value"
                          :placeholder="'请输入' + item.label"
                          style="width:150px;"
                          @keyup.enter.native="search"
                ></el-input>

                <!-- select -->
                <el-select v-else-if="item.type === 'select'"
                           v-model="item.value"
                           :placeholder="'请选择' + item.label"
                           clearable
                           filterable
                           style="width:150px;">
                    <el-option :value="option.value" v-for="(option,index) in item.option" :key="String(index)"
                               :label="option.label">
                    </el-option>
                </el-select>

                <!-- data -->
                <el-date-picker
                    v-else-if="item.type === 'date'"
                    unlink-panels
                    :format="item.format"
                    :value-format="item.format"
                    v-model="item.value"
                    :type="item.dateType"
                    range-separator="-"
                    :start-placeholder="item.label"
                    :end-placeholder="item.label"
                    :style="{width: (item.dateType.indexOf('range') !== -1 ? '360px' : '180px')}"
                ></el-date-picker>

                <div v-else>
                    <el-input v-model="item.value[0]" placeholder="" style="width:90px;"></el-input>
                    -
                    <el-input v-model="item.value[1]" placeholder="" style="width:90px;"></el-input>
                </div>

            </el-form-item>
            <div class="clearfix" style="display: inline-block">
                <div class="fl">
                    <el-button type="primary" @click="search">查 询</el-button>
                    <el-button style="background: darkorange;color: #fff;" @click="resetForm">
                        重 置
                    </el-button>
                </div>
                <slot></slot>
            </div>
        </el-form>
    </div>
</template>
<script>
const arr = ['Number', 'String', 'Function', 'Array', 'Object', 'Date'];
arr.forEach((item) => {
    window[`is${item}`] = (str2) => {
        return Object.prototype.toString.call(str2) === `[object ${item}]`;
    };
});
const getTimeStr = (time, isShort = false, interval = "-") => {
    if (window.isNumber(time) || window.isString(time)) time = new Date(time);
    if (!window.isDate(time)) return '';
    let format = isShort ? `YYYY${interval}MM${interval}dd` : 'YYYY-MM-dd hh:mm:ss';
    const date = {
        'M+': time.getMonth() + 1,
        'd+': time.getDate(),
        'h+': time.getHours(),
        'm+': time.getMinutes(),
        's+': time.getSeconds(),
        'q+': Math.floor((time.getMonth() + 3) / 3),
        'S+': time.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
        }
    }
    return format;
};

export default {
    name: 'zy-search-group',
    data() {
        return {
            data: [],
            searchMore: false
        };
    },
    props: ['initData'],
    watch: {
        initData: {
            handler() {
                this.resetSearch();
            },
            deep: true
        },
    },
    created() {
        this.resetSearch();
    },
    methods: {
        resetSearch() {
            this.data = JSON.parse(JSON.stringify(this.initData));
        },
        search() {
            this.$emit('search', this.getFormData());
        },
        getFormData() {
            let formData = {};
            this.data.forEach(function (item) {
                if (item.type == 'date') {
                    if (item.dateType.indexOf('range') !== -1) {
                        if (!item.value) {
                            item.value = [];
                        }
                        let [start, end] = item.value;
                        if (item.format) {
                            formData[item.key[0]] = start || '';
                            formData[item.key[1]] = end || '';
                        } else {
                            formData[item.key[0]] = +start ? getTimeStr(start, item.isShort) : '';
                            let formTimeStr = item.isShort ? +end + 86399000 : +end;
                            formData[item.key[1]] = +end ? getTimeStr(formTimeStr, item.isShort) : '';
                        }
                    } else {
                        formData[item.key] = item.value;
                    }
                } else if (item.type == 'numberBetween') {
                    item.key.forEach((dataKey, index) => {
                        formData[dataKey] = item.value[index];
                    });
                } else if (item.type == 'select') {
                    let defaultVal = item.default == 0 ? item.default : '';
                    formData[item.key] = item.value || defaultVal;
                } else {
                    formData[item.key] = item.value || parseInt(item.value) === 0 ? item.value : '';
                }
            });
            return formData;
        },
        resetForm() {
            this.data.forEach((item, index) => {
                item.value = '';
                this.$set(this.data, index, item);
            });
            this.$emit('reset');
            this.$emit('search', this.getFormData());
        },
    }
};
</script>
<style lang="scss" scoped>
.wrapper-option {
    /*background: #f2f9ff;*/
    /*padding: 8px;*/
    margin-bottom: 20px;

    /deep/ .el-select,
    /deep/ .el-range-editor {
        width: 100%;
    }

    /deep/ .el-form {
        .el-form-item {
            margin-bottom: 0;
        }
        .el-form-item--mini.el-form-item,
        .el-form-item--small.el-form-item {
            margin-bottom: 0;
        }
    }

    /deep/ .el-button {
        width: 88px;
        height: 38px;
        line-height: 38px;
        border: none;
        padding: 0;
    }
}
</style>
