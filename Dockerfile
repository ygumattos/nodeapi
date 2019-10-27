FROM node:alpine

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api

WORKDIR /home/node/alpine

COPY package.json yarn.* ./

RUN yarn

COPY --chown=node:node . .

EXPOSE 3001

CMD ["yarn", "dev"]
