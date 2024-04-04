## Crear certificados no autorizados

Es posible crear certificados para "nombres" (dominios o IPs) que no te pertenecen de distintas maneras. De esta manera, podés interceptar conexiones y así romper TLS (la seguridad a nivel "transporte"), la base de toda la seguridad de la Web.

Pero ¿como? Primero hay que entender como funciona la "infraestructura de llaves pública" (PKI, Public Key Infrastructure).

Las "autoridades de certificados" son las organizaciones que verifican los dominios y otorgan certificados válidos a quienes le pertenecen. Los sistemas operativos y los navegadores confían en una lista de autoridades de distintos países y distintos estados (con y sin fines de lucros, etc). Si se duda la confianza de estas, se les saca de las listas y los certificados que otorgan paran de ser válidos (esto es importante más abajo :).

La forma que se verifica que "sos el nombre que decís" es distinta de cada autoridad. La forma más "moderna" y la que solemos usar es un sistema de verificación y otorgación **automático** llamado "[ACME]" (Automatic Certificate Management Environment). Esta fue desarrollada por Let's Encrypt, pero luego fue implementada por otros servicios. Acá solo voy a dar ejemplos de vulnerabilidades en este sistema, pero seguro existen otros en las otras autoridades con sus propios métodos.

ACME verifica a través de distintos "métodos", los más comúnes siendo `http-01` y `dns-01`.

