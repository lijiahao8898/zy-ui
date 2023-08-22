<template>
    <div class="input-box">
        <label class="simple-input-content" for="simpleInput1">
            <span class="highlight">{{simpleInput1.slice(0,1)}}</span>
            <span :class="simpleInput1.length > 1?'highlight':''">{{simpleInput1.slice(1,2)}}</span>
            <span :class="simpleInput1.length > 2?'highlight':''">{{simpleInput1.slice(2,3)}}</span>
            <span :class="simpleInput1.length > 3?'highlight':''">{{simpleInput1.slice(3,4)}}</span>
            <span :class="simpleInput1.length > 4?'highlight':''">{{simpleInput1.slice(4,5)}}</span>
            <span :class="simpleInput1.length > 5?'highlight':''">{{simpleInput1.slice(5,6)}}</span>
        </label>
        <input id="simpleInput1" v-model="simpleInput1" maxlength="6" type="text" placeholder="请输⼊六位数字验证码" />
    </div>
</template>

<script>
export default {
    data () {
        return {
            simpleInput1: ''
        }
    },
    watch: {
        simpleInput1 (val) {
            if(val.length === 6) {
                console.log('接口请求', val)

            }
        }
    }
}
</script>

<style>
#simpleInput1 {

}

.simple-input-content {
    display: flex;
}

.simple-input-content span {
    width: 80px;
    height: 80px;
    background: #ccc;
    color: #fff;
    line-height: 80px;
    margin-right: 20px;
    text-align: center;
    font-size: 40px;
}
</style>
