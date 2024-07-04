const components = require('./components.json');
const entries = {}
const webpack = require('webpack')

Object.keys(components).forEach((item) => {
    entries[item] = components[item];
})

const fs = require('fs')
const path = require('path')
const join = path.join
const resolve = (dir) => path.join(__dirname, '../', dir)

console.log(entries);

console.log(`---------------------------`)

if(process.env.NODE_ENV === 'production') {
    module.exports = {
        outputDir: 'lib',
        productionSourceMap: false,
        configureWebpack: {
            entry: entries,
            optimization: {
                minimize: false,
                minimizer: [
                    (compiler) => {
                        console.log(compiler)
                        const option = compiler.options.terserOptions.compress;
                        option.drop_console = false; // 打开开关
                    }
                ]
            },
            output: {
                filename: '[name]/index.js',
                // libraryTarget: 'commonjs2',
                libraryTarget: 'commonjs2',
                // umdNamedDefine: true,
                // globalObject: 'typeof self !== \'undefined\' ? self : this',
                libraryExport: 'default',
                // 已经设置 libraryTarget: 'commonjs2'，无需设置 library
                // library: 'zy-libraries',
            },
            externals: {
                'element-ui': 'element-ui'
            },
            resolve: {
                extensions: ['.js', '.vue', '.json'],
                alias: {
                    'src': resolve('src'),
                    'packages': resolve('packages'),
                    'zy-libraries': resolve('packages/index.js'),
                }
            },
        },
        css: {
            sourceMap: false,
            extract: {
                filename: '[name]/style.css'
            }
        },
        chainWebpack: config => {
            // 删除splitChunks，在打包组件的时候，并不希望抽离每个组件的公共js出来，而是每个独立打包，于是删除这个配置
            config.optimization.delete('splitChunks')
            config.optimization.minimizer
            // 删除copy：不要复制public文件到打包目录
            config.plugins.delete('copy')
            // 删除preload以及prefetch，因为删除了html插件，所以这两个也没用；
            config.plugins.delete('preload')
            config.plugins.delete('prefetch')
            // 删除html，只打包组件，不生成html页面；
            config.plugins.delete('html')
            // 删除hmr，删除hot-module-reload；
            config.plugins.delete('hmr')
            // 删除自动加上的入口：app
            config.entryPoints.delete('app')
            // 下面的配置fonts这个rule，打包字体的时候，输出到打包目录的static/fonts目录下；
            config.module
                .rule('fonts')
                .use('url-loader')
                .tap(option => {
                    option.fallback.options.name = 'static/fonts/[name].[hash:8].[ext]'
                    return option
                })
        }
    };
} else {
    module.exports = {
        // 将 examples 目录添加为新的页面
        // 将 src 修改为 examples
        pages: {
            index: {
                // page 的入口
                entry: 'examples/main.js',
                // 模板来源
                template: 'public/index.html',
                // 输出文件名
                filename: 'index.html',
                // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
                title: 'zy-library document',
                // 在这个页面中包含的块，默认情况下会包含
                // 提取出来的通用 chunk 和 vendor chunk。
                chunks: ['chunk-vendors', 'chunk-common', 'index']
            }
        },
        configureWebpack: {
            resolve: {
                extensions: ['.js', '.vue', '.json'],
                alias: {
                    'src': resolve('src'),
                    'packages': resolve('packages'),
                    'zy-libraries': resolve('packages/index.js'),
                }
            },
        },
    }
}
