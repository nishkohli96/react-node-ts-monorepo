ARG NODE_VERSION=24
ARG ALPINE_VERSION=3.23

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base

# ARGs declared before the first FROM are not visible inside stages
ARG PNPM_VERSION=11.20.0

# Check https://github.com/nodejs/docker-node/tree/main#nodealpine
# to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN npm i -g pnpm@${PNPM_VERSION}

# pnpm-workspace.yaml sets nodeLinker=hoisted, which installs every app in the
# lockfile even when only one package.json is copied. Use the isolated layout
# here instead (as an env var, so `pnpm build` below sees the same layout as
# the install).
ENV pnpm_config_node_linker=isolated

WORKDIR /app

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Only the workspace manifests + the package.json of next-client and of the
# workspace package it depends on are needed to install its dependencies; the
# root pnpm-lock.yaml covers all apps.
FROM base AS builder

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/common/package.json packages/common/
COPY apps/next-client/package.json apps/next-client/
RUN pnpm install --frozen-lockfile

# The `...` suffix builds the dependencies of the app (common -> dist/) before the app.
# A path selector needs the braces, `./apps/x...` silently skips the dependencies.
COPY packages/common packages/common
COPY apps/next-client apps/next-client
RUN pnpm --filter "{./apps/next-client}..." build

FROM base AS runner

ENV NODE_ENV=production

# common is loaded at runtime: its package.json lets pnpm resolve the workspace
# link, its built dist/ is copied in below.
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/common/package.json packages/common/
COPY apps/next-client/package.json apps/next-client/
RUN pnpm install --frozen-lockfile --prod --ignore-scripts

COPY --from=builder /app/packages/common/dist packages/common/dist

WORKDIR /app/apps/next-client

# next.config.ts is read at runtime by `next start` (images, headers, etc.)
COPY --from=builder --chown=node:node /app/apps/next-client/.next ./.next
COPY --from=builder /app/apps/next-client/public ./public
COPY --from=builder /app/apps/next-client/next.config.ts ./

USER node

EXPOSE 3000

# Call next directly (not via pnpm) so SIGTERM reaches the server process
CMD ["node_modules/.bin/next", "start"]
