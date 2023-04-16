#!/bin/sh

build_ts() {
    ./node_modules/.bin/esbuild compilar.ts --target=node18 --outdir=build.js --sourcemap || exit $?
    cp *.js build.js/
}
build() {
    build_ts
    node --enable-source-maps --trace-uncaught build.js/compilar.js || exit $?
}
check() {
    ./node_modules/.bin/tsc --noEmit || exit $?
}
refresh_feeds() {
    node feeds.js refresh
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
