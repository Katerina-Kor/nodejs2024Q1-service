FROM node:20.11-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# RUN npm run build
CMD npx prisma migrate dev && npm run start:dev