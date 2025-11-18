FROM node:latest

WORKDIR /app

COPY . /app

RUN npm i && \
    npm run build && \
    npm run register

CMD [ "npm", "run", "start" ]