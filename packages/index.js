import Item from './item';
import Button from './button'
import Progress from './progress'
import Pie from './pie'
import StarScore from './starScore'
import InsuranceSelect from "./insuranceSelect";
import Flip from './flip';
import CountUpSlide from './countUpSlide';
import CircleScroll from './circleScroll';
import TextRain from './textRain';
import Step from './step';
import Waterfall from './waterfall';
import Relation from './Relation';
import VerifyBox from "./verifyBox";
import ImageCompare from './imageCompare'
import Voice from "./animate";
import Mind from './mind/src/mind.vue'
import FontTitle from './fontTitle/src/fontTitle.vue'

import ElmUpload from './element/upload'
import ElmTable from './element/table/src/table.vue'

import element from './element'

import ModalDialog from './modalDialog'

const components = [
    Item,
    Button,
    Progress,
    Pie,
    StarScore,
    InsuranceSelect,
    Flip,
    CountUpSlide,
    CircleScroll,
    TextRain,
    Step,
    Waterfall,
    Relation,
    VerifyBox,
    ImageCompare,
    Voice,
    ElmUpload,
    ElmTable,
    Mind,
    FontTitle
]

const install = (Vue, options = {}) => {
    if(install.installed) return
    install.installed = true
    Vue.use(element)
    Vue.use(ModalDialog, options)
    components.map(component => {
        Vue.component(component.name, component)
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    ...components
}
