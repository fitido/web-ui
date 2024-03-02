const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/notes',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_PROXY || 'http://localhost:3001',
      changeOrigin: true,
    })
  );
};
