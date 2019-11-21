const { override, addLessLoader, addWebpackAlias } = require('customize-cra');
const path = require('path');
process.env.GENERATE_SOURCEMAP = "false";
module.exports = override(
    //使用less
    addLessLoader({
        javascriptEnabled: true
    }),
    //设置别名
    addWebpackAlias({
        '@':path.join(__dirname,'./src')
    }),
)