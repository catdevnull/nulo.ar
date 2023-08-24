## Arreglar asociación entre shortcuts a webapps y ventanas en Wayland

El StartupWMClass es incorrecto, el correcto es igual al Icon. Entonces copiamos el del Icon.

```fish
cd ~/.local/share/applications/
mkdir bak && cp *chrome* bak/
sed -Ei 's/StartupWMClass=(.*)//g' *chrome* && sed -Ei 's/Icon=(.*)/Icon=\\1\nStartupWMClass=\\1/g' *chrome*
```
