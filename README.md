# ElectroAuto - Plateforme E-commerce d'Accessoires et Pièces Automobiles

## 📋 Aperçu du Projet

ElectroAuto est une plateforme e-commerce complète dédiée à la vente d'accessoires et de pièces automobiles. Le projet comprend une application web React, un backend Strapi, un serveur proxy pour les paiements, et une future application mobile React Native.

## 🏗️ Architecture du Projet

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │  Proxy Server   │    │   Backend       │
│   React.js      │◄──►│   Node.js       │◄──►│   Strapi CMS    │
│   (Port 3000)   │    │  (Port 3008)    │    │   (Port 1337)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Mobile App     │    │  Payment APIs   │    │   Database      │
│ React Native    │    │  (N-Genius)     │    │   MySQL/SQLite  │
│ (En développement)│   │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Structure du Projet

```
elrctro_auto/
├── app/                          # Application React Frontend
│   ├── src/
│   │   ├── components/           # Composants réutilisables
│   │   ├── pages/               # Pages de l'application
│   │   ├── reducers/            # Redux store et slices
│   │   ├── services/            # Services API
│   │   ├── assets/              # Images, données statiques
│   │   └── styles/              # Feuilles de style
│   ├── public/                  # Fichiers publics
│   └── package.json
│
├── server/                       # Backend Strapi
│   ├── src/
│   │   ├── api/                 # APIs Strapi
│   │   ├── admin/               # Configuration admin
│   │   └── extensions/          # Extensions personnalisées
│   ├── config/                  # Configuration Strapi
│   ├── database/                # Migrations et schémas
│   └── package.json
│
├── node-proxy-server/           # Serveur Proxy pour Paiements
│   ├── src/
│   │   ├── config/              # Configurations API
│   │   └── index.js             # Serveur Express
│   └── package.json
│
├── docker-compose.yml           # Configuration Docker
└── package.json                 # Configuration racine
```

## 🚀 Technologies Utilisées

### Frontend (React.js)
- **React 18** - Framework frontend
- **Redux Toolkit** - Gestion d'état
- **React Router** - Routage
- **Bootstrap/Reactstrap** - UI Components
- **Framer Motion** - Animations
- **React i18next** - Internationalisation (FR/EN)
- **Firebase** - Authentification et stockage
- **React Icons** - Icônes

### Backend (Strapi)
- **Strapi v4** - Headless CMS
- **MySQL/PostgreSQL** - Base de données principale
- **SQLite** - Base de données de développement
- **Sharp** - Traitement d'images

### Proxy Server (Node.js)
- **Express.js** - Serveur web
- **Axios** - Client HTTP
- **CORS** - Gestion des requêtes cross-origin
- **http-proxy-middleware** - Proxy middleware

### Mobile (À venir)
- **React Native** - Framework mobile
- **Expo** - Plateforme de développement

## 🛠️ Installation et Configuration

### Prérequis
- Node.js 14.19.1+ (≤18.x.x)
- npm 6.0.0+
- MySQL ou PostgreSQL
- Docker (optionnel)

### 1. Configuration du Backend Strapi

```bash
cd server
npm install

# Configuration de la base de données dans config/database.js
# Créer le fichier .env avec vos variables d'environnement

npm run develop  # Mode développement
# ou
npm run build && npm start  # Mode production
```

### 2. Configuration du Serveur Proxy

```bash
cd node-proxy-server
npm install

# Créer le fichier .env
cat > .env << EOF
TARGET_URL=https://api-gateway.sandbox.ngenius-payments.com/
API_KEY=your_orange_api_key_here
PORT=3008
EOF

npm start
```

### 3. Configuration du Frontend React

```bash
cd app
npm install

# Créer le fichier .env
cat > .env << EOF
REACT_APP_PROXY_URL=http://localhost:3008/api/ngenius/
REACT_APP_STRAPI_URL=http://localhost:1337
EOF

npm start
```

### 4. Démarrage avec Docker

```bash
# Démarrage complet avec Docker Compose
docker-compose up -d

# Ou services individuels
docker-compose up app      # Frontend seulement
docker-compose up mysql    # Base de données seulement
```

## 💳 Système de Paiement

### Configuration N-Genius

Le projet utilise un serveur proxy pour sécuriser les transactions avec l'API N-Genius Payments.

#### Variables d'environnement requises :

**Proxy Server (`node-proxy-server/.env`):**
```env
TARGET_URL=https://api-gateway.sandbox.ngenius-payments.com/
API_KEY=your_orange_api_key_here
PORT=3008
```

**Application React (`app/.env`):**
```env
REACT_APP_PROXY_URL=http://localhost:3008/api/ngenius/
```

#### Flux de paiement :

```
Client → React App → Proxy Server → N-Genius API → Réponse
```

### Avantages du Proxy

1. **Sécurité** : Protection des clés API
2. **CORS** : Résolution des problèmes de cross-origin
3. **Logs** : Traçabilité des transactions
4. **Gestion d'erreurs** : Centralisation du traitement d'erreurs
5. **Rate limiting** : Contrôle du taux de requêtes

## 🌍 Internationalisation

Le projet supporte plusieurs langues :
- 🇫🇷 Français (par défaut)
- 🇬🇧 Anglais

Les fichiers de traduction se trouvent dans `app/src/lng/`.

## 📱 Application Mobile (React Native)

**Statut** : En développement

L'application mobile sera développée avec :
- React Native + Expo
- Même backend Strapi
- Authentification partagée
- Interface adaptée mobile

## 🔧 Scripts Disponibles

### Frontend
```bash
npm start        # Développement
npm run build    # Production
npm test         # Tests
```

### Backend Strapi
```bash
npm run develop  # Mode développement avec admin
npm run start    # Mode production
npm run build    # Build de production
```

### Proxy Server
```bash
npm start        # Démarrage du serveur proxy
```

## 🐛 Dépannage

### Erreurs Communes

1. **Port déjà utilisé** :
   ```bash
   # Vérifier les ports utilisés
   netstat -ano | findstr :3000
   netstat -ano | findstr :1337
   netstat -ano | findstr :3008
   ```

2. **Problèmes de base de données** :
   - Vérifiez la configuration dans `server/config/database.js`
   - Assurez-vous que MySQL/PostgreSQL est démarré

3. **Proxy non accessible** :
   ```bash
   # Tester le proxy
   curl http://localhost:3008/api/ngenius/identity/auth/access-token
   ```

4. **Problèmes CORS** :
   - Vérifiez la configuration CORS dans le proxy
   - Assurez-vous que les URLs sont correctes

### Logs et Surveillance

- **Frontend** : Console du navigateur
- **Backend** : Logs Strapi en temps réel
- **Proxy** : Logs détaillés des requêtes/réponses
- **Docker** : `docker-compose logs [service]`

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit vos changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push sur la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créez une Pull Request

## 📄 Licence

Ce projet est sous licence ISC.

## 👥 Équipe

- **Auteur** : Mohva
- **Projet** : ElectroAuto E-commerce Platform

---

**Note** : Ce projet est en développement actif. L'application mobile React Native sera disponible prochainement.
