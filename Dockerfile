# Stage 1: Install dependencies
FROM node:22-alpine AS deps
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build the application
FROM node:22-alpine AS builder
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set DATABASE_URL for build (dev.db is gitignored, so create it here)
ENV DATABASE_URL="file:./prisma/dev.db"

RUN npx prisma generate
# Create and seed the database for build-time static generation
RUN npx prisma migrate deploy
RUN node prisma/seed.mjs
# Build Next.js (SSG pages will query the seeded DB)
RUN npm run build

# Stage 3: Production runner
FROM node:22-alpine AS runner
RUN apk add --no-cache bash
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy standalone server
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Copy prisma files and the seeded database
COPY --from=builder /app/prisma ./prisma
# Prisma v7 generates client to src/generated/prisma (not node_modules/.prisma)
COPY --from=builder /app/src/generated/prisma ./src/generated/prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/better-sqlite3 ./node_modules/better-sqlite3

# Copy startup script
COPY scripts/start.sh ./start.sh
RUN chmod +x ./start.sh

EXPOSE 3000

CMD ["./start.sh"]
