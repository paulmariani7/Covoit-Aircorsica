# Utilisez une image Node.js en tant qu'image de base pour la construction de l'application
FROM node:14 as build

# Créez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le fichier package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installez les dépendances de l'application
RUN npm install

# Copiez le reste des fichiers de l'application dans le conteneur
COPY . .

# Construisez l'application front-end
RUN npm run build

# Utilisez une image légère basée sur Nginx pour le déploiement de l'application
FROM nginx:alpine

# Copiez les fichiers de construction de l'application dans le répertoire de travail Nginx
COPY --from=BUILD /app/build /var/www
COPY ./nginx.conf /etc/nginx/nginx.conf


# Exposez le port sur lequel Nginx écoute
EXPOSE 80

# Démarrez Nginx lorsque le conteneur démarre
CMD ["nginx", "-g", "daemon off;"]
