---
title: Nulo
description: Mi sitio web personal
layout: prose_base.hbs
templateEngineOverride: liquid,md
proyectos:
    - title: Preciazo
      description: Monitoreo de precios en cadenas de supermercados argentinos.
      url: https://preciazo.experimentos.nulo.ar
      wip: true
    - title: Archivo de datos
      description: Archivo de portales argentinos de datos abiertos.
      url: https://datos.nulo.ar
    - title: DlBot
      description: Bot de Telegram para descargar videos de TikTok, Instagram Reels y más.
      url: /dlbot/
    - title: Schreiben
      description: Aplicación para escribir cosas.
      url: https://schreiben.nulo.ar
      wip: true
---

# nulo❥ar

> Autor de código, hacedor de cosas

{% include "buscador.hbs" %}

## Proyectos

<div class="not-prose grid grid-cols-2 md:grid-cols-3 gap-4">
  {%- for proyecto in proyectos -%}
    <a href="{{ proyecto.url }}" class="rounded-2xl shadow hover:shadow-lg transition-shadow bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 relative overflow-hidden">
      {%- if proyecto.wip -%}
      <div class="bg-hazard w-64 font-black leading-none text-xl text-white text-center -rotate-45 z-20 absolute bottom-[10%] right-[-6rem]">WIP</div>
      {%- endif -%}
      <div class="flex flex-col justify-between bg-neutral-50/85 dark:bg-neutral-800/85 z-10 relative h-full p-4">
        <div class="flex flex-col gap-2 px-1">
          <h3 class="font-semibold text-2xl">{{- proyecto.title -}}</h3>
          <p class="leading-5">{{- proyecto.description -}}</p>
        </div>
        {%- unless proyecto.wip -%}
          <span class="fill-current size-8 block justify-self-end place-self-end">
            {%- evaIcon "arrow-forward", "outline" -%}
          </span>
        {%- endunless -%}
      </div>
    </a>
  {%- endfor -%}
</div>

## Acerca de

¡Buenas! Este es mi mundo, bienvenidx. ¿Que, [[/x/Quién soy]]? Soy Nulo :)

-   Perdete en la [[/x/Lista de páginas]]

Algunas cosas que escribí:

-   [[/x/2023-04-30-Donweb quiere tu cripto]]
-   [[/x/2023-02-05-Vergüenza algorítmica]]
-   [[/x/2022-10-15-Analisis de la extracción de datos del teléfono de Fernando André Sabag Montiel]]
-   [[/x/2021-10-11-Arreglando bugs ajenos]]

Algunas cosas de las que soy parte:

-   [Sutty](https://sutty.coop.ar/)

Algunos links mios:

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

<a rel="me noopener noreferrer" href="https://todon.eu/@Nulo">Mastodon</a>
