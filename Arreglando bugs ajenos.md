<small>2021/10/11</small>

Estoy aprendiendo alemán y mi principal recurso es el "Aprender Alemán" de la Deutsche Welle ([learngerman.dw.com](https://learngerman.dw.com/es/overview)). Sin embargo, en una de las recientes actualizaciones al sitio/app, rompieron _varias_ cosas.

Les mandé un mail al equipo de desarrollo ¡pero no me contestaron! Así que lo arreglé yo mismo.

Pero ¿cómo? El código es privativo y no tengo acceso. El _JavaScript_ que llega a mi navegador está minificado, es decir que se le elimina palabras y se comprime a un archivo para ahorrar ancho de banda. Pero **otra de las razones por las que se minifica es para no dar acceso al código.**

Sin embargo, el equipo de desarrollo cometió un error (¿intencionalmente?) en donde dejaron los "source maps". Los source maps son unos archivos que le permiten a las herramientas de desarrolladorx saber que parte del código minificado es cuál línea de código. ¡Por eso se llaman mapas! Para lograr esto, contienen casi todo el código del sitio.

Pero hay un último 5% del código que me hace falta para poder aplicar cambios: la configuración de las herramientas que minifican y compilan el código. Para mi suerte, este sitio utiliza una tecnología con la que ya tengo experiencia (React) así que puedo reconstruir esta configuración por mi cuenta.

Sabiendo esto, vayamos a lo práctico.

## Extrayendo el código

Empiezo por abrir la ventana de herramientas de desarrolladorx de mi navegador en el sitio y extraigo los enlaces a los archivos que terminan con `.map`, que son los source maps. Los guardo en un archivo con un enlace por línea y los descargo utilizando un script:

```sh
for f in $(cat files); do
	wget $f
done
```

Ok, ahora necesito extraer los archivos de código de cada uno. Por suerte, ya existen herramientas que lo hagan por mi. Probé con [este script](https://gist.github.com/banyudu/b17a9cb3f05296b76a9f3051f66c3dcd) pero mi mejor experiencia fue con [este](https://github.com/akx/source-from-sourcemaps).

```sh
for f in *.map; do
	node source-from-sourcemaps.js $f
done
```

## Levantando el código localmente

Después configuré una herramienta que compila código de React y hace otras magias por mi llamada [Vite](https://vitejs.dev). Podría haber usado la que lxs desarrolladorxs del sitio usaron originalmente, [webpack](https://webpack.js.org/), pero en mi experiencia es muy tedioso de configurar.

Tuve varios problemas al intentar levantar un entorno de desarrollo local con el código. Acá están algunos junto a sus soluciones en ningún orden particular:

-   Vite esperaba que los archivos de React tengan la extensión `.jsx` mientras que originalmente tenían la extensión `.js`. Script:

	```sh
	for f in $(find -iname '*.js'); do
		mv $f ${f}x
	done
	```

-   Había una parte del código que eran archivos SVG "compilados" a React. Sin embargo, estos esperaban una variable especial de webpack (o algún plugin de webpack) que por supuesto no existía. Para esto, hice otro script para inyectarles esa variable:

	```sh
	for f in $(find -iname '*.svg.js'); do
		echo 'const __webpack_public_path__ = "https://learngerman.dw.com/";' > ${f}.lol
		cat $f >> ${f}.lol
		mv ${f}.lol $f
	done
	```

-   Tenía que instalar las dependencias de todo el proyecto. Esto lo hice con más script-fu:

	```sh
	grep -r "from '[\w@].*';" . > imports
	sort -u imports > imports.uniq
	xargs pnpm add < imports.uniq
	# Por alguna razón esto no fue suficiente y tuve que manualmente añadir varias dependencias
	pnpm add graphql videojs-seek-buttons videojs-contrib-quality-levels videojs-hls-quality-selector videojs-seek-buttons videojs-hls-quality-selector
	```

-   Faltaba tener el CSS localmente así que lo descargé:

	```sh
	for f in basestyles stylesheets customBaku; do
		wget https://learngerman.dw.com/assets/css/${f}.css
	done
	```

-   En `config.js` se tomaban variables de entorno que asumo existen en el entorno de trabajo de lxs desarrolladorxs. Yo las mentí:

	```js
	const process = {
		env: {
			// REACT_APP_GRAPHQL_BASE_URL: "https://learngerman.dw.com/graphql",
			REACT_APP_GRAPHQL_BASE_URL: "https://localhost:4002/graphql",
			REACT_APP_RECAPTCHA_SITEKEY: null,
		},
	};
	```

	Notese como originalmente había mentido diciendo que la URL de la API era learngerman.dw.com, pero luego lo cambié para que apunte a una URL local ya que la API no me permitía accederla desde un sitio no legítimo. Esa URL local apunta a un proxy a la API real.

Es muy probable que haya tenido que hacer más cosas y me haya olvidado. Fue mucho prueba y error hasta que el sitio finalmente cargó.

## Arreglando bug 1: problema de accesibilidad

Por un tiempo, tuve una de mis muñecas inaccesibles por unas semanas. Esto me obligo a usar exclusivamente la otra, complicando el uso del mouse y utilizando el teclado lo más posible.

Recientemente, en el sitio agregaron una solapa de "transcripción" mostrando todo el dialogo que había en el video del ejercicio. Sin embargo, cuando esta solapa estaba cerrada, se podían seguir seleccionando los enlaces dentro de la solapa con el teclado, haciendo la navegación por teclado tediosa.

<video controls src="Arreglando bugs ajenos.md-details.mp4"></video>

La solucion es simplemente usar el elemento de solapa que ya viene con el navegador: [`<details>`](https://developer.mozilla.org/es/docs/Web/HTML/Element/details). (La página de `<details>` en MDN esta desactualizada al momento de escribir este artículo.)

Estos fueron los cambios que hice:

```diff
diff --git a/./components/ContentContainer/AccordionContainer.jsx.orig b/./components/ContentContainer/AccordionContainer.jsx
index ed71204..d0ea66e 100644
--- a/./components/ContentContainer/AccordionContainer.jsx.orig
+++ b/./components/ContentContainer/AccordionContainer.jsx
@@ -6,43 +6,26 @@ import { colors } from '../../utils/css';
 import { useTranslation } from '../../hooks/useTranslation';

 export const AccordionContainer = ({ title, children, className }) => {
-  const element = useRef(null);
-  const [isOpen, { toggleOnClick }] = useToggle();
-  const height = element.current ? element.current.scrollHeight : '0';
   const titleTranslation = useTranslation(title);

   return (
-    <div className={className}>
-      <div className="row noVMargins">
+    <details className={className}>
+      <summary className="row noVMargins">
         <div className="col-sm-offset-1 col-sm-10 col-lg-offset-2 col-lg-8">
-          <button tabIndex={0} onClick={toggleOnClick}>
             <h4>
               {titleTranslation}
-              <ToggleableArrow
-                className="toggleable-arrow"
-                fill={colors.LG_BLACK}
-                {...{
-                  isUp: isOpen,
-                }}
-              />
             </h4>
-          </button>
         </div>
-      </div>
+      </summary>
       <AccordionContainerContent
-        height={height}
-        isOpen={isOpen}
-        ref={element}
-        aria-expanded={isOpen}
       >
         {children}
       </AccordionContainerContent>
-    </div>
+    </details>
   );
 };

 export const AccordionContainerContent = styled.div`
-  max-height: ${({ isOpen, height }) => (isOpen ? height : '1')}px;
   overflow: hidden;
   background-color: ${colors.LG_WHITE};
   transition: max-height 0.7s;
```

## Arreglando bug 2: no cargan algunos ejercicios

Esto tardó mucho más tiempo de arreglar y sinceramente no vale la pena explicarlo. El cambio es bastante simple, lo explico en inglés:

```diff
diff --git a/components/Lesson/LessonExercise/LessonExerciseItem/LessonExerciseItem.jsx.orig b/components/Lesson/LessonExercise/LessonExerciseItem/LessonExerciseItem.jsx
index 6d35539..66b5005 100644
--- a/components/Lesson/LessonExercise/LessonExerciseItem/LessonExerciseItem.jsx.orig
+++ b/components/Lesson/LessonExercise/LessonExerciseItem/LessonExerciseItem.jsx
@@ -91,12 +91,20 @@ export const getExerciseMediaInputComponentByType = data => {
           <MediaInputAudio data={data} />
         </div>
       );
+    // XXX: Here is the problem. These exercises return inputType == 'VIDEO'
+    // even though they don't have any videos (videos == []) causing some
+    // code that assumes that there is a video inside videos to fail
+    // (the MediaInputVideo component.)
     case 'VIDEO':
-      return (
-        <div className="input-header-video">
-          <MediaInputVideo data={data} />
-        </div>
-      );
+      // This "if" is our patch. If it isn't true, it fallsthrough to the default
+      // behaviour (returning null.)
+      if (data.content.videos.length > 0) {
+        return (
+          <div className="input-header-video">
+            <MediaInputVideo data={data} />
+          </div>
+        );
+      }
     default:
       return null;
   }
```

## Conclusión

Más allá del desarrollo técnico que hice, creo que es más importante el político: [**el código desarrollado con dinero público debería ser público**](https://publiccode.eu/es/). Para el caso... todo el código debería ser público, pero eso es un debate para otro día.

Por otro lado, se me vienen a la mente la necesidad de testear el código para que no pasen cosas como bug 2, y también el testeo de herramientas de accesibilidad para bug 1.

[Gute Nacht!](https://gitea.nulo.in/Nulo/learngerman)
