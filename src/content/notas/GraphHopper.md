Da direcciones a lugares a partir de los datos de OpenStreetMap. Disponible como [servicio comercial](https://graphhopper.com) y como [self-hosted](https://github.com/graphhopper/graphhopper).

Tip: usar la [interfaz web](https://openstreetmap.org) de OpenStreetMap o [GraphHopper Maps](https://graphhopper.com/maps/) para hacer pedidos a la API fácil.

## API

- [Documentación docs.graphhopper.com](https://docs.graphhopper.com)
- [Documentación GitHub](https://github.com/graphhopper/graphhopper/blob/3.x/docs/web/api-doc.md)

Por lo que veo, es la misma API pero la documentación de docs.graphhopper.com están mejor ordenadas y representadas.

Se puede usar la llave de OpenStreetMap para tests y scripts: `LijBPDQGfu7Iiq80w3HzwB4RUDJbMbhs6BU0dEnn`.

### Ejemplo curl

```sh
curl \
-s -S -G --compressed \
"https://graphhopper.com/api/1/route" \
--data-urlencode vehicle=foot \
--data-urlencode locale=en \
--data-urlencode key=LLAVE \
--data-urlencode elevation=false \
--data-urlencode instructions=false \
--data-urlencode turn_costs=false \
--data-urlencode point=lat,lon \
--data-urlencode point=lat,lon
# Podés pasarlo por jq: | jq
```
