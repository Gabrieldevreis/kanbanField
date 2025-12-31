FROM node:22


WORKDIR /app


COPY package.json package-lock.json ./



RUN npm install --omit=dev

COPY . .



EXPOSE 8001


CMD ["npm", "run", "start:dev"]