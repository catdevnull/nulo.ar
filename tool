#!/bin/sh

build_ts() {
    ./node_modules/.bin/esbuild compilar.ts --target=node18 --outdir=build.js --sourcemap || exit $?
}
build() {
    build_ts
    node --enable-source-maps build.js/compilar.js || exit $?
}
check() {
    ./node_modules/.bin/tsc --noEmit || exit $?
}
refresh_feed() {
    echo "Refreshing $1"
    busybox wget -qO "cached-feeds/$1.xml" "$2" || exit $?
}
refresh_feeds() {
    refresh_feed fauno https://fauno.endefensadelsl.org/feed.xml
    refresh_feed copiona https://copiona.com/feed.xml
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
