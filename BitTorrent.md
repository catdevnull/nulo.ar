-   [Propuesta para archivar todo el Internet Archive con BitTorrent (Archive Team)](https://wiki.archiveteam.org/index.php/INTERNETARCHIVE.BAK/torrents_implementation)

## Ideas

### Magnets/torrents reproducibles

Muchas veces pasa que se generan distintos torrents para los mismos archivos. Esto hace que la _swarm_ de peers sea distinta, causando una distribución ineficiente que hace a la red más lenta innecesariamente.

Para evitar esto, se podría hacer un estándar para generar torrents reproducibles inspirado en el [software reproducible](https://reproducible-builds.org/).

Esto se puede hacer únicamente en archivos grandes (¿>1MB?) para evitar tener muchos torrents distintos para un torrent con muchos archivos chicos como un sitio web ([[Ideas para una web distribuida]]).

Esto lo haría el programa que cree el torrent. Cuando detecta un archivo grande, lo hace un torrent separado y crea un "hipervinculo" en el torrent madre para que sepa donde está el archivo.

Esta sería una extensión incompatible con los clientes actuales ya que no descargarían automáticamente el archivo. Aunque... podría armarse el torrent separado pero también agregar el archivo al torrent madre. Lx peer que soporta esta extensión puede detectar el hipervínculo y descargarlo de ahí. A partir de eso hasta podría detectar cuando otrx peer le pide el archivo del torrent madre y servirle el del torrent separado, haciendo un uso eficiente de disco y beneficiando también a peers desactualizados.

## Clientes

-   [sircmpwn/btqd](https://git.sr.ht/~sircmpwn/btqd) en Hare
