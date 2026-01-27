# ---------- Stage 1: Build ----------
    FROM node:22 AS build

    WORKDIR /app
    
    # Copia apenas os manifests do frontend
    COPY frontend/package.json frontend/package-lock.json ./
    
    RUN npm ci
    
    # Copia o código do frontend
    COPY frontend .
    
    # Build de produção
    RUN npm run build
    
    # ---------- Stage 2: Runtime ----------
    FROM node:22-alpine
    
    WORKDIR /app
    
    RUN npm install -g serve
    
    # Copia o build gerado
    COPY --from=build /app/dist /app/dist
    
    # Railway ignora EXPOSE, mas é ok documentar
    EXPOSE 3000
    
    # Usa a PORT da Railway
    CMD ["sh", "-c", "serve -s dist -l $PORT"]
    