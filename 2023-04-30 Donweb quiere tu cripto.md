_[Parte 1](2022-11-18%20Donweb%20es%20rid%C3%ADculo.html)_

Como si no fuera suficiente, [[Donweb]] me sigue mandando mails por más que me desuscribí varias veces. No debería sorprenderme de la empresa que hace _[Email Marketing](https://envialosimple.com/es-ar)_ (Spam as a Service), pero es hinchapelotas.

Ayer recibí un mail un poco raro.

![un email que proveniente de Donweb pero con el nombre de enviador como "metamask" alertandome de que supuestamente el acceso a mi cripto habría sido suspendido](2023-04-30%20Donweb%20quiere%20tu%20cripto.md-Screenshot%20from%202023-04-30%2016-28-20.png)

Al principió quise asumir que quizás Doncopado decidió notificarnos de algo que afectaba a MetaMask en general, aunque realmente sospechaba que era una estafa.

>Hola nulo@redacted
>
>Aquí le escribimos para informarle de un alto riesgo potencial para su crypto  de criptomonedas debido a un alto volumen de transacciones en la red de Ethereum durante la actualización reciente de Shanghai. Para proteger sus activos, recomendamos encarecidamente que actualice manualmente su billetera antes del 3 de mayo. Si no actualiza antes de la fecha límite, perderá permanentemente todos sus activos.
>
>### ¿Qué sucede si no se actualiza manualmente?
>
>Tenga en cuenta que no actualizar su crypto antes de la fecha límite resultará en una pérdida permanente de todos sus activos de criptomonedas.
>
><button>Recuperar mi cuenta</button>

Clickear el link grande que dice "Recuperar mi cuenta", te envía a `hxxps://my-ethupdatemetas.com/held/importz/`. Este link ahora está caído, pero pedía que ponga la llave secreta de recuperación de la billetera cripto (phishing).

No me sorprende, pero me decepciona aún más.

## Si, viene de Donweb

A veces estos mails de spam hacen parecer que vienen de un lugar cuando en realidad vienen de otro. Por eso hay tecnologías que verifican que vengan del lugar de donde dicen. Este mail fue verificado por mi servidor de mail como proveniente de `cio.donweb.com`.

>```
>*  1.7 URIBL_BLACK Contains an URL listed in the URIBL blacklist
>*      [URIs: donweb-e.com]
>[snip]
>* -0.0 SPF_PASS SPF: sender matches SPF record
>[snip]
>* -0.1 DKIM_VALID Message has at least one valid DKIM or DK signature
>[snip]
>*  2.3 DCC_CHECK Detected as bulk mail by DCC (dcc-servers.net)
>```

Fue enviado por `customer.io`. El link actualmente ya no apunta al sitio de phishing, porque `customer.io` bloqueo el link de trackeo (que supongo es hospedado por ellxs) y redirige a `https://customer.io/we-hate-spam/`.

Sin embargo, el link en el mail plaintext es `hxxps://donweb-e.com/$COSAS_INCLUYENDO_MAIL_DEL_RECIPIENTE`. Este sigue redirigiendo a un potencial sitio de phishing (`hxxps://en-walletmeta.com/logs/imports/`) pero actualmente está caído (404). Llama la atención que este dominio de phishing específicamente mencione a Donweb.
