#!/bin/sh

template () {
	echo -n "<!doctype html>"
	echo -n "<meta charset=utf-8>"
	echo -n "<meta name=viewport content='width=device-width, initial-scale=1.0'>"
	echo -n "<link rel=stylesheet href=drip.css>"
	echo -n "<title>$1</title>"
	if test "$inicio" != true; then
		echo -n "<a href=.>☚ Volver al inicio</a>"
	fi
	if test -n "$2"; then
		echo -n "<header>"
		echo -n "<h1>$1</h1>"
		echo -n "<p><small>Último cambio: <time datetime='$(stat -c %y "$2")'>$(date -d "$(stat -c %y "$2" | cut -f 1 -d .)" '+%Y-%m-%d %H:%M')</time></small></p>"
		echo -n "</header>"
	fi
}

outdir=build
mkdir -p $outdir
# Autocopiarnos :)
cp *.sh *.md *.css *.png "$outdir"

index="$outdir/index.html"
inicio=true header=false template "nulo.in" > "$index"
cmark --unsafe index.md >> "$index"
echo -n "<h2>Lista de páginas</h2><ul>" >> "$index"

for file in *.md; do
	test "$(basename $file)" = index.md && continue
	title="$(basename "$file" .md)"
	outfile="$outdir/$title.html"
	template "$title" "$file" > "$outfile"
	cmark "$file" >> "$outfile"
	# TODO: hacky
	sed -i "s/<a /<a rel='noopener noreferrer' /gi" "$outfile"
	sed -i 's/\[\[\(.*\)\]\]/<a href="\1.html">\1<\/a>/g' "$outfile"
	echo -n "<li><a href='$title.html'>$title</a></li>" >> "$index"
done

echo -n "</ul>" >> "$index"
