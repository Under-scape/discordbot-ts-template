FROM node:latest

WORKDIR /app

COPY . /app

RUN npm clean-install && \
    npm run build && \
    npm run register

CMD [ "npm", "run", "start" ]
