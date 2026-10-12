FROM node:24-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npx ng build --configuration production

FROM caddy:2-alpine
COPY --from=build /app/dist/tedund1besnott1gr5-front/browser /srv
