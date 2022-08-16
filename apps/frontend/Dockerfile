# Base Image
FROM node:17-alpine3.14 as phase1

WORKDIR /app

# Can't use these stmt as husky doesnt get installed & unable to
# create directories
# ENV NODE_ENV production
# USER node

# first create these directories, else the copying won't work.
RUN mkdir -p packages/core-lib
RUN mkdir -p apps/frontend

# Run yarn only if package.json changes
# copied tsconfig as core-lib's tsconfig extends rootDir's tsconfig
COPY --chown=node:node package.json .
COPY --chown=node:node tsconfig.json .


# copying only the required packages
COPY --chown=node:node ./packages/core-lib/package.json packages/core-lib
COPY --chown=node:node ./packages/core-lib packages/core-lib

COPY --chown=node:node ./apps/frontend/package.json apps/frontend
COPY --chown=node:node ./apps/frontend apps/frontend

# install node_modules
RUN npm install
RUN yarn build:lib

# build frontend
RUN yarn frontend:build

# Phase 2 - Get the Build and host on nginx
FROM nginx:1.21.6-alpine
COPY --from=phase1 /app/apps/frontend/build /usr/share/nginx/html
