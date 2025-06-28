# 1. Schritt: Image vorbereiten
FROM node:20

# 2. Arbeitsverzeichnis im Container
WORKDIR /app

# 3. Kopiere package.json und installiere dependencies
COPY package*.json ./
RUN npm install

# 4. Kopiere den gesamten Code
COPY . .

# 5. Baue TypeScript falls nötig (hier nur optional)
RUN npm run build

# 6. Starte das Projekt z.B. mit lite-server
CMD ["npm", "run", "start"]
