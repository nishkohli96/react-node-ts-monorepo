# Base Image
FROM node:20-alpine3.18 as phase1

WORKDIR /app

# Run yarn only if package.json changes
# copied tsconfig as nestjs-server's tsconfig extends rootDir's tsconfig
COPY --chown=node:node turbo.json .
COPY --chown=node:node tsconfig.json .
COPY --chown=node:node package.json .

# first create these directories, else the copying won't work.
RUN mkdir -p apps/nestjs-server

# copying only the required packages
COPY --chown=node:node ./apps/nestjs-server/tsconfig.*.json apps/nestjs-server
COPY --chown=node:node ./apps/nestjs-server/package.json apps/nestjs-server
COPY --chown=node:node ./apps/nestjs-server apps/nestjs-server

# install node_modules
RUN yarn

# run server in prod env
CMD ["yarn", "workspace", "nestjs-server", "start:prod"]
