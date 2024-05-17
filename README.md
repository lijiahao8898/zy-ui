# zy-libraries

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### build lib to publish npm
```
npm run build && npm publish
```

## 如何使用
```
npm install zy-libraries --save

import zyLibraries from 'zy-libraries';
import 'zy-libraries/lib/entry/style.css

Vue.use(zyLibraries)

<zy-item></zy-item>
```

## 按需加载的引入

安装 `babel-plugin-component` 并创建 `.babelrc` 进行如下配置：
```javascript
{
    "plugins": [
        [
            "component",
            {
                "libraryName": "zy-libraries"
            }
        ]
    ]
}
```
在 `*.vue` 中：
```javascript
import {zyItem} from 'zy-libraries'
```

`babel-plugin-component` 会将引入的代码进行转换，vue-cli3 请使用 `babel-plugin-import`

```js
import { Button } from 'components'

// 转换成
var button = require('components/lib/button')
require('components/lib/button/style.css')
```

### 以 `element-ui` 为例
配置 `.babelrc` 文件
```
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```
以下代码会被转换
```js
import {Button,Icon} from 'element-ui'

// 转成成
const Button = require('element-ui/lib/button.js')
require('element-ui/theme-chalk/button.css')

const Icon = require('element-ui/lib/icon.js')
require('element-ui/theme-chalk/icon.css')
```
其中在引入css的时候，其中的`theme-chalk`路径是通过`.babelrc`文件中的`styleLibraryName`确定的，引入js的时候，
其中的`lib`是通过`.babelrc`文件中的`libDir`属性决定的，只不过这个属性的默认值是`lib`；

## zy-libraries 的按需引入

`.babelrc`配置
```
{
  "presets": [["env", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "zy-libraries",
        "style": true
      }
    ]
  ]
}
```
最终会查找到 `zy-libraries/lib`

`main.js`配置或者在相应使用到的地方
```
import {zyItem} from 'zy-libraries';
Vue.use(zyItem);
```
