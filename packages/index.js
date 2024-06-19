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
import ele from './ele/index'
import zyElmUpload from './element/upload'
import tableEl from './tableEl/src/tableEl.vue'
import zyMind from './mind/src/mind.vue'
import fontTitle from './fontTitle/src/fontTitle.vue'

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
    zyElmUpload,
    tableEl,
    zyMind,
    fontTitle
]

const install = (Vue) => {
    if(install.installed) return
    install.installed = true
    Vue.use(ele)
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
