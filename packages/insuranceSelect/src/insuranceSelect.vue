<template>
    <div class="insurance-select" ref="insuranceSelect" @mousemove="mousemoveHandler">
        <img class="insurance-select__icon" v-show="row.select" src="./images/icon-select.png"
             alt="">
        <input class="insurance-select__select"
               :class="{selected: row.select}"
               placeholder="请选择保险公司"
               @mouseenter="focusHandler"
               @mouseleave="blurHandler"
               @input="filterHandler"
               @blur="blurHandler"
               v-model="selectValue" />
        <img class="insurance-select__icon__right" v-show="row.select"
             src="./images/icon-arrow-right-2.png" alt="">

        <div class="insurance-select__list">
            <div class="list-wrapper" ref="listWrapper">
                <div class="list-wrapper__container" v-if="optionList.length > 0">
                    <div class="list"
                         :class="{selected: row.select === item.name}"
                         v-for="(item, index) in optionList"
                         :key="index"
                         @click="selectHandler(item)"
                    >
                        <div class="list-text">{{ item.name }}</div>
                        <img v-if="row.select === item.name" src="./images/icon-select.png" alt="">
                        <img v-else src="./images/icon-un-select.png" alt="">
                    </div>
                </div>
                <div class="list-wrapper__container" v-else>
                    <div class="list">
                        <div class="list-text">暂无对应保险公司</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'zy-insurance-select',
    props: ['row', 'optionListCacheList'],
    data() {
        return {
            // optionListCacheList: [
            //     {
            //         name: '中国人寿财产保险',
            //     },
            //     {
            //         name: '中国平安',
            //     },
            //     {
            //         name: '中国人寿财产保险2',
            //     },
            //     {
            //         name: '中国人寿财产保险3',
            //     },
            //     {
            //         name: '中国人寿财产保险4',
            //     },
            // ],
            optionList: [],
            selectValue: ''
        }
    },
    mounted() {
        this.focusHandler()
    },
    methods: {
        mousemoveHandler() {
            let target = {}
            if (this.$refs.insuranceSelect.getBoundingClientRect) {
                // 这个属性频繁计算会引发页面的重绘，可能会对页面的性能造成影响。
                target = this.$refs.insuranceSelect.getBoundingClientRect();
            } else {
                let [top, left] = this.getAbsPosition(this.$refs.insuranceSelect);
                target.left = left
                target.top = top
            }
            const scrollLeft =  document.documentElement.scrollLeft
            const scrollTop =  document.documentElement.scrollTop
            this.$refs.listWrapper.style.left = target.left + scrollLeft + 'px'
            this.$refs.listWrapper.style.top = (target.top + 60) + scrollTop + 'px'
            this.$refs.listWrapper.style.width = target.width + 'px'
        },
        getAbsPosition(el) {
            let el2 = el;
            let curtop = 0;
            let curleft = 0;
            if (document.getElementById || document.all) {
                do {
                    curleft += el.offsetLeft - el.scrollLeft;
                    curtop += el.offsetTop - el.scrollTop;
                    el = el.offsetParent;
                    el2 = el2.parentNode;
                    while (el2 != el) {
                        curleft -= el2.scrollLeft;
                        curtop -= el2.scrollTop;
                        el2 = el2.parentNode;
                    }
                } while (el.offsetParent);

            } else if (document.layers) {
                curtop += el.y;
                curleft += el.x;
            }
            return [curtop, curleft];
        },
        selectHandler(item) {
            this.$emit('selected', item)
            this.selectValue = this.row.select;
        },
        filterHandler(e) {
            if (e.target.value) {
                this.optionList = this.optionListCacheList.filter(item => item.name.indexOf(e.target.value) !== -1)
            } else {
                this.optionList = this.optionListCacheList.map(item => ({
                    ...item
                }))
            }
        },
        blurHandler () {
            setTimeout(() => {
                this.selectValue = this.row.select;
            }, 300)
        },
        focusHandler () {
            this.optionList = this.optionListCacheList.map(item => ({
                ...item
            }))
            this.selectValue = this.row.select
        }
    }
}
</script>

<style lang="scss" scoped>
.insurance-select {
    //width: 280px;
    height: 50px;
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 rgba(204, 204, 204, 0.5);
    border-radius: 4px;
    position: relative;

    &:hover {
        .insurance-select__list {
            .list-wrapper {
                padding: 10px;

                &__container {
                    max-height: 150px;
                    overflow-y: auto;
                }
            }
        }
    }

    &__icon {
        width: 16px;
        height: 16px;
        position: absolute;
        top: 17px;
        left: 8px;
    }

    &__icon__right {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 15px;
        right: 8px;
    }

    &__list {
        padding: 10px 0;

        .list {
            height: 40px;
            border-radius: 2px;
            padding: 0 8px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: background .3s;

            &.selected {
                background: rgba(81, 176, 139, 0.14);
            }

            &:hover {
                background: rgba(81, 176, 139, 0.14);
            }

            &-wrapper {
                background: #FFFFFF;
                box-shadow: 0 2px 4px 0 rgba(204, 204, 204, 0.5);
                border-radius: 4px;
                position: fixed;
                width: 260px;
                z-index: 10;
                padding: 0 10px;
                transition: padding .3s;

                &__container {
                    max-height: 0;
                    overflow-y: auto;
                    transition: max-height .3s;
                }
            }

            &-text {
                font-size: 16px;
                font-family: MicrosoftYaHei;
                color: #383838;
                line-height: 40px;
            }

            img {
                width: 16px;
                height: 16px;
            }
        }
    }

    input {
        -webkit-appearance: none;
        background-color: #FFF;
        background-image: none;
        -webkit-border-radius: 4px;
        border-radius: 4px;
        border: 0 solid #DCDFE6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 50px;
        line-height: 50px;
        outline: 0;
        padding: 0 15px;
        -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        width: 100%;
        cursor: pointer;

        &.selected {
            padding-left: 32px;
        }

        &::placeholder {
            font-size: 16px;
            font-family: MicrosoftYaHei;
            color: #AFAFAF;
            line-height: 16px;
        }
    }
}
</style>
