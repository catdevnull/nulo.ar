[Subdivx](https://subdivx.com) está desapareciendo. Acá documento nuestros esfuerzos archivándolo.

Fechas en GMT-3.

## Si querés contribuir

Estoy descargando los archivos iniciales para saber los enlaces de los subtítulos. Mientras tanto, andá preparando una maquina con buena conexión a internet y espacio en disco, idealmente con Linux.

## 2021-11-30

-   Descargué todas las paginas de los subtítulos, es decir, `https://www.subdivx.com/?pg={1..5490}`. Esto sirve como indice a todas las paginas de los subtítulos y autorxs.
-   19:12 - Estoy descargando todas las paginas de los subtítulos (`https://www.subdivx.com/X6*.html`). ~~Son `548.825` en total.~~ Corregido, leer abajo.
-   19:25 - Registré `#updivx` en el IRC pirata para el proyecto.
-   21:30 - Cambia el anuncio en Subdivx para decir:

    > Bueno, me convencieron, seguimos... cualquier cosa me escriben en @deifar

    Seguimos archivando por las dudas.
-   22:10 - Empezamos a distribuir tareas para descargar las paginas de los subtítulos.

## 2021-12-01

-   13:35 - Descubrí que usar wget con muchas listas separadas es _mucho_ más eficiente que aria2. Descargando cosas a ~mil por segundo.
-   19:31 - Terminé de bajar todo y descomprimirlo, ahora a extraer enlaces de subtitulos para descargar. Antes dije que eran `548.825` subtitulos, pero en realidad son `548.815`; habían 10 duplicados por alguna razón.

## 2021-12-02

-   15:18 - Subdivx falla al cargar algunas paginas aleatoriamente con "Unable to Connect db". Estoy revisando si reporta el error correctamente con un código de estado HTTP.
