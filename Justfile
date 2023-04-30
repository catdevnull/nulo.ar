default: build

builder := "gitea.nulo.in/nulo/sitio-build"
build_builder_image:
	podman build -t {{builder}} tooling/
_run command: build_builder_image
	podman run -it --rm \
		-v ".:/sitio:Z" --workdir /sitio \
		{{builder}} sh -c "{{command}}"
run command: (_run "pnpm install") (_run command)

build: (run './tool build')
check: (run './tool check')
refresh_feeds: (run './tool refresh_feeds')

ready_to_upload: check refresh_feeds build
upload: ready_to_upload
	rsync --rsh='ssh -p443' --recursive --chmod=644 build/ root@nulo.ar:/var/www/nulo.ar/

