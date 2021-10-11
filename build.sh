#!/bin/sh

template () {
	echo "<!doctype html>"
	echo "<meta charset=utf-8>"
	echo "<meta name=viewport content='width=device-width, initial-scale=1.0'>"
	echo "<link rel=stylesheet href=drip.css>"
	echo "<title>$1</title>"
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

outdir=build
mkdir -p $outdir
# Autocopiarnos :)
cp *.sh *.md *.css *.png *.mp4 "$outdir"

index="$outdir/index.html"
inicio=true header=false template "nulo.in" > "$index"
cmark --unsafe index.md >> "$index"
echo "<h2>Lista de páginas</h2><ul>" >> "$index"

for file in *.md; do
	test "$(basename "$file")" = index.md && continue
	title="$(basename "$file" .md)"
	outfile="$outdir/$title.html"
	template "$title" "$file" > "$outfile"
	cmark --unsafe "$file" >> "$outfile"
	# TODO: hacky
	sed -i "s/<a /<a rel='noopener noreferrer' /gi" "$outfile"
	sed -i 's/\[\[\(.*\)\]\]/<a href="\1.html">\1<\/a>/g' "$outfile"
	echo "<li><a href='$title.html'>$title</a></li>" >> "$index"
done

echo "</ul>" >> "$index"
