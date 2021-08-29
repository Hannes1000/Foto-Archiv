const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: process.env.NODE_ENV === 'PRODUCTION' ? "https://franz-fotoarchiv.herokuapp.com":'https://[::1]:5000',
            changeOrigin: true,
            "secure": false,
        })
    );
};