ARG NODE_VERSION=24
ARG ALPINE_VERSION=3.23

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base

# ARGs declared before the first FROM are not visible inside stages
ARG PNPM_VERSION=11.20.0

RUN npm i -g pnpm@${PNPM_VERSION}

# pnpm-workspace.yaml sets nodeLinker=hoisted, which installs every app in the
# lockfile even when only one package.json is copied. Use the isolated layout
# here instead (as an env var, so `pnpm build` below sees the same layout as
# the install).
ENV pnpm_config_node_linker=isolated

WORKDIR /app

# Only the workspace manifests + the package.json of express-server and of the
# workspace package it depends on are needed to install its dependencies; the
# root pnpm-lock.yaml covers all apps.
FROM base AS builder

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/common/package.json packages/common/
COPY apps/express-server/package.json apps/express-server/
RUN pnpm install --frozen-lockfile

# The `...` suffix builds the dependencies of the app (common -> dist/) before the app.
# A path selector needs the braces, `./apps/x...` silently skips the dependencies.
COPY packages/common packages/common
COPY apps/express-server apps/express-server
RUN pnpm --filter "{./apps/express-server}..." build

FROM base AS runner

ENV NODE_ENV=production

# common is loaded at runtime: its package.json lets pnpm resolve the workspace
# link, its built dist/ is copied in below.
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/common/package.json packages/common/
COPY apps/express-server/package.json apps/express-server/
RUN pnpm install --frozen-lockfile --prod --ignore-scripts

COPY --from=builder /app/packages/common/dist packages/common/dist

WORKDIR /app/apps/express-server

COPY --from=builder /app/apps/express-server/dist ./dist
COPY apps/express-server/ecosystem.config.js ./

# winston writes to ./logs, which the non-root user must be able to create
RUN mkdir logs && chown node:node logs

USER node

EXPOSE 8000

# pm2-runtime keeps pm2 in the foreground (see README.md) and forwards
# SIGTERM to the app.
CMD ["node_modules/.bin/pm2-runtime", "start", "ecosystem.config.js"]
