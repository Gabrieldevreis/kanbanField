# Estágio 1: Build da aplicação Angular
FROM node:22 AS build

WORKDIR /app

# Copia os arquivos de dependências
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm ci

# Copia o código fonte
COPY . .

# Build da aplicação para produção
RUN npm run build

# Estágio 2: Servir a aplicação com Node.js
FROM node:22-alpine

WORKDIR /app

# Instala o servidor HTTP globalmente
RUN npm install -g serve

# Copia os arquivos buildados do estágio anterior
COPY --from=build /app/dist/frontend/browser /app/dist

# Expõe a porta 4200
EXPOSE 4200

# Inicia o servidor HTTP
CMD ["serve", "-s", "dist", "-l", "4200"]
