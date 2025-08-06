require('dotenv').config();

const express = require('express');
const axios = require('axios');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { proxyConfig, ngeniusConfig } = require('./config/ngeniusConfig');
const cinetPayConfig = require('./config/cinetPayConfig');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3008;

app.use(express.json());

// Configuration CORS spécifique pour les credentials
app.use(cors({
    origin: function (origin, callback) {
        // Permettre les requêtes sans origin (applications mobiles, etc.)
        if (!origin) return callback(null, true);
        
        // Liste des origines autorisées
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://127.0.0.1:3000',
            'http://162.19.229.99:3009',
            process.env.FRONTEND_URL
        ].filter(Boolean);
        
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Non autorisé par CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Content-Type', 'Authorization']
}));

// Vérification des variables d'environnement
if (!process.env.API_KEY) {
    console.error("Erreur : ORANGE API KEY  n'est pas défini dans .env");
    process.exit(1); // Arrête l'exécution si la variable est absente
}

// Endpoint pour interagir avec l'API Orange
app.get('/api/fetch', async (req, res) => {
    const { endpoint, ...params } = req.query;

    if (!endpoint) {
        return res.status(400).json({ error: "L'endpoint est requis." });
    }

    try {
        const response = await axios.post(
            `${proxyConfig.targetUrl}/${endpoint}`,
            new URLSearchParams({
                grant_type: 'client_credentials',
                ...params,
            }).toString(),
            {
                headers: {
                    Authorization: `Basic ${process.env.API_KEY}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        return res.status(response.status).json(response.data);
    } catch (error) {
        console.error("Erreur API Orange:", error.response?.data || error.message);
        return res.status(error.response?.status || 500).json({
            error: "Une erreur est survenue lors de la communication avec l'API Orange.",
            details: error.response?.data || error.message,
        });
    }
});

// Endpoint pour le paiement CinetPay
app.post('/api/payment', async (req, res) => {
    try {
        const { orderId, totalAmount, customerInfo, ...otherData } = req.body;
        
        // Vérification des paramètres requis
        if (!orderId || !totalAmount) {
            return res.status(400).json({ 
                error: 'Paramètres manquants', 
                message: 'orderId et totalAmount sont requis' 
            });
        }

        // Préparer les données du paiement
        const paymentData = {
            apikey: cinetPayConfig.apikey,
            site_id: cinetPayConfig.site_id,
            transaction_id: `fly-wifi_${orderId}_${new Date().toLocaleDateString('fr-FR')}`,
            amount: totalAmount,
            currency: 'XOF',
            channels: 'ALL',
            description: `Paiement pour la commande #${orderId}`,
            notify_url: cinetPayConfig.notify_url,
            return_url: `${process.env.FRONTEND_URL || 'http://flywifi.flyentreprise.com'}/payment/success`,
            cancel_url: `${process.env.FRONTEND_URL || 'http://flywifi.flyentreprise.com'}/payment/cancel`,
            // Informations client
            customer_name: customerInfo?.name || "Mohva",
            customer_surname: customerInfo?.surname || "Mohva lova",
            customer_email: customerInfo?.email || "mtandjo@flyentreprise.com",
            customer_phone_number: customerInfo?.phone || "2250714866884",
            customer_address: customerInfo?.address || "Angre",
            customer_city: customerInfo?.city || "Abidjan",
            customer_country: customerInfo?.country || "CI",
            customer_state: customerInfo?.state || "ABJ",
            customer_zip_code: customerInfo?.zipCode || "06510",
            ...otherData
        };

        // Appel à l'API CinetPay
        const response = await axios.post(cinetPayConfig.apiUrl, paymentData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        console.log('Réponse CinetPay:', response.data);

        // Vérifier si la réponse est valide
        if (response.data && response.data.code === '201') {
            return res.status(200).json({
                success: true,
                data: response.data,
                payment_url: response.data.data.payment_url
            });
        } else {
            return res.status(400).json({
                error: 'Erreur de paiement',
                message: response.data.message || 'Erreur inconnue',
                details: response.data
            });
        }

    } catch (error) {
        console.error('Erreur lors du paiement:', error.response?.data || error.message);
        return res.status(500).json({
            error: 'Erreur serveur',
            message: 'Une erreur est survenue lors du traitement du paiement',
            details: error.response?.data || error.message
        });
    }
});

// Endpoint pour les notifications CinetPay
app.post('/api/notify', async (req, res) => {
    try {
        const { cpm_trans_id, cpm_trans_status, cpm_amount, cpm_currency, signature } = req.body;
        
        console.log('Notification CinetPay reçue:', req.body);
        
        // Vérifier la signature si nécessaire
        // TODO: Ajouter la vérification de la signature
        
        // Traiter la notification selon le statut
        if (cpm_trans_status === 'ACCEPTED') {
            console.log(`Paiement accepté: ${cpm_trans_id} - Montant: ${cpm_amount} ${cpm_currency}`);
            
            // Ici vous pouvez mettre à jour votre base de données
            // ou envoyer des notifications à votre application frontend
            
            // Exemple : envoyer une notification à votre système
            // await updateOrderStatus(cpm_trans_id, 'PAID');
            
        } else {
            console.log(`Paiement refusé ou annulé: ${cpm_trans_id}`);
        }
        
        // Répondre avec succès à CinetPay
        res.status(200).json({ message: 'Notification reçue avec succès' });
        
    } catch (error) {
        console.error('Erreur lors du traitement de la notification:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Endpoint pour vérifier le statut d'une transaction
app.get('/api/payment/status/:transactionId', async (req, res) => {
    try {
        const { transactionId } = req.params;
        
        // Appel à l'API CinetPay pour vérifier le statut
        const response = await axios.post('https://api-checkout.cinetpay.com/v2/payment/check', {
            apikey: cinetPayConfig.apikey,
            site_id: cinetPayConfig.site_id,
            transaction_id: transactionId
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        res.json(response.data);
        
    } catch (error) {
        console.error('Erreur lors de la vérification du statut:', error);
        res.status(500).json({ 
            error: 'Erreur serveur', 
            message: 'Impossible de vérifier le statut de la transaction' 
        });
    }
});

// Endpoint pour N-Genius payments
app.all('/api/ngenius/*', async (req, res) => {
    try {
        const ngeniusPath = req.path.replace('/api/ngenius/', '');
        const ngeniusUrl = `${ngeniusConfig.targetUrl}${ngeniusPath}`;
        
        console.log('Requête N-Genius:', {
            path: ngeniusPath,
            url: ngeniusUrl,
            method: req.method,
            headers: req.headers
        });

        const response = await axios({
            method: req.method,
            url: ngeniusUrl,
            data: req.body,
            headers: {
                ...req.headers,
                host: undefined, // Supprime le header host pour éviter les conflits
            },
            timeout: ngeniusConfig.timeout,
            validateStatus: (status) => {
                return status >= 200 && status < 600; // Accepte tous les codes de statut
            }
        });

        // Copie les headers de la réponse
        Object.keys(response.headers).forEach(key => {
            res.set(key, response.headers[key]);
        });
        
        return res.status(response.status).json(response.data);

    } catch (error) {
        console.error('Erreur N-Genius:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        
        return res.status(error.response?.status || 500).json({
            error: 'Erreur lors de la communication avec N-Genius',
            details: error.response?.data || error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Middleware Proxy (exclut /api/fetch pour éviter le conflit)
app.use('/api', (req, res, next) => {
    if (req.path.startsWith('/fetch')) {
        return next(); // Exclut /api/fetch du proxy
    }
    createProxyMiddleware({
        target: proxyConfig.targetUrl,
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
    })(req, res, next);
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});
