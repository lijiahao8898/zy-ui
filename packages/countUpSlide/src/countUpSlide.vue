<template>
    <div class="counter">
        <span class="n0"
              v-for="(item, index) in numberArr.length"
              :key="index">
            <i>0</i>
            <i>1</i>
            <i>2</i>
            <i>3</i>
            <i>4</i>
            <i>5</i>
            <i>6</i>
            <i>7</i>
            <i>8</i>
            <i>9</i>
        </span>
    </div>
</template>

<script>
export default {
    name: 'zy-count-up-slide',
    props: ['number'],
    data() {
        return {
            numberArr: []
        }
    },
    watch: {
        number(val) {
            if (val) {
                this.numberArr = val.toString().split('')
                setTimeout(() => {
                    this.setCounter(val);
                }, 300)
            }
        }
    },
    methods: {
        setCounter(count) {
            var $digital = document.querySelectorAll('.counter span');
            for (var i = $digital.length - 1; i >= 0; i--) {
                var val = parseInt(count / Math.pow(10, i), 10);
                count = count % Math.pow(10, i);
                $digital[$digital.length - 1 - i].setAttribute('class', 'n' + (val % 10));
            }
        }
    }
}
</script>

<style lang="css" scoped>
.counter {
    display: inline-block;
    padding: 5px 10px
}

.counter span {
    position: relative;
    display: inline-block;
    width: 34px;
    height: 47px;
    line-height: 47px;
    overflow: hidden;
    text-align: center;
    margin: 0 4px;
    color: #fff;
    font-size: 40px;
    font-weight: bold;
}

.counter span i {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    height: 100%;
    width: 100%;
    font-style: normal;
    -moz-transition: top 0.6s;
    -o-transition: top 0.6s;
    -webkit-transition: top 0.6s;
    transition: top 0.6s;
    background: url("../images/number-bg.png") no-repeat 0 bottom;
    background-size: cover;
}

.counter span.n0 i:nth-child(1) {
    top: calc(0 * 100%)
}

.counter span.n0 i:nth-child(2) {
    top: calc(-1 * 100%)
}

.counter span.n0 i:nth-child(3) {
    top: calc(-2 * 100%)
}

.counter span.n0 i:nth-child(4) {
    top: calc(-3 * 100%)
}

.counter span.n0 i:nth-child(5) {
    top: calc(-4 * 100%)
}

.counter span.n0 i:nth-child(6) {
    top: calc(-5 * 100%)
}

.counter span.n0 i:nth-child(7) {
    top: calc(-6 * 100%)
}

.counter span.n0 i:nth-child(8) {
    top: calc(-7 * 100%)
}

.counter span.n0 i:nth-child(9) {
    top: calc(-8 * 100%)
}

.counter span.n0 i:nth-child(10) {
    top: calc(-9 * 100%)
}

.counter span.n1 i:nth-child(1) {
    top: calc(1 * 100%)
}

.counter span.n1 i:nth-child(2) {
    top: calc(0 * 100%)
}

.counter span.n1 i:nth-child(3) {
    top: calc(-1 * 100%)
}

.counter span.n1 i:nth-child(4) {
    top: calc(-2 * 100%)
}

.counter span.n1 i:nth-child(5) {
    top: calc(-3 * 100%)
}

.counter span.n1 i:nth-child(6) {
    top: calc(-4 * 100%)
}

.counter span.n1 i:nth-child(7) {
    top: calc(-5 * 100%)
}

.counter span.n1 i:nth-child(8) {
    top: calc(-6 * 100%)
}

.counter span.n1 i:nth-child(9) {
    top: calc(-7 * 100%)
}

.counter span.n1 i:nth-child(10) {
    top: calc(-8 * 100%)
}

.counter span.n2 i:nth-child(1) {
    top: calc(2 * 100%)
}

.counter span.n2 i:nth-child(2) {
    top: calc(1 * 100%)
}

.counter span.n2 i:nth-child(3) {
    top: calc(0 * 100%)
}

.counter span.n2 i:nth-child(4) {
    top: calc(-1 * 100%)
}

.counter span.n2 i:nth-child(5) {
    top: calc(-2 * 100%)
}

.counter span.n2 i:nth-child(6) {
    top: calc(-3 * 100%)
}

.counter span.n2 i:nth-child(7) {
    top: calc(-4 * 100%)
}

.counter span.n2 i:nth-child(8) {
    top: calc(-5 * 100%)
}

.counter span.n2 i:nth-child(9) {
    top: calc(-6 * 100%)
}

.counter span.n2 i:nth-child(10) {
    top: calc(-7 * 100%)
}

.counter span.n3 i:nth-child(1) {
    top: calc(3 * 100%)
}

.counter span.n3 i:nth-child(2) {
    top: calc(2 * 100%)
}

.counter span.n3 i:nth-child(3) {
    top: calc(1 * 100%)
}

.counter span.n3 i:nth-child(4) {
    top: calc(0 * 100%)
}

.counter span.n3 i:nth-child(5) {
    top: calc(-1 * 100%)
}

.counter span.n3 i:nth-child(6) {
    top: calc(-2 * 100%)
}

.counter span.n3 i:nth-child(7) {
    top: calc(-3 * 100%)
}

.counter span.n3 i:nth-child(8) {
    top: calc(-4 * 100%)
}

.counter span.n3 i:nth-child(9) {
    top: calc(-5 * 100%)
}

