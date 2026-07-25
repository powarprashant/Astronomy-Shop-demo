# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0


FROM docker.io/library/node:26.5.0-slim@sha256:715e55e4b84e4bb0ff48e49b398a848f08e55daed8eb6a0ea1839ae53bc57583 AS builder

WORKDIR /usr/src/app/

COPY ./src/payment/package.json package.json
COPY ./src/payment/package-lock.json package-lock.json

RUN npm ci --omit=dev

# -----------------------------------------------------------------------------

# Switched off gcr.io/distroless/nodejs22-debian12:nonroot: it had a CRITICAL
# libssl3 CVE (CVE-2026-31789) with no newer build published under that tag
# yet (verified against the registry, not guessed). node:*-slim gets rebuilt
# with security patches far more frequently - kept the non-root posture via
# the official image's built-in `node` user instead of distroless's implicit
# nonroot UID.
FROM docker.io/library/node:26.5.0-slim@sha256:715e55e4b84e4bb0ff48e49b398a848f08e55daed8eb6a0ea1839ae53bc57583

WORKDIR /usr/src/app/

COPY --from=builder /usr/src/app/node_modules/ node_modules/

COPY ./pb/demo.proto demo.proto

COPY ./src/payment/charge.js charge.js
COPY ./src/payment/index.js index.js
COPY ./src/payment/logger.js logger.js
COPY ./src/payment/opentelemetry.js opentelemetry.js

USER node

EXPOSE ${PAYMENT_PORT}

CMD ["node", "--require=./opentelemetry.js", "index.js"]
