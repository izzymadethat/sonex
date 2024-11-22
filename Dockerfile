FROM oven/bun:latest AS builder
WORKDIR /app
COPY package*.json turbo.json bun.lockb ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/
RUN bun install
COPY . .
COPY frontend ./frontend/
COPY backend ./backend/
RUN bun --cwd frontend build


FROM node:18.20.4-alpine AS runner
WORKDIR /app
COPY --from=builder /app/frontend/dist /app/frontend/dist
COPY --from=builder /app/backend /app/backend

EXPOSE 4000
CMD ["npm", "--prefix", "backend", "start"]
