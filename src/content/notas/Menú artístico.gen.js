import { a, h2, li, ol, render } from "@nulo/html.js";

const [m, f] = [0, 1];

/** @type {[string, number][]} */
const tipos = [
  ["Un collage", m],
  ["Una intervención contrapublicitaria o contrapropaganda", f],
  ["Una cerámica", f],
  ["Un comic", m],
];

const temas = [
  "destrucción ambiental",
  "una canción",
  "otra obra artística",
  "el mercado inmobiliario",
  "redes sociales",
];

/** @type {[string, string][]} */
const adjetivos = [
  ["", ""],
  ["feo", "fea"],
];

/** @param {number} n */
const range = (n) => {
  let list = [];
  for (let i = 0; i < n; i++) list.push(i);
  return list;
};

/**
 * @template {any} T
 * @param {T[]} list
 * @returns {T}
 */
const random = (list) => list[Math.floor(Math.random() * list.length)];

export default () => {
  return render(
    h2("Algunas obras generadas aleatoriamente"),
    ol(
      ...range(10).map(() => {
        const tipo = random(tipos);
        const tema = random(temas);
        const adjetivo = random(adjetivos)[tipo[1]];
        return li(tipo[0], " ", adjetivo, " sobre ", tema);
      }),
    ),
    h2("Tipos de obra"),
    ol(...tipos.map((t) => li(t[0]))),
    h2("Algunas características (opcional)"),
    ol(...adjetivos.map((a) => li(a[0], "/", a[1]))),
    h2("Temas para la obra"),
    ol(...temas.map((t) => li(t))),
    a(
      {
        href: "https://github.com/catdevnull/nulo.ar/blob/ANTIFASCISTA/src/x/Men%C3%BA%20art%C3%ADstico.gen.js",
      },
      "Código",
    ),
  );
};
