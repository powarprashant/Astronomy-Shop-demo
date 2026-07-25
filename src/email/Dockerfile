# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0


FROM docker.io/library/ruby:3.4.9-alpine3.22@sha256:2f1913c4f4880a5d3f6d0b314029153989f35b72b88591495089ebfb6ca86252 AS builder

COPY ./src/email/Gemfile Gemfile
COPY ./src/email/Gemfile.lock Gemfile.lock

RUN apk update && \
    apk add make gcc musl-dev gcompat && \
    bundle install

FROM docker.io/library/ruby:3.4.9-alpine3.22@sha256:2f1913c4f4880a5d3f6d0b314029153989f35b72b88591495089ebfb6ca86252

COPY --from=builder /usr/local/bundle/ /usr/local/bundle/

# Remove the vulnerable net-imap 0.5.8 that ships as one of the base image's
# own default gems (unrelated to and unused by this app - Gemfile.lock
# already resolves net-imap to the patched 0.6.4 for Bundler-managed code
# via `bundle exec`, but the stale copy is still present on disk and gets
# flagged by image scanners). See CVE-2026-42257.
RUN gem uninstall net-imap --force --ignore-dependencies --all || true

WORKDIR /email_server

COPY ./src/email/views/ views/

COPY ./src/email/.ruby-version .ruby-version
COPY ./src/email/Gemfile Gemfile
COPY ./src/email/Gemfile.lock Gemfile.lock
COPY ./src/email/email_server.rb email_server.rb

EXPOSE ${EMAIL_PORT}
ENTRYPOINT ["bundle", "exec", "ruby", "email_server.rb"]
