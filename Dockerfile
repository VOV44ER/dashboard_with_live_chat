FROM node:16.15-alpine

COPY public /app/public

COPY src /app/src

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY tsconfig.json /app/tsconfig.json
COPY .eslintrc.json /app/.eslintrc.json
COPY .env.staging /app/.env.staging

WORKDIR /app

RUN npm install
CMD ["npm", "start"]