.counter span.n3 i:nth-child(10) {
    top: calc(-6 * 100%)
}

.counter span.n4 i:nth-child(1) {
    top: calc(4 * 100%)
}

.counter span.n4 i:nth-child(2) {
    top: calc(3 * 100%)
}

.counter span.n4 i:nth-child(3) {
    top: calc(2 * 100%)
}

.counter span.n4 i:nth-child(4) {
    top: calc(1 * 100%)
}

.counter span.n4 i:nth-child(5) {
    top: calc(0 * 100%)
}

.counter span.n4 i:nth-child(6) {
    top: calc(-1 * 100%)
}

.counter span.n4 i:nth-child(7) {
    top: calc(-2 * 100%)
}

.counter span.n4 i:nth-child(8) {
    top: calc(-3 * 100%)
}

.counter span.n4 i:nth-child(9) {
    top: calc(-4 * 100%)
}

.counter span.n4 i:nth-child(10) {
    top: calc(-5 * 100%)
}

.counter span.n5 i:nth-child(1) {
    top: calc(5 * 100%)
}

.counter span.n5 i:nth-child(2) {
    top: calc(4 * 100%)
}

.counter span.n5 i:nth-child(3) {
    top: calc(3 * 100%)
}

.counter span.n5 i:nth-child(4) {
    top: calc(2 * 100%)
}

.counter span.n5 i:nth-child(5) {
    top: calc(1 * 100%)
}

.counter span.n5 i:nth-child(6) {
    top: calc(0 * 100%)
}

.counter span.n5 i:nth-child(7) {
    top: calc(-1 * 100%)
}

.counter span.n5 i:nth-child(8) {
    top: calc(-2 * 100%)
}

.counter span.n5 i:nth-child(9) {
    top: calc(-3 * 100%)
}

.counter span.n5 i:nth-child(10) {
    top: calc(-4 * 100%)
}

.counter span.n6 i:nth-child(1) {
    top: calc(6 * 100%)
}

.counter span.n6 i:nth-child(2) {
    top: calc(5 * 100%)
}

.counter span.n6 i:nth-child(3) {
    top: calc(4 * 100%)
}

.counter span.n6 i:nth-child(4) {
    top: calc(3 * 100%)
}

.counter span.n6 i:nth-child(5) {
    top: calc(2 * 100%)
}

.counter span.n6 i:nth-child(6) {
    top: calc(1 * 100%)
}

.counter span.n6 i:nth-child(7) {
    top: calc(0 * 100%)
}

.counter span.n6 i:nth-child(8) {
    top: calc(-1 * 100%)
}

.counter span.n6 i:nth-child(9) {
    top: calc(-2 * 100%)
}

.counter span.n6 i:nth-child(10) {
    top: calc(-3 * 100%)
}

.counter span.n7 i:nth-child(1) {
    top: calc(7 * 100%)
}

.counter span.n7 i:nth-child(2) {
    top: calc(6 * 100%)
}

.counter span.n7 i:nth-child(3) {
    top: calc(5 * 100%)
}

.counter span.n7 i:nth-child(4) {
    top: calc(4 * 100%)
}

.counter span.n7 i:nth-child(5) {
    top: calc(3 * 100%)
}

.counter span.n7 i:nth-child(6) {
    top: calc(2 * 100%)
}

.counter span.n7 i:nth-child(7) {
    top: calc(1 * 100%)
}

.counter span.n7 i:nth-child(8) {
    top: calc(0 * 100%)
}

.counter span.n7 i:nth-child(9) {
    top: calc(-1 * 100%)
}

.counter span.n7 i:nth-child(10) {
    top: calc(-2 * 100%)
}

.counter span.n8 i:nth-child(1) {
    top: calc(8 * 100%)
}

.counter span.n8 i:nth-child(2) {
    top: calc(7 * 100%)
}

.counter span.n8 i:nth-child(3) {
    top: calc(6 * 100%)
}

.counter span.n8 i:nth-child(4) {
    top: calc(5 * 100%)
}

.counter span.n8 i:nth-child(5) {
    top: calc(4 * 100%)
}

.counter span.n8 i:nth-child(6) {
    top: calc(3 * 100%)
}

.counter span.n8 i:nth-child(7) {
    top: calc(2 * 100%)
}

.counter span.n8 i:nth-child(8) {
    top: calc(1 * 100%)
}

.counter span.n8 i:nth-child(9) {
    top: calc(0 * 100%)
}

.counter span.n8 i:nth-child(10) {
    top: calc(-1 * 100%)
}

.counter span.n9 i:nth-child(1) {
    top: calc(9 * 100%)
}

.counter span.n9 i:nth-child(2) {
    top: calc(8 * 100%)
}

.counter span.n9 i:nth-child(3) {
    top: calc(7 * 100%)
}

.counter span.n9 i:nth-child(4) {
    top: calc(6 * 100%)
}

.counter span.n9 i:nth-child(5) {
    top: calc(5 * 100%)
}

.counter span.n9 i:nth-child(6) {
    top: calc(4 * 100%)
}

.counter span.n9 i:nth-child(7) {
    top: calc(3 * 100%)
}

.counter span.n9 i:nth-child(8) {
    top: calc(2 * 100%)
}

.counter span.n9 i:nth-child(9) {
    top: calc(1 * 100%)
}

.counter span.n9 i:nth-child(10) {
    top: calc(0 * 100%)
}
</style>
