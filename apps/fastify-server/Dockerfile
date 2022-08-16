# Base Image
FROM node:17-alpine3.14 as phase1

WORKDIR /app
ENV NODE_ENV production

# Run yarn only if package.json changes
COPY package.json .

# first create these directories, else the copying won't work.
RUN mkdir -p apps/fastify-server

# copying only the required packages
COPY ./apps/fastify-server/package.json apps/fastify-server
COPY ./apps/fastify-server apps/fastify-server

# install node_modules
RUN npm install

# build fastify-server
RUN yarn fastify-server:build

# run the build
CMD ["node", "apps/fastify-server/dist/main.js"]