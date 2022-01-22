## Activar botones multimedia Bluetooth en Linux

Por alguna razón, tenemos que específicamente cargar un modulo de kernel (`uinput`) antes que el daemon de Bluetooth para que funcione.<sup>[askubuntu.com](https://askubuntu.com/a/6643)</sup>

```
# modprobe uinput
# service bluetooth restart
# # Cargar cada vez que inicia la máquina
# echo 'uinput' | tee -a /etc/modules
```
