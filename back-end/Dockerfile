# Utilisez une image Node.js en tant qu'image de base
FROM node:16-buster

# Créez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le fichier package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installez les dépendances de l'application
RUN npm install --frozen-lockfile

# Copiez le reste des fichiers de l'application dans le conteneur
COPY . .

# Exposez le port sur lequel l'application écoute
EXPOSE 3001

# Démarrez l'application lorsque le conteneur démarre
CMD [ "npm", "start" ]
