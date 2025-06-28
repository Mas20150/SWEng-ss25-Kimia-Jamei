FROM node:20
WORKDIR /app

COPY package*.json ./
COPY bs-config.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "start"]