1. `http-01` busca tu dominio en DNS **generalmente desde varios servidores**<sup>[1](https://letsencrypt.org/docs/challenge-types/)</sup> (esto es importante después) y hace un pedido al servidor en esa IP. Si todos los pedidos contestan con la llave compartida que te dijo ACME, estás verificadx, y obtenes un certificado.
2. `dns-01` busca tu dominio en DNS y busca la llave compartida en el registro de DNS mismo.

`dns-01` generalmente es más seguro porque no confía en la IP registrada en el DNS en si, sino solo en el registro mismo (del que confias de todas maneras en `http-01`).

Lo que pasa es que es posible interceptar conexiones entre los servidores de la autoridad y los del dominio verificado:

Por ejemplo, al momento de escribir esto nulo.ar está hosteado bajo mi conexión hogareña de Personal. Alguien dentro de Personal, o un hacker podría interceptar conexiones a mi dirección IP y hacer pedidos de certificados para nulo.ar. Esto sería posible sin tener que comprometer a NIC Argentina ni a Hurricane Electric, que manejan la cadena de DNS de mi dominio.

Sin ir a la conspiración, al ser una conexión hogareña Personal no me asigna una IP "estática" a mi, sino que es "dinámica". Esto significa que aleatoriamente, Personal puede decidir cambiarme de IP y darsela a otra persona. Tengo [un programa](https://gitea.nulo.in/Nulo/ddnser) que automáticamente actualiza el registro de DNS de nulo.ar para apuntar a la dirección actual, pero este puede fallar y de todas maneras corre cada ~5 minutos. En ese tiempo, lx otrx cliente que obtiene la IP podría hacer este mismo ataque.

Este es un ejemplo específico, pero es un ataque viable, y de hecho ya ejecutado. Abajo comento de un caso en el que se hace [BGP hijacking][BGP hijacking - Wikipedia] para interceptar las conexiones de un servidor, crear un certificado y insertar malware en el sitio para robar 1,9 millones de dolares.

Otro ataque es más "simple" pero requiere "una conspiración mayor" para ejecutar: que una autoridad de certificados comprometida cree un certificado bajo el nombre de nulo.ar sin verificación. Esto [ya](https://www.techrepublic.com/article/compromised-certificate-authorities-how-to-protect-yourself/) [pasó](https://blog.mozilla.org/security/2011/03/25/comodo-certificate-issue-follow-up/) [varias](https://www.mail-archive.com/dev-security-policy@lists.mozilla.org/msg05455.html) [veces](https://bugzilla.mozilla.org/show_bug.cgi?id=1496088), muchas veces por errores de la autoridad en su software. sslmate.com mantiene [una lista](https://sslmate.com/resources/certificate_authority_failures) con muchos incidentes de esta índole de las autoridades.

Previamente, la única forma de verificar que una autoridad había falsificado un certificado era obteniendo el certificado falsificado y compartiendolo. Esto es problematico porque un ataque teorico podría solo utilizar los certificados falsificados a las victimas a las que se quieren interceptar específicamente.

Sin embargo, hoy en día los navegadores (en Google Chrome desde 2018<sup>[2](https://groups.google.com/a/chromium.org/g/ct-policy/c/wHILiYf31DE/m/iMFmpMEkAQAJ)</sup>) requieren que los certificados estén registrados en un registro de transparencia ([Certificate Transparency - Wikipedia](https://en.wikipedia.org/wiki/Certificate_Transparency)). De esta manera, se puede inspeccionar estos registros públicos por certificados inusuales. [crt.sh](https://crt.sh/) es un sitio que permite acceder a estos registros fácilmente.

(Notese, igualmente, que otras cosas que no son navegadores web pueden no estar chequeando los registros de transparencia. Aún hoy en día no es un requerimiento para las autoridades de certificados reportar todos los certificados generados a los registros de transparencia.)

[ACME]: https://en.wikipedia.org/wiki/Automatic_Certificate_Management_Environment

### Casos

- > February 2022: Attackers hijacked BGP prefixes that belonged to a South Korean cryptocurrency platform, and then issued a certificate on the domain via ZeroSSL to serve a malicious JavaScript file, stealing $1.9 million worth of cryptocurrency.<sup>[31](https://therecord.media/klayswap-crypto-users-lose-funds-after-bgp-hijack)</sup>

  de [BGP hijacking - Wikipedia](https://en.wikipedia.org/w/index.php?title=BGP_hijacking&oldid=1146362657)

[BGP hijacking - Wikipedia]: https://en.wikipedia.org/index.php?title=BGP_hijacking

- En octubre 2023, `xmpp.ru`/`jabber.ru` detectó un ataque activo que involucró interceptar conexiones a sus VPS en Hetzner y Linode generando certificados via Let's Encrypt. [Mitigating the Hetzner/Linode XMPP.ru MitM interception incident](https://www.devever.net/~hl/xmpp-incident) o el post original: [Encrypted traffic interception on Hetzner and Linode targeting the largest Russian XMPP (Jabber) messaging service](https://notes.valdikss.org.ru/jabber.ru-mitm/)

### Soluciones o mitigaciones

#### Monitorear Certificate Transparency

Esto nos deja saber si se sacaron certificados inautorizados, pero no nos deja prevenirlos. Propuesta en Sutty: [Monitorear Certificate Transparency logs revisando que solo haya certificados nuestros](https://0xacab.org/sutty/sutty/-/issues/8880)

#### Restringir metodos de verificación via registros CAA

Gracias a [RFC8657] <small>Certification Authority Authorization (CAA) Record Extensions for Account URI and Automatic Certificate Management Environment (ACME) Method Binding</small>, podemos pedirles a los servidores de expedición de certificados que solo saquen certificados bajo ciertos proveedores y métodos. Esto nos permite limitar la expedición a un proveedor y al método `dns-01`. De esta manera, aún si pueden interceptar las conexiones a nuestra IP (via BGP hijacking o comprometiendo a nuestro ISP o...) no pueden generar certificados (tendrían que hackear nuestro DNS).

Let's Encrypt lo implementó en su entorno de prueba [en 2018] y en producción [en diciembre 2022]. Osea: ¡ya lo podemos usar!

[en 2018]: https://community.letsencrypt.org/t/acme-caa-validationmethods-support/63125
[en diciembre 2022]: https://community.letsencrypt.org/t/enabling-acme-caa-account-and-method-binding/189588

Mas consejos de implementación por uno de los autores del RFC: [Let's Encrypt now supports ACME-CAA: closing the DV loophole
](https://www.devever.net/~hl/acme-caa-live)

GrapheneOS [usa esto](https://github.com/GrapheneOS/ns1.grapheneos.org/blob/bc06ac067c5786180cceccdf8466b0a94a1a7e5c/zones.yaml#LL23C65-L23C65) pero usa http-01. Esto reduce las posibilidades de ataque (al menos solo tenés que confiar en Let's Encrypt) pero no es perfecto.

[RFC8657]: https://datatracker.ietf.org/doc/html/rfc8657

[CAA Mandated by CA/Browser Forum](https://blog.qualys.com/product-tech/2017/03/13/caa-mandated-by-cabrowser-forum)
