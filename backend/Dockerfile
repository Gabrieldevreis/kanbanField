FROM node:22 AS builder

WORKDIR /app

COPY backend/package.json backend/package-lock.json ./
RUN npm install

COPY backend .
RUN npm run build

# ----------

FROM node:22

WORKDIR /app

COPY backend/package.json backend/package-lock.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 8002
CMD ["node", "dist/main.js"]
