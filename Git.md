-   [Git es difícil](https://mastodon.sdf.org/@khm/107301080271400610)

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
