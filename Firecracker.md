## Compilar tu propio Firecracker

```sh
# compilar imagen dev
podman build -t public.ecr.aws/firecracker/fcuvm:v56 --build-arg=ARCH=x86_64 -f tools/devctr/Dockerfile .
# compilar firecracker
tools/devtool build
```
