import * as element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// console.log(element);

// element.install = (Vue) => {
//     Object.keys(element).forEach(key => {
//         if(element[key].name) {
//             Vue.component(element[key].name, element[key])
//         }
//     })
// }

export default {
    install(Vue) {
        Vue.use(element)
    },
}
