---
title: Necesitamos seguridad colectiva
date: 2022-06-08
---

La gran mayoría de herramientas de seguridad y privacidad que recomendamos lxs hacktivistas son individualistas, forzándote a hacer copias de seguridad por tu cuenta (y si perdés acceso, chau a tus datos) o institucionistas en donde tenés que confiarle a una entidad/empresa/organización en cuidar de tus datos correctamente (a nivel integridad pero también seguridad).

Lo raro es que ya tenemos -hace mucho tiempo- las herramientas para hacer copias de seguridad colectivistas. Tenemos protocolos como BitTorrent permitiendo compartir copias de seguridad de datos entre nodos de distintas personas. Y encima, tenemos el [esquema de Shamir](https://es.wikipedia.org/wiki/Esquema_de_Shamir) para compartir copias de seguridad de llaves de cifrado (para cifrar las copias de seguridad de datos) entre personas de confianza.

Lo interesante de este esquema es que da una especie de _confianza parcial_ a esas personas ya que **requiere que al menos N personas de confianza de tus M personas de confianza se junten para restaurar acceso**. Es decir que podés tener 7 personas de confianza pero solo se pueda restaurar acceso con al menos 4. Esto hace que, aún si una, dos o tres personas conspiran contra vos para hackear tu identidad, no lo puedan hacer sin conseguir acceso a las llaves de las otra 4 personas.

[Vitalik (el de Ethereum) piensa lo mismo](https://vitalik.ca/general/2021/01/11/recovery.html). Inspirado en este [dramático post](https://shkspr.mobi/blog/2022/06/ive-locked-myself-out-of-my-digital-life/) ([HackerNews](https://news.ycombinator.com/item?id=31652650)).
