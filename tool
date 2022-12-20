#!/bin/sh

build_ts() {
    ./node_modules/.bin/esbuild compilar.ts --target=node18 --outdir=build.js --sourcemap
}
build() {
    build_ts
    node --enable-source-maps build.js/compilar.js
}
check() {
    ./node_modules/.bin/tsc --noEmit
}
refresh_feeds() {
    wget -nv -O cached-feeds/fauno.xml https://fauno.endefensadelsl.org/feed.xml
    wget -nv -O cached-feeds/copiona.xml https://copiona.com/feed.xml
}

fatal() {
    echo "$1"
    exit 1
}

test "$1" = build_ts \
    -o "$1" = build \
    -o "$1" = check \
    -o "$1" = refresh_feeds \
    || fatal "Comando no válido"
"$1"
