---
title: Nulo
description: Mi sitio web personal
layout: prose_base.hbs
templateEngineOverride: liquid,md
---

# nulo❥ar

> Autor de código, hacedor de cosas

{% include "buscador.hbs" %}

## Proyectos

<div class="not-prose grid grid-cols-2 md:grid-cols-3 gap-4">
  <a href="https://preciazo.experimentos.nulo.ar" class="rounded-2xl shadow hover:shadow-lg transition-shadow bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 relative overflow-hidden">
    <!-- <div class="absolute bottom-0 right-0 size-32 flex content-end flex-col"> -->
    <div class="bg-hazard w-64 font-black leading-none text-xl text-white text-center -rotate-45 z-20 absolute bottom-[10%] right-[-6rem]">WIP</div>
    <!-- </div> -->
    <div class="flex flex-col justify-between bg-neutral-50/85 dark:bg-neutral-800/85 z-10 relative h-full p-4">
      <div class="flex flex-col gap-2 px-1">
        <h3 class="font-semibold text-2xl">Preciazo</h3>
        <p class="leading-5">Monitoreo de precios en cadenas de supermercados argentinos.</p>
      </div>
    </div>
  </a>
  <a href="https://datos.nulo.ar" class="rounded-2xl shadow hover:shadow-lg transition-shadow bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 relative overflow-hidden">
    <div class="flex flex-col justify-between bg-neutral-50/85 dark:bg-neutral-800/85 z-10 relative h-full p-4">
      <div class="flex flex-col gap-2 px-1">
        <h3 class="font-semibold text-2xl">Archivo de datos</h3>
        <p class="leading-5">Archivo de portales argentinos de datos abiertos.</p>
      </div>
      <span class="size-8 block justify-self-end place-self-end">
        {% evaIcon "arrow-forward", "outline" %}
      </span>
    </div>
  </a>
  <a href="/dlbot/" class="rounded-2xl shadow hover:shadow-lg transition-shadow bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 relative overflow-hidden">
    <div class="flex flex-col justify-between bg-neutral-50/85 dark:bg-neutral-800/85 z-10 relative h-full p-4">
      <div class="flex flex-col gap-2 px-1">
        <h3 class="font-semibold text-2xl">DlBot</h3>
        <p class="leading-5">Bot de Telegram para descargar videos de TikTok, Instagram Reels y más.</p>
      </div>
      <span class="size-8 block justify-self-end place-self-end">
        {% evaIcon "arrow-forward", "outline" %}
      </span>
    </div>
  </a>
</div>

## Acerca de

¡Buenas! Este es mi mundo, bienvenidx. ¿Que, [[/x/Quién soy]]? Soy Nulo :)

-   Perdete en la [[/x/Lista de páginas]]

Algunas cosas que escribí:

-   [[/x/2023-04-30-Donweb quiere tu cripto]]
-   [[/x/2023-02-05-Vergüenza algorítmica]]
-   [[/x/2022-10-15-Analisis de la extracción de datos del teléfono de Fernando André Sabag Montiel]]
-   [[/x/2021-10-11-Arreglando bugs ajenos]]

Algunas cosas que hice:

-   [Este sitio](https://github.com/catdevnull/ nulo.ar)
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
  {% for article in articles %}
    <li class="article">
      <a href="{{relativeLink article.item.link article.baseUrl}}" target="_blank" rel="noopener">{{article.item.title}}</a>
      via
      <a href="{{article.link}}">{{article.title}}</a>
    </li>
  {% endfor %}
</ul>

## Contacto

Webamigx: [nadie@nulo.in](mailto:nadie@nulo.in) <small>no gods no webmasters</small>

> De este sitio se desprenden graves falencias tales como simbología confusa, cuestionamientos ideológicos-sociales, objetivos no adecuados al hecho estético, ilimitada fantasía...
