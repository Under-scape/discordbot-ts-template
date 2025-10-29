FROM node:22

COPY . .

RUN npm i

CMD [ "npm", "run", "start" ]