# Base Image
FROM node:20-alpine3.18 AS phase1

WORKDIR /app

# first create these directories, else the copying won't work.
RUN mkdir -p packages/core-lib
RUN mkdir -p apps/frontend

# Run yarn only if package.json changes
# copied tsconfig as core-lib's tsconfig extends rootDir's tsconfig
COPY --chown=node:node turbo.json .
COPY --chown=node:node tsconfig.json .
COPY --chown=node:node package.json .


# copying only the required packages
COPY --chown=node:node ./packages/core-lib/package.json packages/core-lib
COPY --chown=node:node ./packages/core-lib packages/core-lib

COPY --chown=node:node ./apps/react-client/package.json apps/react-client
COPY --chown=node:node ./apps/react-client apps/frontend

# install node_modules
RUN npm install
RUN yarn lib:build

# build react-client
RUN yarn build

# Phase 2 - Get the Build and host on nginx
FROM nginx:1.25.4-alpine
COPY --from=phase1 /app/apps/frontend/build /usr/share/nginx/html
