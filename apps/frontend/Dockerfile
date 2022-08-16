# Base Image
FROM node:17-alpine3.14 as phase1

WORKDIR /app
ENV NODE_ENV production

# To prevent the "command tsc not found" issue
# RUN npm i -g typescript

# Run yarn only if package.json changes
# copied tsconfig as core-lib's tsconfig extends rootDir's tsconfig
COPY package.json .
COPY tsconfig.json .

# first create these directories, else the copying won't work.
RUN mkdir -p packages/core-lib
RUN mkdir -p apps/frontend

# copying only the required packages
COPY ./packages/core-lib/package.json packages/core-lib
COPY ./packages/core-lib packages/core-lib

COPY ./apps/frontend/package.json apps/frontend
COPY ./apps/frontend apps/frontend

# install node_modules
RUN npm install
RUN yarn build:lib

# build frontend
RUN yarn frontend:build

# Phase 2 - Get the Build and host on nginx
FROM nginx:1.21.6-alpine
COPY --from=phase1 /app/apps/frontend/build /usr/share/nginx/html
