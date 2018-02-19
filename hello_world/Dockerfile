FROM node:carbon

COPY package.json package.json
RUN yarn install

COPY . .

EXPOSE 1234
CMD ["node", "server/server.js"]