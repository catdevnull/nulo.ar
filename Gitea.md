## Cachear avatares

Por defecto, Gitea no manda ETags en los avatares entonces no se cachean. Esto hace que el sitio sea difícil de usar en conexiones lentas. Como las URLs de los avatares son hashes, podemos decirle al navegador que son inmutables ya que si cambia el avatar la URL va a cambiar. Entonces podemos agregar esto a nuestra configuración de nginx, después del bloque `location` normal:

```
location /avatar {
    add_header Cache-Control immutable;
    proxy_pass http://localhost:3000; # o la URL a tu Gitea
}
```
