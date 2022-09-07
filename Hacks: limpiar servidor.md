## Prunear registry

```
~root/prune-container-registry.sh
# aka
cd /home/container-registry/
USER=container-registry HOME=/home/container-registry \
        chpst -u container-registry:container-registry podman exec container-registry registry garbage-collect /etc/docker/registry/config.yml -m
```

Gracias [StackOverflow](https://stackoverflow.com/a/48950176)

## Prunear Docker

```
docker system prune --all
## Ojo: elimina volumenes de contenedores apagados
docker system prune --all --volumes
```

## Prunear Podman

```
podman system prune --all
## Ojo: elimina volumenes de contenedores apagados
podman system prune --all --volumes
```

## Limpiar paquetes

### Paquetes huerfanos

```
xbps-remove -o
```

### Caché de paquetes no instalado

```
xbps-remove -O
```

### Nuclear: todo el caché de paquetes

```
rm -r /var/cache/xbps/*
```
