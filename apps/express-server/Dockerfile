ARG NODE_VERSION=24
ARG ALPINE_VERSION=3.23

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base

# ARGs declared before the first FROM are not visible inside stages
ARG PNPM_VERSION=11.20.0

RUN npm i -g pnpm@${PNPM_VERSION}

WORKDIR /app

# Only the workspace manifests + express-server's package.json are needed to
# install express-server's dependencies; the root pnpm-lock.yaml covers all apps.
FROM base AS builder

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/express-server/package.json apps/express-server/
RUN pnpm install --frozen-lockfile --filter ./apps/express-server...

COPY apps/express-server apps/express-server
RUN pnpm --filter ./apps/express-server build

FROM base AS runner

ENV NODE_ENV=production

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/express-server/package.json apps/express-server/
RUN pnpm install --frozen-lockfile --prod --ignore-scripts --filter ./apps/express-server...

WORKDIR /app/apps/express-server

COPY --from=builder /app/apps/express-server/dist ./dist
COPY apps/express-server/ecosystem.config.js ./

# winston writes to ./logs, which the non-root user must be able to create
RUN mkdir logs && chown node:node logs

USER node

EXPOSE 8000

# pm2-runtime keeps pm2 in the foreground (see README.md) and forwards
# SIGTERM to the app. nodeLinker=hoisted puts the binary in the workspace
# root, not in the app.
CMD ["/app/node_modules/.bin/pm2-runtime", "start", "ecosystem.config.js"]
