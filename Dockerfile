FROM node:22.1.0-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]