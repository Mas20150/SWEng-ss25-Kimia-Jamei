FROM node:20

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build (falls du TS kompilieren willst – optional)
RUN npm run build

# Expose Vite dev server port
EXPOSE 5173

# Start Vite dev server
CMD ["npm", "start"]
