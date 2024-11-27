FROM node:18-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Fix permissions and create necessary directories
RUN mkdir -p /app/dist/data && \
    chown -R node:node /app && \
    chmod -R 755 /app

USER node

EXPOSE 3000

CMD ["npm", "start"]
