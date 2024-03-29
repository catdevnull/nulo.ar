## Relacionado

-   [[Android seguro]]
-   [Battery Historian](https://developer.android.com/topic/performance/power/setup-battery-historian): Herramienta para analizar el uso de batería
-   [Android tiene problemas de accesibilidad](https://write.as/devinprater/six-months-with-android-a-journey-from-a-blind-perspective)

## Desarrollo en Alpine

Estas instrucciones están parcialmente tomadas de [esta respuesta en StackOverflow](https://stackoverflow.com/a/66316335).

1.  Para instalar el SDK en Alpine, primero instalemos `android-tools` para instalar las herramientas básicas de Android (`adb` por ejemplo) junto a sus versiones de Java:

    ```sh
    # Correr como root:
    apk add android-tools
    ```

2.  Después tenemos que crear un `ANDROID_SDK_ROOT`:

    ```sh
    mkdir ~/android-sdk
    # ¡Poner en ~/.profile!
    export ANDROID_SDK_ROOT="$HOME/android-sdk"
    export PATH="$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin"
    ```

3.  Bajamos [commandlinetools](https://developer.android.com/studio#command-tools) (que incluye `sdkmanager`) y lo extraemos dentro de `~/android-sdk/cmdline-tools/latest`.

4.  Finalmente, instalamos las cosas que necesitamos. Por ejemplo, para [Lunar](https://0xacab.org/lunaramaturitmo/app/) (acorde a [la documentación](https://0xacab.org/lunaramaturitmo/app/-/blob/master/docs/prepare.md)):

    ```sh
    sdkmanager 'build-tools;29.0.2' 'platforms;android-29'
    ```

5.  Instalamos [`gcompat`](https://git.adelielinux.org/adelie/gcompat) que nos permite correr binarios que requieren [Glibc](https://es.wikipedia.org/wiki/Glibc) en Alpine que no lo tiene:

    ```sh
    # Correr como root:
    apk add gcompat
    ```

## `adb reverse` roto

En algunos dispostivos, cuando están conectados a través de ADB TCP/IP se rompen al intentar usar `adb reverse`:

```
$ adb reverse tcp:42069 tcp:42069
more than one device/emulator
```

Aún cuando no hay otros dispositivos. La solución es hacer el `adb reverse` antes de conectarse mientras está conectado por USB:

```
adb tcpip 5555
adb reverse tcp:42069 tcp:42069
adb connect IP:5555
```
