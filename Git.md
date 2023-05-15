-   [Git es difícil](https://mastodon.sdf.org/@khm/107301080271400610)
-   ["¿Como puedo confiar en esta repo de Git?"](https://anarc.at/blog/2020-03-17-git-gpg-verification/) de Anarcat (en inglés)

## Diffs útiles con [delta](https://github.com/dandavison/delta)

-   `apk add delta less`
-   `~/.gitconfig`

    ```
    [core]
    	pager = delta
    [interactive]
    	diffFilter = delta --color-only
    [delta]
    	light = true # Cambiar a dark si se usa tema oscuro
    	navigate = true  # use n and N to move between diff sections
    [merge]
    	conflictstyle = diff3
    [diff]
    	colorMoved = default
    ```

## Encontrar que commit eliminó algo

```
git log -S <string> archivo
```

[StackOverflow](https://stackoverflow.com/a/4404551)

## Borrar archivos sin trackear

```
git clean
```

## Usar jump server

Sirve para [[Internet censurado en escuelas con Plan Sarmiento]]

```
GIT_SSH_COMMAND="ssh -J ubuntu@10.0.0.1:993" git pull
```
