FROM node:24-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ENV NG_CLI_ANALYTICS=false
# O ng build termina o trabalho em segundos mas o processo nao encerra no runner:
# limita o tempo e aceita o resultado se o index.html foi gerado.
RUN timeout 180 ./node_modules/.bin/ng build --configuration production \
    || test -f /app/dist/tedund1besnott1gr5-front/browser/index.html

FROM caddy:2-alpine
COPY --from=build /app/dist/tedund1besnott1gr5-front/browser /srv
