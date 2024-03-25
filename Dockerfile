FROM node:20.11-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

CMD npx prisma generate && npx prisma migrate deploy && npm run start:dev