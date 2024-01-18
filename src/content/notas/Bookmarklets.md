>Un bookmarklet es un marcador que, en lugar de apuntar a una dirección URL, hace referencia a una pequeña porción de código JavaScript para ejecutar ciertas tareas automáticamente[..]

[Wikipedia](https://es.wikipedia.org/wiki/Bookmarklet)

## Mostrar un borde rosa en todos los elementos para debuggear

```
javascript:(()=>{let style=document.head.querySelector('style#outline');if(style){style.remove()}else{style=document.createElement('style');style.id='outline';document.head.appendChild(style);style.append(`*{outline: 1px solid pink}`)}})()
```

Deestructurado:
```javascript
// Hacer un bloque que se auto-ejecuta, aislando sus variables del entorno global
(() => {
  // Intentar buscar si ya aplicamos el estilo
  let style = document.head.querySelector('style#outline')
  if (style) {
    // Si lo hicimos, borrarlo
    style.remove()
  } else {
    // Si no, crearlo
    style = document.createElement('style')
    style.id = 'outline'
    document.head.appendChild(style)
    style.append(`*{outline: 1px solid pink}`)
  }
})()
```
