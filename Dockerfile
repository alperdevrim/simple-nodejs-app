FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Wait for MongoDB to be ready
CMD ["sh", "-c", "npm start"] 