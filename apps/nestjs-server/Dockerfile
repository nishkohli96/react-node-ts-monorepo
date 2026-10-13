ARG NODE_VERSION=24
ARG ALPINE_VERSION=3.23

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base

# ARGs declared before the first FROM are not visible inside stages
ARG PNPM_VERSION=11.20.0

RUN npm i -g pnpm@${PNPM_VERSION}

WORKDIR /app

# Only the workspace manifests + nestjs-server's package.json are needed to
# install nestjs-server's dependencies; the root pnpm-lock.yaml covers all apps.
FROM base AS builder

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/nestjs-server/package.json apps/nestjs-server/
RUN pnpm install --frozen-lockfile --filter ./apps/nestjs-server...

COPY apps/nestjs-server apps/nestjs-server
RUN pnpm --filter ./apps/nestjs-server build

FROM base AS runner

ENV NODE_ENV=production

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/nestjs-server/package.json apps/nestjs-server/
RUN pnpm install --frozen-lockfile --prod --ignore-scripts --filter ./apps/nestjs-server...

WORKDIR /app/apps/nestjs-server

COPY --from=builder /app/apps/nestjs-server/dist ./dist

USER node

EXPOSE 4000

# Run node directly (not via pnpm) so SIGTERM reaches the server process
CMD ["node", "dist/main"]
