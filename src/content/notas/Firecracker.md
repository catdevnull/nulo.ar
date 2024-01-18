- [Getting Started](https://github.com/firecracker-microvm/firecracker/blob/main/docs/getting-started.md)

## Compilar tu propio Firecracker

```sh
# compilar imagen dev
podman build -t public.ecr.aws/firecracker/fcuvm:v56 --build-arg=ARCH=x86_64 -f tools/devctr/Dockerfile .
# compilar firecracker
tools/devtool build
```

## Cosas hechas con Firecracker

- [Fly Machines](https://fly.io/docs/machines/)
- [Serverless CI with Podman, Firecracker, fly.io Machines, and temporal.io](https://wundergraph.com/blog/the_builder_the_road_from_commit_to_production_in_13s) - CIs optimizadas
  - [How to run end-to-end tests 10x faster with firecracker](https://webapp.io/blog/github-actions-10x-faster-with-firecracker/) - similar al anterior
- [Julia Evans - Firecracker: start a VM in less than a second](https://jvns.ca/blog/2021/01/23/firecracker--start-a-vm-in-less-than-a-second): ejemplo básico, como compilar tu kernel y observaciones
- [Go SDK](https://github.com/firecracker-microvm/firecracker-go-sdk) y [firectl](https://github.com/firecracker-microvm/firectl/): mejores interfaces (oficiales) para crear y manejar VMs
- [Actuated](https://actuated.dev/blog/managing-github-actions) es un runner seguro para GitHub Actions
