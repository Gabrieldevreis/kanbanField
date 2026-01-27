# ---------- Stage 1: build ----------
    FROM node:22 AS builder

    WORKDIR /app
    
    COPY backend/package.json backend/package-lock.json ./
    RUN npm install
    
    COPY . .
    # Copia schema.prisma também
    COPY backend/prisma ./prisma
    COPY backend .
    
    # Gera o Prisma Client
    RUN npx prisma generate
    
    # Build do Nest
    RUN npm run build
    
    # ---------- Stage 2: runtime ----------
    FROM node:22
    
    WORKDIR /app
    
    COPY backend/package.json backend/package-lock.json ./
    RUN npm install --omit=dev
    
    # Prisma client gerado
    COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
    COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
    
    # Código compilado
    COPY --from=builder /app/dist ./dist
    
    EXPOSE 8001
    
    CMD ["node", "dist/main.js"]
    