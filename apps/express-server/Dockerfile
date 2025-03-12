# Base Image
FROM node:20-alpine3.18 AS phase1

WORKDIR /app

# Run pnpm only if package.json changes
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
RUN pnpm

# build express-server
RUN pnpm build

# run server in dev env
CMD ["pnpm", "workspace", "express-server", "start"]
