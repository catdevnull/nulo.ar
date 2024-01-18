---
title: Donweb es ridículo
date: 2022-11-18
tags:
  - donweb
---

_[Parte 2](/blog/2023-04-30-donweb-quiere-tu-cripto)_

Hace unos días compre el "Cloud Server" (VPS) más barato que ofrece Donweb para experimentar ya que no había visto hosting en Argentina tan barato antes. No ofrecían la posibilidad de bootear distros alternativas a las que te ofrecen (Debian, Ubuntu, CentOS y Rocky) que me pareció raro, pero todo se puede hackear.

Me pareció raro/sospechoso que la instalación de Debian por defecto venía con las llaves SSH de muchisimxs empleadxs de Donweb en el authorized_keys de root dandoles acceso de superusuario, por lo que las borré.

Bootié una imágen de otro de mis proyectos experimentales, [define-alpine](https://gitea.nulo.in/Nulo/define-alpine), ya que quería ver que tan complicado era hacerlo funcionar en un entorno poco flexible como este. Por las 23 horas, lo logré, mandando esta captura de pantalla de victoria a un amigo:

![Captura de pantalla de una terminal de Linux con una sesión recién iniciada](./captura-pre.jpg)

Me fui a dormir victorioso. Al día siguiente, por las 10 de la mañana, recibo este mail:

> Buenos días! como estas? espero que te encuentres muy bien! Tomo contacto contigo en esta ocasión para informarte que deberás re-crear el cloud correspondiente ya que has Instalado otro SO arriba de la imagen provista y no esta permitido.
>
> Saludos cordiales,
>
> Quedo a tu disposición y te agradezco califiques mi respuesta porque nos ayudará a mejorar la calidad de atención.
>
> <pre>---------------------------------------------</pre><br>
>
> [CENSURADO]<br>
> Cloud & IaaS Technical Support - Donweb.cloud<br>
>
> <pre>---------------------------------------------</pre>

En ese momento estaba encerrado en una institución educativa, pero mi amigo descubrió que efectivamente sus terminos y condiciones lo prohibian entre otras cosas.

> Se incluye en este punto también cualquier otra información que DonWeb by Dattatec considere inapropiada según su absoluto y exclusivo criterio. Cualquier uso indebido de los servicios autorizará a DonWeb by Dattatec a la suspensión o eliminación de los servicios contratados y sus contenidos sin previo aviso, no haciéndose responsable DonWeb by Dattatec por cualquier pérdida que esto implique.

> El servidor deberá responder a SNMP (http://es.wikipedia.org/wiki/Simple_Network_Management_Protocol) desde ciertas IPs utilizadas por DonWeb by Dattatec para monitoreo del servicio las cuales son asignadas en la configuracion al momento del alta. El cliente no deberá desinstalar el servicio SNMP ni modificar su configuracion.

> DonWeb by Dattatec se reserva el derecho de suspender el servicio en cualquier momento en caso de detectar alguna anormalidad en las configuraciones antes mencionadas y no poder acceder al servidor para realizar las correcciones necesarias.

> IMPORTANTE: Una vez adquirido el Cloud Server, el cliente tiene la posibilidad de instalar cualquier imagen de los SO ofrecidos que se ajuste a sus necesidades. No obstante, el cliente debe abstenerse de instalar (o pisar una instalación) con una distribución y/o Sistema Operativo distinto a los ofrecidos en el catálogo de imágenes de DonWeb. DonWeb se reserva el derecho de suspender sin previo aviso el servicio en caso que se detecte lo antes mencionado o cualquier acción que comprometa la seguridad e integridad del servicio o la compañía.

DonYuta o RatiWeb, bue. Cuando logre escapar de dicha institución educativa y llegué a mi computador portable, descubrí que Donweb se había tomado la libertad de entrar al VNC de mi servidor a clavarse unos comandos:

![Captura de pantalla de una terminal de Linux con varios comandos consultando información sobre el sistema operativo que corría, entre otras cosas](./captura-post.jpg)

No recomiendo.
