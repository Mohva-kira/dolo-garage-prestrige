const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const proxyConfig = {
  targetUrl: process.env.TARGET_URL || 'https://api.orange.com/', // URL cible
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // remove /api prefix when forwarding to the target
  },
  onError: (err, req, res) => {
    res.status(500).json({ error: 'Proxy error', details: err.message });
  },
};

module.exports = proxyConfig;