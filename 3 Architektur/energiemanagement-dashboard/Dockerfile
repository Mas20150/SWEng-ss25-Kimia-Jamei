# 1. Basis-Image
FROM node:20-alpine

# 2. Arbeitsverzeichnis erstellen
WORKDIR /app

# 3. Abhängigkeiten kopieren und installieren
COPY package*.json ./
RUN npm install

# 4. Code kopieren
COPY . .

# 5. Build (optional, wenn du z. B. Vite verwendest)
# RUN npm run build

# 6. Starten mit z. B. vite oder einem Static Server
CMD ["npm", "run", "dev"]
