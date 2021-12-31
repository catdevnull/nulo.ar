-   [Git es difícil](https://mastodon.sdf.org/@khm/107301080271400610)
-   ["¿Como puedo confiar en esta repo de Git? "](https://anarc.at/blog/2020-03-17-git-gpg-verification/] de Anarcat (en inglés)

## Diffs útiles para Alpine

-   `apk add git-diff-highlight less`
-   `~/.gitconfig`

    ```
    [pager]
        log = diff-highlight | less
        show = diff-highlight | less
        diff = diff-highlight | less
    [interactive]
        diffFilter = diff-highlight
    ```

Gracias: [Better Diff Highlighting in Git](https://joelclermont.com/post/2021-02/better-diff-highlighting-in-git/)
