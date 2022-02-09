#!/bin/sh

template () {
	echo "<!doctype html>"
	echo "<meta charset=utf-8>"
	echo "<meta name=viewport content='width=device-width, initial-scale=1.0'>"
	echo "<meta name=author content=Nulo>"
	echo "<meta property=og:title content='$1'>"
	echo "<meta property=og:type content=website>"
	if test -n "$base_uri"; then
		echo "<meta property=og:url content='${base_uri}${title}.html'>"
	fi
	echo "<meta property=og:image content=cowboy.svg>"
	echo "<link rel=stylesheet href=drip.css>"
	echo "<link rel=icon href=cowboy.svg>"
	echo "<title>$1</title>"
	: "${inicio:=}"
	if test "$mirror" = true; then
		echo "<p style=color:darkred>Ojo: este sitio es un espejo (mirror). <a href=https://nulo.in>nulo.in</a> es la fuente.</p>"
	fi
	if test "$inicio" != true; then
		echo "<a href=.>☚ Volver al inicio</a>"
	fi
	if test -n "$2"; then
		echo "<header>"
		echo "<h1>$1</h1>"
		echo "<p><small>Último cambio: <time datetime='$(git log -1 --format=%ai "$2")'>$(date -d "@$(git log -1 --format=%at "$2")" '+%Y-%m-%d %H:%M')</time></small></p>"
		echo "</header>"
	fi
}

markdown () {
	# TODO: hacky
	cmark --unsafe "$1" \
	| sed "s/<a h/<a rel='noopener noreferrer' h/gi" \
	| sed 's/\[\[\(.*\)\]\]/<a href="\1.html">\1<\/a>/g'
}

outdir=build
mkdir -p $outdir
# Autocopiarnos :)
cp ./*.sh ./*.md ./*.css ./*.png ./*.mp4 ./*.svg ./*.html "$outdir"

index="$outdir/index.html"
inicio=true header=false template "nulo.in" > "$index"
markdown index.md >> "$index"

for file in *.md; do
	test "$(basename "$file")" = index.md && continue
	title="$(basename "$file" .md)"
	outfile="$outdir/$title.html"
	template "$title" "$file" > "$outfile"
	markdown "$file" >> "$outfile"
done

for file in *.gen; do
	title="$(basename "$file" .gen)"
	outfile="$outdir/$title.html"
	template "$title" "$file" > "$outfile"
	"./$file" >> "$outfile"
done

