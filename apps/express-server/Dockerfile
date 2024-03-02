# Base Image
FROM node:20-alpine3.18 as phase1

WORKDIR /app

# Run yarn only if package.json changes
# copied tsconfig as express-server's tsconfig extends rootDir's tsconfig
COPY --chown=node:node turbo.json .
COPY --chown=node:node tsconfig.json .
COPY --chown=node:node package.json .

# first create these directories, else the copying won't work.
RUN mkdir -p apps/express-server

# copying only the required packages
COPY --chown=node:node ./apps/express-server/package.json apps/express-server
COPY --chown=node:node ./apps/express-server apps/express-server

# install node_modules
RUN yarn

# build express-server
RUN yarn build

# run server in dev env
CMD ["yarn", "workspace", "express-server", "start"]
