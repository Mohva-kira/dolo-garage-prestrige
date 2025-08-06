const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

// Configuration spécifique pour N-Genius
const ngeniusConfig = {
  targetUrl: process.env.TARGET_URL || 'https://api-gateway.sandbox.ngenius-payments.com/',
  changeOrigin: true,
  secure: true,
  followRedirects: true,
  timeout: 30000,
  onError: (err, req, res) => {
    console.error('Erreur proxy N-Genius:', err.message);
    res.status(500).json({ 
      error: 'Erreur de communication avec N-Genius', 
      details: err.message 
    });
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log('Requête proxy N-Genius:', {
      method: req.method,
      url: req.url,
      headers: req.headers
    });
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log('Réponse proxy N-Genius:', {
      statusCode: proxyRes.statusCode,
      headers: proxyRes.headers
    });
  }
};

// Configuration générale du proxy
const proxyConfig = {
  targetUrl: process.env.TARGET_URL || 'https://api.orange.com/',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // remove /api prefix when forwarding to the target
  },
  onError: (err, req, res) => {
    res.status(500).json({ error: 'Proxy error', details: err.message });
  },
};

module.exports = { proxyConfig, ngeniusConfig };
