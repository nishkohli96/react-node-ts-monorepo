FROM node:20-alpine3.18 AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine 
# to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
# Set working directory in the container
WORKDIR /app
# first create these directories, else the copying won't work.
RUN mkdir -p apps/next-client
# Copy package.json and package-lock.json to the container
COPY --chown=node:node package.json ./
COPY --chown=node:node ./apps/next-client/package.json  ./apps/next-client
# Install dependencies
RUN yarn --frozen-lockfile


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/package.json /app
COPY --from=deps /app/node_modules ./node_modules
# Copy the rest of the application code to the container
COPY ./apps/next-client ./apps/next-client

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

# Build the Next.js app
RUN yarn workspace next-client build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/next-client/public ./apps/next-client/public

# Set the correct permission for prerender cache
RUN mkdir apps/next-client/.next
RUN chown nextjs:nodejs apps/next-client/.next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/apps/next-client/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/next-client/.next/static ./apps/next-client/.next/static

USER nextjs

# Expose the port Next.js app runs on (default is 3000)
EXPOSE 3000

# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
# CMD ["node", "./apps/next-client/server.js"]
CMD [ "ls" ]