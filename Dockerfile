FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3001

ENV NODE_ENV=production

CMD ["npm", "run", "start"]