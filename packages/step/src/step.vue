<template>
  <div class="step">
    <div class="step-wrapper">
      <div class="step-item"
           v-for="(item, index) in stepList"
           :key="index"
           :class="{active: curIndex === (index + 1)}"
      >
        <div class="step-item__wrapper">
          <div class="step-item__success" v-if="curIndex > (index + 1)"></div>
          <div class="step-item__active" v-if="curIndex === (index + 1)">进行中</div>
          <div class="step-item__index" v-if="curIndex < (index + 1)">{{ index + 1 }}</div>
          <div class="step-item__label">{{ item.label }}</div>
        </div>
        <div class="step-item__line"
             v-if="index < (stepList.length - 1)"
             :class="{done: curIndex > (index + 1)}"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'zy-step',
  props: {
    stepList: {
      default: () => [
        {label: '吴洪慧派发联审'},
        {label: '各部门出具意见查看(12-12)'},
        {label: '张适意见汇总'},
        {label: '是否竣工验收'},
        {label: '是否竣工验收'},
        {label: '是否竣工验收'},
        {label: '是否竣工验收'},
        {label: '是否竣工验收'},
        {label: '是否竣工验收'},
        {label: '是否竣工验收'},
      ]
    },
    curIndex: {
      default: 6
    }
  },
  data() {
    return {}
  },
  methods: {},

}
</script>

<style lang="scss" scoped>
.step {
  width: 100%;

  &-wrapper {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    overflow-y: hidden;
    overflow-x: auto;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;

    &::-webkit-scrollbar {
      width: 0 !important
    }
  ;
    position: relative;
    z-index: 1;
  }

  &-item {
    max-width: 90px;
    margin: 0 9px;
    flex-shrink: 0;
    position: relative;

    &.active {
      .step-item {
        &__label {
          color: #1890FF;
        }

        &__active {
          font-size: 11px;
          height: 20px;
          line-height: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #1890FF;
          margin-bottom: 10px;
          padding: 0 7px 0 8px;
          border: 1px solid #1890FF;
          border-radius: 10px;
          background: #fff;
          box-sizing: border-box;
        }
      }
    }

    &__line {
      width: 100px;
      height: 4px;
      background: #F7F7F7;
      position: absolute;
      top: 8px;
      right: -55px;
      z-index: -1;

      &.done {
        background: rgba(24, 144, 255, 0.14);
      }
    }

    &__label {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #C5C5C5;
      line-height: 14px;
    }

    &__index {
      font-size: 11px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #C5C5C5;
      padding: 0 6px;
      background: #F7F7F7;
      border-radius: 100%;
      margin: 0 auto 10px;
      display: inline-block;
      min-width: 20px;
      height: 20px;
      line-height: 20px;
      box-sizing: border-box;
      text-align: center;
    }

    &__success {
      width: 20px;
      height: 20px;
      background: url("../src/images/icon-success.png") no-repeat 0 0;
      background-size: cover;
      border-radius: 100%;
      margin: 0 auto 10px;
    }
  }
}
</style>
