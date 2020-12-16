import Item from './item/index';
import Button from './button/index'
import Progress from './progress/index'
import Pie from './pie/index'
// import ele from './ele/index'

const components = [Item, Button, Progress, Pie]

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
