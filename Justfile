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

clean:
	if [ ! -z "$(git status --porcelain)" ]; then echo "not clean!"; exit 1; fi

ready_to_upload: check refresh_feeds
upload: clean ready_to_upload _dirty_upload
_dirty_upload: build
	rsync --rsh='ssh -p2223 -J root@dorsiblanco.nulo.in:993' --recursive --chmod=644 build/ root@localhost:/data/nulo_ar/
	# rsync --rsh='ssh -p443' --recursive --chmod=644 build/ root@nulo.ar:/var/www/nulo.ar/

