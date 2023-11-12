---
layout: base.hbs
templateEngineOverride: hbs,md
---

<h1 class="main-title">nulo❥ar</h1>

> What's bizarre? I mean, we're all pretty bizarre.<br>Some of us are just better at hiding it, that's all.

{{> buscador}}

¡Buenas! Este es mi mundo, bienvenidx. ¿Que, [[/x/Quién soy]]? Soy Nulo :)

-   Perdete en la [[/x/Lista de páginas]]

Algunas cosas que escribí:

-   [[/x/2023-04-30-Donweb quiere tu cripto]]
-   [[/x/2023-02-05-Vergüenza algorítmica]]
-   [[/x/2022-10-15-Analisis de la extracción de datos del teléfono de Fernando André Sabag Montiel]]
-   [[/x/2021-10-11-Arreglando bugs ajenos]]

Algunas cosas que hice:

-   [Este sitio](https://gitea.nulo.in/Nulo/sitio)
-   [DlBot](https://t.me/dlthefourthbot): un bot de Telegram que descarga videos de TikTok e Instagram ([código](https://gitea.nulo.in/Nulo/dlbot4))
-   [Manejador de Tareas](https://tareas.nulo.in)
-   Proyectos experimentales:
    -   [Schreiben](https://beta.schreiben.nulo.ar): una aplicación para escribir cosas ([código](https://gitea.nulo.in/Nulo/schreiben))
-   Laburos:
    -   [Salvá la costanera](https://salva-la-costanera.netlify.app/), [código](https://gitea.nulo.in/Nulo/salva-la-costanera)
-   Y otros [[/x/Proyectos]].

Algunas cosas de las que soy parte:

-   [Sutty](https://sutty.coop.ar/)

Algunos links mios:

-   <a rel="me noopener noreferrer" href="https://todon.eu/@Nulo">Mastodon</a>
-   Mis [repositorios de código en Gitea](https://gitea.nulo.in/Nulo) y en [GitHub](https://github.com/catdevnull)

## Feed de personas que me parecen copadas (un webring)

<ul>
  {{#each articles as |article|}}
    <li class="article">
      <a href="{{relativeLink article.item.link article.baseUrl}}" target="_blank" rel="noopener">{{article.item.title}}</a>
      via
      <a href="{{article.link}}">{{article.title}}</a>
    </li>
  {{/each}}
</ul>

## Contacto

Webamigx: [nadie@nulo.in](mailto:nadie@nulo.in) <small>no gods no webmasters</small>

> De este sitio se desprenden graves falencias tales como simbología confusa, cuestionamientos ideológicos-sociales, objetivos no adecuados al hecho estético, ilimitada fantasía...
