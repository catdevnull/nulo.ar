## IPFS

En su estado actual, tiene serios problemas técnicos que impiden su uso para el día a día, especialmente para hosts pequeños (ej, [Sutty](https://sutty.coop.ar) o este mismo sitio).

-   Es lento y muchas veces no encuentra a lxs peers.
    -   Esto es aún peor con IPNS (básicamente DNS pero distribuido con llaves) ya que necesita conseguir N confirmaciones de distintos peers para asegurarse que tiene la versión actualizada y no una vieja.
-   El daemon (go-ipfs) usa mucha CPU y (según leí, no lo medí) mucho tráfico de red. 
-   Leí que las distintas implementaciones ({go,js}-ipfs) todavía no interoperan.
-   El desarrollo está financiado por organizaciones que creen en los criptopatacones (Filecoin y otras cosas como Ethereum/Web3/NFTs).

## BitTorrent

-   El protocolo funciona pero quizás sea un poco lento para una web.
-   Ver [[BitTorrent]] para ver ideas de como mejorarlo en general.

### Implementaciones

-   Recuerdo que [ZeroNet](https://zeronet.io) usa BitTorrent para distribuir sitios.

## Otras ideas

-   [Ink & Switch](https://www.inkandswitch.com/) investiga y crea tecnologías distribuidas como:
    -   [Peritext](https://www.inkandswitch.com/peritext/), un CRDT para un editor colaborativo rico
    -   [Automerge](https://automerge.org/), estructuras de datos para aplicaciones distribuidas
-   [Logux](https://logux.io/) is an WebSocket client/server framework (offline-first; CRDT-inspired)
-   [Local-First Web Development](https://localfirstweb.dev/) tiene distintas propuestas.
