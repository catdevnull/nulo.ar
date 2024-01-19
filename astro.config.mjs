import { defineConfig } from "astro/config";
import wikiLinkPlugin from "remark-wiki-link";
import { slug } from "github-slugger";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx(), icon()],
  build: { inlineStylesheets: "always" },
  markdown: {
    remarkPlugins: [
      [
        wikiLinkPlugin,
        {
          pageResolver: (name) => [slug(name)],
          hrefTemplate: (permalink) => `/notas/${permalink}`,
        },
      ],
    ],
  },
  redirects: {
    "/Microcontrolador%20(teclados%20mecánicos).html":
      "/x/Microcontrolador%20(teclados%20mec%C3%A1nicos)/",
    "/Monitoreo%20de%20censura%20de%20Internet.html":
      "/x/Monitoreo%20de%20censura%20de%20Internet/",
    "/Mozilla.html": "/x/Mozilla/",
    "/2022-06-08%20Necesitamos%20seguridad%20colectiva.html":
      "/x/2022-06-08-Necesitamos%20seguridad%20colectiva/",
    "/2022-07-13.html": "/x/2022-07-13/",
    "/2022-07-16.html": "/x/2022-07-16/",
    "/2022-10-15%20Analisis%20de%20la%20extracción%20de%20datos%20del%20teléfono%20de%20Fernando%20André%20Sabag%20Montiel.html":
      "/x/2022-10-15-Analisis%20de%20la%20extracci%C3%B3n%20de%20datos%20del%20tel%C3%A9fono%20de%20Fernando%20Andr%C3%A9%20Sabag%20Montiel/",
    "/2022-10-30%20Bugs%20de%20accesibilidad.html":
      "/x/2022-10-30-Bugs%20de%20accesibilidad/",
    "/2022-11-18%20Donweb%20es%20ridículo.html":
      "/x/2022-11-18-Donweb%20es%20rid%C3%ADculo/",
    "/2023-04-30%20Donweb%20quiere%20tu%20cripto.html":
      "/x/2023-04-30-Donweb%20quiere%20tu%20cripto/",
    "/Activismo%20Gordo.html": "/x/Activismo%20Gordo/",
    "/Aesthetic.html": "/x/Aesthetic/",
    "/Alimentación.html": "/x/Alimentaci%C3%B3n/",
    "/Alpine%20Linux.html": "/x/Alpine%20Linux/",
    "/Android.html": "/x/Android/",
    "/Android%20Auto.html": "/x/Android%20Auto/",
    "/Android%20seguro.html": "/x/Android%20seguro/",
    "/Antiderechos%20de%20autorx.html": "/x/Antiderechos%20de%20autorx/",
    "/Aprender.html": "/x/Aprender/",
    "/Archivar%20los%20archivos%20de%20la%20dictadura%20militar.html":
      "/x/Archivar%20los%20archivos%20de%20la%20dictadura%20militar/",
    "/2023-02-05%20Vergüenza%20algorítmica.html":
      "/x/2023-02-05-Verg%C3%BCenza%20algor%C3%ADtmica/",
    "/Arreglando%20bugs%20ajenos.html":
      "/x/2021-10-11-Arreglando%20bugs%20ajenos/",
    "/Atreus%20v1.html": "/x/Atreus%20v1/",
    "/Atreus%20v2.html": "/x/Atreus%20v2/",
    "/BitTorrent.html": "/x/BitTorrent/",
    "/BitTorrent%20v2.html": "/x/BitTorrent%20v2/",
    "/Bluetooth.html": "/x/Bluetooth/",
    "/Bookmarklets.html": "/x/Bookmarklets/",
    "/Booteables.html": "/x/Booteables/",
    "/Boox%20T68.html": "/x/Boox%20T68/",
    "/Burn%20Book.html": "/x/Burn%20Book/",
    "/C.html": "/x/C/",
    "/CHINESE%20GOD%20OIL.html": "/x/CHINESE%20GOD%20OIL/",
    "/Chromium.html": "/x/Chromium/",
    "/Cocina.html": "/x/Cocina/",
    "/Códigos%20QR.html": "/x/C%C3%B3digos%20QR/",
    "/Comics.html": "/x/Comics/",
    "/Cooperativas.html": "/x/Cooperativas/",
    "/Cosas.html": "/x/Cosas/",
    "/CRDT.html": "/x/CRDT/",
    // "/CSS: color-scheme.html": "/x/CSS/",
    "/curl.html": "/x/curl/",
    "/DecSync.html": "/x/DecSync/",
    "/Diseño.html": "/x/Dise%C3%B1o/",
    "/Disroot.html": "/x/Disroot/",
    "/DNS.html": "/x/DNS/",
    "/Donweb.html": "/x/Donweb/",
    "/Dropbear.html": "/x/Dropbear/",
    "/E-ink.html": "/x/E-ink/",
    "/Electronica.html": "/x/Electronica/",
    "/Email.html": "/x/Email/",
    "/EPUB.html": "/x/EPUB/",
    "/Este%20sitio.html": "/x/Este%20sitio/",
    "/Experiencing%20harmful%20behavior%20in%20Alpine.html":
      "/x/Experiencing%20harmful%20behavior%20in%20Alpine/",
    "/x/Experiencing%20harmful%20behavior%20in%20Alpine/":
      "/blog/2022-01-20-experiencing-harmful-behavior-in-alpine/",
    "/Fabricación%20de%20circuitos%20impresos.html":
      "/x/Fabricaci%C3%B3n%20de%20circuitos%20impresos/",
    "/Facebook.html": "/x/Facebook/",
    "/Faircamp.html": "/x/Faircamp/",
    "/FakeSMTP.html": "/x/FakeSMTP/",
    "/Firecracker.html": "/x/Firecracker/",
    "/Forgejo.html": "/x/Forgejo/",
    "/Formatos%20de%20texto.html": "/x/Formatos%20de%20texto/",
    "/Fotografía.html": "/x/Fotograf%C3%ADa/",
    "/Fuck%20WebRTC.html": "/x/Fuck%20WebRTC/",
    "/Git.html": "/x/Git/",
    "/Gitea.html": "/x/Gitea/",
    "/GNOME.html": "/x/GNOME/",
    "/Go.html": "/x/Go/",
    "/GraphHopper.html": "/x/GraphHopper/",
    // "/Hacks%3A limpiar servidor.html": "/x/Hacks:%20limpiar%20servidor/",
    "/HedgeDoc.html": "/x/HedgeDoc/",
    "/Herramienta%20de%20monitoreo%20de%20medios.html":
      "/x/Herramienta%20de%20monitoreo%20de%20medios/",
    "/HTML.html": "/x/HTML/",
    "/Ideas.html": "/x/Ideas/",
    "/Ideas%20para%20un%20sistema%20operativo%20propio%20en%20Chromebooks.html":
      "/x/Ideas%20para%20un%20sistema%20operativo%20propio%20en%20Chromebooks/",
    "/Ideas%20para%20una%20web%20distribuida.html":
      "/x/Ideas%20para%20una%20web%20distribuida/",
    "/Infraestructura.html": "/x/Infraestructura/",
    "/Internet%20censurado%20en%20escuelas%20con%20Plan%20Sarmiento.html":
      "/x/Internet%20censurado%20en%20escuelas%20con%20Plan%20Sarmiento/",
    "/Inversiones.html": "/x/Inversiones/",
    // "/Jackson Burns - SKIN PURIFYING TREATMENT: Underscore's Melodrama.html":
    // "/x/Jackson%20Burns%20-%20SKIN%20PURIFYING%20TREATMENT:%20Underscore's%20Melodrama/",
    "/Jardin%20digital.html": "/x/Jardin%20digital/",
    "/JavaScript.html": "/x/JavaScript/",
    "/Javier%20Milei.html": "/x/Javier%20Milei/",
    "/Keyboard%20layouts%20de%20pocas%20teclas.html":
      "/x/Keyboard%20layouts%20de%20pocas%20teclas/",
    "/Leak%20OSDE%202022-08.html": "/x/Leak%20OSDE%202022-08/",
    "/Lenguajes%20de%20marcado.html": "/x/Lenguajes%20de%20marcado/",
    "/Lenguajes%20de%20programación.html":
      "/x/Lenguajes%20de%20programaci%C3%B3n/",
    "/Lua.html": "/x/Lua/",
    "/Lua%20funcional.html": "/x/Lua/",
    "/Magnets%20o%20torrents%20reproducibles.html":
      "/x/Magnets%20o%20torrents%20reproducibles/",
    "/Manjaro.html": "/x/Manjaro/",
    "/Markdown.html": "/x/Markdown/",
    "/Marketing.html": "/x/Marketing/",
    "/Measured%20boot.html": "/x/Measured%20boot/",
    "/Menú%20artístico.gen.html": "/x/Men%C3%BA%20art%C3%ADstico.gen/",
    "/Mi%20webring.gen.html": "/",
    "/Multimetro.html": "/x/Multimetro/",
    "/NeoMutt.html": "/x/NeoMutt/",
    "/Nix.html": "/x/Nix/",
    "/Njalla%20caído.html": "/x/Njalla%20ca%C3%ADdo/",
    "/Not%20So%20Shoujo%20Love%20Story.html":
      "/x/Not%20So%20Shoujo%20Love%20Story/",
    "/Nullificación.html": "/bookmarks/2021-12-27-kayak-null/",
    "/Nutrición.html": "/x/Nutrici%C3%B3n/",
    "/Olla%20a%20presión.html": "/x/Olla%20a%20presi%C3%B3n/",
    "/OnePlus%205T.html": "/x/OnePlus%205T/",
    "/Opus%20Encoding.html": "/x/Opus%20Encoding/",
    "/PDF.html": "/x/PDF/",
    "/README.html": "/x/README/",
    "/Salud%20mental.html": "/x/Salud%20mental/",
    "/Seguridad%20de%20la%20infraestructura%20de%20llaves%20pública%20(PKI).html":
      "/x/Seguridad%20de%20la%20infraestructura%20de%20llaves%20p%C3%BAblica%20(PKI)/",
    "/Signal.html": "/x/Signal/",
    "/simplegit.html": "/x/simplegit/",
    "/SONG®%20Music%20LLC.html":
      "/bookmarks/2021-12-17-SONG® Music LLC: NEWSONG® Pro+/",
    "/SQLite.html": "/x/SQLite/",
    "/Subdivx.html": "/x/Subdivx/",
    "/Switches.html": "/x/Switches/",
    "/SyncedStore.html": "/x/SyncedStore/",
    "/Tailwind%20CSS.html": "/x/CSS/",
    "/Teclados.html": "/x/Teclados/",
    "/Teclados%20mecánicos.html": "/x/Teclados%20mec%C3%A1nicos/",
    "/Thinkpad%20X230.html": "/x/Thinkpad%20X230/",
    "/Tipear%20con%20una%20mano.html": "/x/Tipear%20con%20una%20mano/",
    "/To-Do%20lists.html": "/x/To-Do%20lists/",
    "/Permacomputación.html": "/x/Permacomputaci%C3%B3n/",
    "/Piratería.html": "/x/Pirater%C3%ADa/",
    "/Pleroma.html": "/x/Pleroma/",
    "/Producción%20de%20música.html": "/x/Producci%C3%B3n%20de%20m%C3%BAsica/",
    "/Programación.html": "/x/Programaci%C3%B3n/",
    "/ProleText.html": "/x/ProleText/",
    "/Protocolo%20de%20toma%20de%20decisiones%20Sutty%20v0.1.html":
      "/x/Protocolo%20de%20toma%20de%20decisiones%20Sutty%20v0.1/",
    "/Proyectos.html": "/x/Proyectos/",
    "/PWA.html": "/x/PWA/",
    "/PXE.html": "/x/PXE/",
    "/Python.html": "/x/Python/",
    "/QEMU.html": "/x/QEMU/",
    "/Twitter.html": "/x/Twitter/",
    "/txt2txt.html": "/x/txt2txt/",
    "/underscores%20-%20skin%20purifying%20treatment.html":
      "/x/underscores%20-%20skin%20purifying%20treatment/",
    "/underscores%20-%20skin%20purifying%20treatment%20b%20sides.html":
      "/x/underscores%20-%20skin%20purifying%20treatment%20b%20sides/",
    "/VPS.html": "/x/VPS/",
    "/Web.html": "/x/Web/",
    "/Wikimedia.html": "/x/Wikimedia/",
    "/XMPP.html": "/x/XMPP/",
    "/YouTube.html": "/x/YouTube/",
    "/Quién%20soy.html": "/x/Qui%C3%A9n%20soy/",
    "/YouTube%20Restricted%20Mode.html": "/x/YouTube%20Restricted%20Mode/",
  },
});
