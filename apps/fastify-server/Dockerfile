# Base Image
FROM node:17-alpine3.14 as phase1

WORKDIR /app
# Can't use this stmt as husky isnt installed & build fails
#ENV NODE_ENV production

# first create these directories, else the copying won't work.
RUN mkdir -p apps/fastify-server

# Run yarn only if package.json changes
COPY --chown=node:node package.json .

# copying only the required packages
COPY --chown=node:node ./apps/fastify-server/package.json apps/fastify-server
COPY --chown=node:node ./apps/fastify-server apps/fastify-server

# install node_modules
RUN npm install

# build fastify-server
RUN yarn fastify-server:build

# run the build
CMD ["node", "apps/fastify-server/dist/main.js"]