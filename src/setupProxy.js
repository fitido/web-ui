const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/notes',
    createProxyMiddleware({
      target: process.env.NDOE_ENV === 'production' ? 'https://fitido-server.onrender.com' : 'http://localhost:3001',
      changeOrigin: true,
    })
  );

  app.use(
    '/trainers',
    createProxyMiddleware({
      target: process.env.NDOE_ENV === 'production' ? 'https://fitido-server.onrender.com' : 'http://localhost:3001',
      changeOrigin: true,
    })
  );

  app.use(
    '/trainees',
    createProxyMiddleware({
      target: process.env.NDOE_ENV === 'production' ? 'https://fitido-server.onrender.com' : 'http://localhost:3001',
      changeOrigin: true,
    })
  );
  
};
