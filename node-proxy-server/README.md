# Node Proxy Server

Ce projet met en place un serveur proxy qui redirige les requêtes vers l'API d'Orange (api.orange.com). Il utilise Express pour gérer les requêtes et les réponses.

## Prérequis

- Node.js (version 14 ou supérieure)
- npm (version 6 ou supérieure)

## Installation

1. Clonez le dépôt :

   ```bash
   git clone <URL_DU_DEPOT>
   cd node-proxy-server
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Créez un fichier `.env` à la racine du projet et ajoutez vos variables d'environnement nécessaires.

## Configuration

- Le fichier `src/config/proxyConfig.js` contient la configuration du proxy, y compris l'URL de destination.

## Exécution

Pour démarrer le serveur, utilisez la commande suivante :

```bash
npm start
```

Le serveur écoutera par défaut sur le port 3000. Vous pouvez modifier ce port dans le fichier de configuration si nécessaire.

## Utilisation

Une fois le serveur en cours d'exécution, vous pouvez envoyer des requêtes à votre serveur proxy, qui les redirigera vers l'API d'Orange.

## Gestion des erreurs

Le serveur gère les erreurs et renvoie des réponses appropriées en cas de problème lors de la redirection des requêtes.

# Node Proxy Server avec intégration CinetPay

## Configuration

1. Copiez le fichier `.env.example` vers `.env`
2. Configurez vos variables d'environnement

## Endpoints disponibles

### `/api/payment` (POST)
Endpoint pour initier un paiement CinetPay

**Corps de la requête :**
```json
{
  "orderId": "12345",
  "totalAmount": 1000,
  "customerInfo": {
    "name": "John",
    "surname": "Doe",
    "email": "john.doe@example.com",
    "phone": "2250123456789",
    "address": "123 Rue Example",
    "city": "Abidjan",
    "country": "CI",
    "state": "ABJ",
    "zipCode": "00225"
  }
}
```

**Réponse :**
```json
{
  "success": true,
  "data": {
    "code": "201",
    "message": "CREATED",
    "data": {
      "payment_url": "https://checkout.cinetpay.com/...",
      "payment_token": "..."
    }
  },
  "payment_url": "https://checkout.cinetpay.com/..."
}
```

### `/api/notify` (POST)
Endpoint pour recevoir les notifications de CinetPay

### `/api/payment/status/:transactionId` (GET)
Endpoint pour vérifier le statut d'une transaction

## Utilisation depuis le frontend

```javascript
// Initier un paiement
const response = await fetch('/api/payment', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    orderId: '12345',
    totalAmount: 1000,
    customerInfo: {
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      // ... autres informations
    }
  })
});

const data = await response.json();
if (data.success) {
  // Rediriger vers l'URL de paiement
  window.location.href = data.payment_url;
}
```

## Contribuer

Les contributions sont les bienvenues ! Veuillez soumettre une demande de tirage pour toute amélioration ou correction.