## Cachear avatares

Por defecto, Gitea no manda ETags en los avatares entonces no se cachean. Esto hace que el sitio sea difícil de usar en conexiones lentas. Como las URLs de los avatares son hashes, podemos decirle al navegador que son inmutables ya que si cambia el avatar la URL va a cambiar. Entonces podemos agregar esto a nuestra configuración de nginx, después del bloque `location` normal:

```
location /avatar {
    add_header Cache-Control immutable;
    proxy_pass http://localhost:3000; # o la URL a tu Gitea
}
```

## robots.txt

Generalmente no me importan los bots y no me preocupo por bloquearlos. Sin embargo, si no los bloqueas, Gitea/Forgejo genera archives (*.bundle y *.tar.gz) y te llena el disco con ellos. Por eso, copio parte del [robots.txt de Codeberg](https://codeberg.org/robots.txt):

```
User-agent: *
Disallow: /api/*
Disallow: /avatars
Disallow: /user/*
Disallow: /*/*/src/commit/*
Disallow: /*/*/commit/*
Disallow: /*/*/*/refs/*
Disallow: /*/*/*/star
Disallow: /*/*/*/watch
Disallow: /*/*/labels
Disallow: /*/*/activity/*
Disallow: /vendor/*
Disallow: /swagger.*.json

# Language spam
Disallow: /*?lang=
```
