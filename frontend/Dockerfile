FROM node:25-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install \
    && npm cache clean --force

COPY . .

FROM node:25-alpine

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
