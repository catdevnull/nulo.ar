#!/bin/sh

build_ts() {
    ./node_modules/.bin/esbuild compilar.ts --target=node18 --outdir=build.js --sourcemap
}
build() {
    build_ts
    node build.js/compilar.js
}
check() {
    ./node_modules/.bin/tsc --noEmit
}

fatal() {
    echo "$1"
    exit 1
}

test "$1" = build_ts -o "$1" = build -o "$1" = check || fatal "Comando no válido"
"$1"
