module.exports = {
    // 关闭eslint
    lintOnSave: false,
    // 配置跨域,这里使用的是代理
    devServer: {
        proxy: {
            '/api': {
                // 接口所在的服务器
                target: 'http://gmall-h5-api.atguigu.cn',
                // pathRewrite: { '^/api': '' },
            }
        }
    }
}