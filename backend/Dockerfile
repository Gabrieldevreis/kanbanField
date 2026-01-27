# ---------- Stage 1: build ----------
    FROM node:22 AS builder

    WORKDIR /app
    
    # Dependências
    COPY backend/package*.json ./
    RUN npm install
    
    # Código do backend
    COPY backend/src ./src
    COPY backend/tsconfig*.json ./
    COPY backend/nest-cli.json ./
    
    # Prisma
    COPY backend/prisma ./prisma
    
    # Gera Prisma Client
    RUN npx prisma generate
    
    # Build Nest
    RUN npm run build
    
    
    # ---------- Stage 2: runtime ----------
    FROM node:22
    
    WORKDIR /app
    
    COPY backend/package*.json ./
    RUN npm install --omit=dev
    
    # Prisma Client
    COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
    COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
    
    # App compilado
    COPY --from=builder /app/dist ./dist
    
    EXPOSE 8001
    
    CMD ["node", "dist/main.js"]
    