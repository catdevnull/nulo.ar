#!/bin/sh
rsync --rsh='ssh -p420' --progress --recursive --chmod=644 build/ root@nulo.in:/var/www/nulo.in/
