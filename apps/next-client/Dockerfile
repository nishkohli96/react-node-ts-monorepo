FROM node:20-alpine3.18 AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# first create these directories, else the copying won't work.
RUN mkdir -p apps/next-client

# Run yarn only if package.json changes
# copied tsconfig as core-lib's tsconfig extends rootDir's tsconfig
COPY --chown=node:node turbo.json .
COPY --chown=node:node tsconfig.json .
COPY --chown=node:node package.json .

# Install dependencies based on the preferred package manager
COPY ./apps/next-client/package.json  ./apps/next-client
RUN yarn --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn workspace next-client build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/next-client/public ./apps/next-client/public

# Set the correct permission for prerender cache
RUN mkdir apps/next-client/.next
RUN chown nextjs:nodejs apps/next-client/.next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/next-client/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/next-client/.next/static ./apps/next-client/.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]