import zyItem from './item/index';
import zyButton from './button/index'
import ele from './ele/index'

const components = [zyItem, zyButton]

const install = (Vue) => {
    if(install.installed) return
    install.installed = true
    components.map(component => {
        Vue.component(component.name, component)
    })
    Vue.use(ele)
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    ...components
}
