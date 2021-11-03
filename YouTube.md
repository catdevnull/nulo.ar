## Restricciones de red

YouTube permite a lxs administradorxs de una red bloquear sitios "inapropiados" (!). Este bloqueo funciona [interceptando DNS o HTTP](https://support.google.com/a/answer/6214622?hl=en). En mi caso, es DNS. Para liberarnos de la censura, podemos agregar IPs no censuradas a `/etc/hosts`:

```
172.217.173.142 youtube.com www.youtube.com m.youtube.com youtubei.googleapis.com youtube.googleapis.com www.youtube-nocookie.com
```

Otras IPs, conseguidas el 2021-11-03:

```
172.217.173.238
172.217.172.110
172.217.172.78
142.250.79.174
172.217.173.174
172.217.173.142
172.217.162.238
172.217.29.206
142.250.79.142
142.250.79.110
142.250.79.78
216.58.202.110
216.58.202.78
2800:3f0:4002:804::200e
2800:3f0:4002:813::200e
2800:3f0:4002:812::200e
2800:3f0:4002:811::200e
```

También podemos usar algo como [Piped](https://piped.kavin.rocks/) que es un proxy e interfáz alternativa de YouTube.
