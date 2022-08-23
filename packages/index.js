import Item from './item';
import Button from './button'
import Progress from './progress'
import Pie from './pie'
import StarScore from './starScore'
import InsuranceSelect from "./insuranceSelect";
import Flip from './flip';
import CountUpSlide from './countUpSlide';
// import ele from './ele/index'

const components = [Item, Button, Progress, Pie, StarScore, InsuranceSelect, Flip, CountUpSlide]

const install = (Vue) => {
    if(install.installed) return
    install.installed = true
    components.map(component => {
        Vue.component(component.name, component)
    })
    // Vue.use(ele)
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    ...components
}
