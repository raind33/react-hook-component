const path = require('path');

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        index: ['./src/index.ts']
    },
    output: {
        filename: 'rain-hook-component.js',
        path: path.join(__dirname, 'dist/umd'),
        library: 'rain',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.build.json'
                }
            },
            {
              test: /\.scss$/, // 匹配所有 .scss 文件
              use: [
                'style-loader', // 将 CSS 注入到 DOM 中
                'css-loader',   // 将 CSS 转换成 CommonJS 模块
                'sass-loader'   // 将 Sass 编译成 CSS
              ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        dayjs: 'dayjs'
    }
};
