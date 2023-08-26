Estado del proyecto: sin empezar

Sería un daemon que toma conexiones SMTP y envía los mails recibidos a otros servicios que no sean mail, ej. Telegram.

Entonces envias a.. `To: catdevnull@telegram.fakesmtp` y se envía por un bot a ese usuarix :)

Viene de la frustacion de no poder tener un SMTP en una conexion hogareña (outgoing SMTP está bloqueado) y aún si pudiera, lograr que los mails lleguen es todo un tema.

## Previous art

- [Resulta](https://todon.eu/@Nulo/110906535803280067) que [Patrycja](https://ptrcnull.me/) me primerió por dos años y hizo [tgmail](https://git.ddd.rip/ptrcnull/tgmail) <3

## Inspiración

- [edgemail](https://github.com/psarna/edgemail) implementa un servidor SMTP que recibe mails en Rust
