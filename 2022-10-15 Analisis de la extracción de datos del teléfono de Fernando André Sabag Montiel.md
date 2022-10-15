## Prefacio

Es importante analizar como las fuerzas policiales locales vuleran sistemas informáticos para obtener información. De esta manera, podemos protegernos de la policía y otros criminales utilizando las mismas herramientas.

El caso del [intento de asesinato de la vicepresidenta](https://es.wikipedia.org/wiki/Intento_de_asesinato_a_Cristina_Fern%C3%A1ndez_de_Kirchner) es útil porque muchas notas abren las cortinas detrás de las divisiones de ciberperitaje y nos dejan saber que métodos y herramientas usan.

## Análisis de "50 gigas"

[Esta nota de Télam](https://www.telam.com.ar/notas/202210/607022-cristina-fernandez-ataque-investigacion-sabag-montiel-celular.html) cuenta detalles sobre como lograron "extraer datos del teléfono" después de tantos intentos fallidos: TL;DR el titulo está mal, no extrajeron nada del teléfono.

- Usaron la SIM del teléfono para activar la cuenta de Telegram en otro dispositivo y extraer todo,
    - que se podría haber prevenido con el uso de la [autenticación de dos pasos](https://telegram.org/blog/sessions-and-2-step-verification) de Telegram, en la que se te pide una contraseña al iniciar sesión.
        - Aunque es importante mencionar que también podés opcionalmente poner una dirección de mail para recuperarla si la perdés, y como también le consiguieron las cuentas de Google también podría haber sido vulnerado.
    - Por otro lado, si Telegram fuera realmente seguro como Signal (y a cierto punto WhatsApp, ver abajo) a través de la utilización de cifrado punta a punta, no podrían haber conseguido el historial entero de conversaciones (hasta diciembre de 2020) por lo que no hubiera sido vulnerado en este modelo de ataque (extracción de datos a través de hijackeo de cuentas).

- De alguna manera accedieron las cuentas de Google (que no entiendo como hicieron con solo la SIM, generalmente también necesitas la contraseña)
    - y extrajeron un [takeout](https://takeout.google.com) (un archivo gigante con todos los datos de cada cuenta)
        - para analizarlo con [UFED Cloud](https://cellebrite.com/en/ufed-cloud/) (software de compañía israelí utilizado por régimenes fascistas, [previamente vulnerada por Signal mismo](https://signal.org/blog/cellebrite-vulnerabilities/)).

- Dice que accedieron a WhatsApp,
    - pero dice explicitamente que no encontraron copias de seguridad de WhatsApp en Google
    - pero que obtuvieron "los datos de la nube de WhatsApp".
        - Si es de creer el E2EE de WhatsApp (yo, sinceramente, creo) solo obtuvieron metadatos.
    - Si hubiera habido copias de seguridad (una de las principales vulerabilidades de WhatsApp) si podrían haber tenido sus mensajes.

## Conclusión

Las fuerzas policiales parecen no tener idea de nada. Usan software que se sabe es inseguro (Cellebrite) que podría vulnerar sus propios sistemas y filtrar datos confidenciales u obstruir investigaciones. No parecen considerar la posibilidad de ataques más sofisticados existentes desde hace muchos años como [congelar la RAM](https://www.zdnet.com/article/cryogenically-frozen-ram-bypasses-all-disk-encryption-methods/) para extraer las llaves de cifrado del teléfono. El software que usan para la extracción de datos (Cellebrite UFED) requiere acceso desbloqueado del teléfono, osea, no vulnera nada particular.

¿Que significa esto para quienes queremos mantenernos segurxs? Las recomendaciones de siempre: usar [Signal](https://signal.org) para la mensajería, que hubiera prevenido la extracción masiva de mensajes como en Telegram, tener una contraseña en tu celular que solo vos sabés y mantener actualizado tu teléfono.

[Desde hace 7 versiones](https://gizmodo.com/full-disk-encryption-is-mandatory-on-android-6-0-if-the-1737988277) Google insiste que los celulares Android vengan cifrados por defecto, y desde [hace 3 versiones](https://www.xatakandroid.com/seguridad/a-partir-android-q-sera-obligatorio-cifrado-datos-estas-sus-mejoras-seguridad) ya es completamente obligatorio, por lo que ni hace falta que lo actives manualmente.
