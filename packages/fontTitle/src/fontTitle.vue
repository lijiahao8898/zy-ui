<template>
    <div class="font-home">
        <div class="gradient-text" id="gradient-text1-gradient-text1">{{ fontText }}</div>
        <div class="gradient-text2" id="gradient-text2-gradient-text2">{{ fontText }}</div>
    </div>
</template>

<script>
export default {
    name: "zy-fontTitle",
    props: {
        // 字体颜色
        fontColor1: {
            default: '#f00',
            type: String
        },
        fontColor2: {
            default: '#0f0',
            type: String
        },
        // 字体大小
        fontSize: {
            default: '100px',
            type: String
        },
        // 字体内容
        fontText: {
            default: '字体内容',
            type: String
        },
        textShadow: {
            default: '',
            type: String
        },
        fontFamily: {
            default: 'PangMenZhengDaoBiaoTi',
            type: String
        },
        background: {
            default: 'linear-gradient(to bottom,#f00, #0f0)',
            type: String
        }
    },
    data() {
        return {
        };
    },

    watch: {},
    mounted() {
        // console.log(this.fontColor,this.fontSize, 122);
        let text1 = document.getElementById('gradient-text1-gradient-text1')
        let text2 = document.getElementById('gradient-text2-gradient-text2')
        this.$nextTick(() => {
            text1.style.cssText = `
                font-size :${this.fontSize};
                background:linear-gradient(to bottom, ${this.fontColor1}, ${this.fontColor2});
                -webkit-background-clip: text;
                color: transparent;
                position: absolute;
                z-index: 9999;
                font-family: ${this.fontFamily};
                `
            if (this.background) {
                text1.style.cssText = `
                font-size :${this.fontSize};
                background: ${this.background};
                -webkit-background-clip: text;
                color: transparent;
                position: absolute;
                z-index: 9999;
                font-family: ${this.fontFamily};
                `
            }
            if (this.textShadow) {
                text2.style.cssText = `
                font-size :${this.fontSize};
                text-shadow: ${this.textShadow};
                font-family: ${this.fontFamily};
            `} else {
                text2.style.cssText = `
                font-size :${this.fontSize};
                font-family: ${this.fontFamily};
            `
            }

        })
    },
    computed: {},

    methods: {},

    created() { },

};

</script>

<style lang="scss" scoped>
.font-home {
    white-space:nowrap;
    position: relative;
    // font-family: v-bind(fontFamily);


    // font-size: 60px;
}

.gradient-text {
    // background: linear-gradient(to bottom, v-bind(fontColor1), v-bind(fontColor2));
    -webkit-background-clip: text;
    /* WebKit browsers */
    color: transparent;
    position: absolute;
    z-index: 9999;
    // font-size: v-bind(fontSize);
}

.gradient-text2 {
    position: absolute;
    // text-shadow: v-bind(textShadow);
    // font-size: v-bind(fontSize);
}
</style>
