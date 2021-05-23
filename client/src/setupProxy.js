const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://[::1]:5000',
            changeOrigin: true,
            "secure": false,
        })
    );
};