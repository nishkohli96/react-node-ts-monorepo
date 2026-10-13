ARG NODE_VERSION=24
ARG ALPINE_VERSION=3.23

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base

# ARGs declared before the first FROM are not visible inside stages
ARG PNPM_VERSION=11.20.0

# Check https://github.com/nodejs/docker-node/tree/main#nodealpine
# to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN npm i -g pnpm@${PNPM_VERSION}

WORKDIR /app

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Only the workspace manifests + next-client's package.json are needed to
# install next-client's dependencies; the root pnpm-lock.yaml covers all apps.
FROM base AS builder

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/next-client/package.json apps/next-client/
RUN pnpm install --frozen-lockfile --filter ./apps/next-client...

COPY apps/next-client apps/next-client
RUN pnpm --filter ./apps/next-client build

FROM base AS runner

ENV NODE_ENV=production

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/next-client/package.json apps/next-client/
RUN pnpm install --frozen-lockfile --prod --ignore-scripts --filter ./apps/next-client...

WORKDIR /app/apps/next-client

# next.config.ts is read at runtime by `next start` (images, headers, etc.)
COPY --from=builder --chown=node:node /app/apps/next-client/.next ./.next
COPY --from=builder /app/apps/next-client/public ./public
COPY --from=builder /app/apps/next-client/next.config.ts ./

USER node

EXPOSE 3000

# Call next directly (not via pnpm) so SIGTERM reaches the server process.
# nodeLinker=hoisted puts the binary in the workspace root, not in the app.
CMD ["/app/node_modules/.bin/next", "start"]
