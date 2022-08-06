# build image
FROM golang:1.14-alpine3.11 AS builder

WORKDIR /opt/tampoff-api

RUN apk add git
RUN wget -O - -q https://raw.githubusercontent.com/securego/gosec/master/install.sh | sh -s v2.4.0

ADD ./api/go.mod ./api/
ADD ./api/go.sum ./api/
ADD ./lib/go.mod ./lib/
ADD ./lib/go.sum ./lib/
WORKDIR /opt/tampoff-api/api
RUN go mod download

WORKDIR /opt/tampoff-api
ADD . .

WORKDIR /opt/tampoff-api/api

RUN go build -o tampoff-api
RUN ../bin/gosec ./...

# final image
FROM alpine:3.11
RUN apk add bash
RUN adduser --disabled-password -h /opt/tampoff-api -G tty --shell /bin/bash tampoff-api
USER tampoff-api
WORKDIR /opt/tampoff-api
COPY --chown=tampoff-api:root --from=builder /opt/tampoff-api/api/tampoff-api ./
RUN chmod 755 /opt/tampoff-api
EXPOSE 8080
ENTRYPOINT ["./tampoff-api", "--config", "/run/secrets/config.json", "--port", "8080"]