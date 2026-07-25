# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0

# 1.29.3-alpine3.22-otel had a CRITICAL openssl CVE (CVE-2026-31789) with no
# newer build published under that exact tag - nginx's -otel variant doesn't
# publish alpine3.22 builds past 1.29.x at all. Bumped to 1.30.4-alpine3.24,
# nginx's current "stable" branch (same digest as the floating `stable`
# tag). Verified clean (0 CRITICAL) with a direct Trivy scan before applying.
FROM docker.io/nginxinc/nginx-unprivileged:1.30.4-alpine3.24-otel@sha256:0cf249dada0dfe73051d1f3b2f23219d57f4fbccbbedad2cfb3e1e922e84def4

USER 101

COPY src/image-provider/static/ /static/
COPY src/image-provider/nginx.conf.template /nginx.conf.template

EXPOSE ${IMAGE_PROVIDER_PORT}

STOPSIGNAL SIGQUIT

# Start nginx
CMD ["/bin/sh" , "-c" , "envsubst '$OTEL_COLLECTOR_HOST $IMAGE_PROVIDER_PORT $OTEL_COLLECTOR_PORT_GRPC $OTEL_SERVICE_NAME' < /nginx.conf.template > /etc/nginx/nginx.conf && cat  /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]
