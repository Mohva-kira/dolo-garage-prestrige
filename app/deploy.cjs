require('dotenv').config();
const { execSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

const remoteUser = process.env.DEPLOY_USER;
const remoteHost = process.env.DEPLOY_HOST;
const remotePath = process.env.DEPLOY_PATH;
const remotePort = process.env.DEPLOY_PORT || '22';
const localBuildPath = 'dist';
const hashFile = 'build-hash.txt';

if (!remoteUser || !remoteHost || !remotePath) {
  console.error('❌ Erreur : Variables DEPLOY_USER, DEPLOY_HOST ou DEPLOY_PATH manquantes dans .env');
  process.exit(1);
}

// Fonction pour générer un hash à partir du contenu de src/ et public/
function generateBuildHash(dirPath) {
  const hash = crypto.createHash('sha256');
  const files = fse.readdirSync(dirPath, { withFileTypes: true });

  files.forEach(file => {
    const filePath = path.join(dirPath, file.name);
    if (file.isDirectory()) {
      hash.update(generateBuildHash(filePath));
    } else {
      const content = fs.readFileSync(filePath);
      hash.update(content);
    }
  });

  return hash.digest('hex');
}

const [srcHash, publicHash] = ['src', 'public'].map(generateBuildHash);
const fullHash = srcHash + publicHash;
let previousHash = '';

if (fs.existsSync(hashFile)) {
  previousHash = fs.readFileSync(hashFile, 'utf8').trim();
}

if (fullHash === previousHash) {
  console.log('✅ Aucun changement détecté dans le code source. Le déploiement est annulé.');
  process.exit(0);
}

try {
  console.log('📦 Changements détectés. Build de l’application React...');
  execSync('npx cross-env CI=false npm run build', { stdio: 'inherit' });

  console.log('🚀 Déploiement avec rsync...');
  const scpCommand = `scp -P ${remotePort} -r ${localBuildPath}/* ${remoteUser}@${remoteHost}:${remotePath}`;
  execSync(scpCommand, { stdio: 'inherit' });

  fs.writeFileSync(hashFile, fullHash);
  console.log('✅ Déploiement terminé avec succès !');
} catch (error) {
  console.error('❌ Erreur pendant le déploiement :', error.message);
  process.exit(1);
}