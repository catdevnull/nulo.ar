import { copyFile, mkdir, opendir, readFile, readdir, writeFile } from "fs/promises";
import { basename, extname, join } from "path";
import * as commonmark from "commonmark";
import {
  a,
  doctype,
  h1,
  header,
  section,
  li,
  link,
  meta,
  metaUtf8,
  render,
  Renderable,
  title,
  ul,
  h2,
  raw,
  p,
  VirtualElement,
  time,
  article,
  main,
  img,
  script,
  basicElement,
  nav,
  source,
} from "@nulo/html.js";

const div = basicElement("div");

const reader = new commonmark.Parser({ smart: true });
const writer = new commonmark.HtmlRenderer({ safe: false, smart: true });

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const wikilinkExp = /\[\[(.+?)\]\]/giu;

interface Config {
  sourcePath: string;
  buildPath: string;
}
const config: Config = {
  sourcePath: ".",
  buildPath: "build",
};

const buscadorHtml = await readFile("buscador.htm", "utf-8");

const connections = await scanForConnections(config.sourcePath);

await mkdir(config.buildPath, { recursive: true });

const dir = await readdir(config.sourcePath, { withFileTypes: true });
let pageList: { src: string }[] = [];
for (const entry of dir) {
  if (!entry.isFile()) continue;
  const { name } = entry;
  const extension = extname(name);

  if ([".ts", ".md", ".css", ".js", ".png", ".jpg", ".mp4", ".svg", ".html"].includes(extension)) {
    await copyFile(join(config.sourcePath, name), join(config.buildPath, name));
  }

  if ([".md"].includes(extension) || name.endsWith(".gen.js")) {
    pageList.push({ src: name });
  }
}
await Promise.all(pageList.map(({ src }) => compilePage(config, src)));

await compilePageList(config, pageList);

async function compileFile(
  config: Config,
  sourceFileName: string
): Promise<{ contentHtml: string; image?: Image }> {
  if (extname(sourceFileName) === ".md") {
    const { html: contentHtml, image } = await compileMarkdownHtml(config, sourceFileName);
    return { contentHtml, image };
  } else if (sourceFileName.endsWith(".gen.js")) {
    const contentHtml = await compileJavascript(config, sourceFileName);
    return { contentHtml };
  } else if (sourceFileName.endsWith(".htm"))
    return { contentHtml: await readFile(sourceFileName, "utf-8") };
  else throw false;
}

async function compilePage(config: Config, sourceFileName: string) {
  const name = basename(sourceFileName, extname(sourceFileName));
  const isIndex = name === "index";
  const title = isIndex ? "nulo.ar" : formatNameToPlainText(name);
  const fileConnections = connections.filter(({ linked }) => linked === name);

  const { contentHtml, image } = await compileFile(config, sourceFileName);

  const html = renderHtml(
    ...generateHead(title, name),
    article(
      { itemscope: "", itemtype: "https://schema.org/Article" },
      ...(isIndex ? [] : generateHeader(name, sourceFileName, fileConnections.length > 0, image)),
      main({ itemprop: "articleBody", "data-pagefind-body": "" }, raw(contentHtml)),
      ...generateConnectionsSection(fileConnections)
    )
  );

  const outputPath = join(config.buildPath, name + ".html");
  await writeFile(outputPath, html);
}

// ==============================================
// Get HTML
// ==============================================

type Image = {
  src: string;
  alt: string;
};

async function compileMarkdownHtml(
  config: Config,
  sourceFileName: string
): Promise<{ html: string; image?: Image }> {
  let markdown = await readFile(join(config.sourcePath, sourceFileName), "utf-8");

  let image;
  if (markdown.startsWith("!!")) {
    const node = reader.parse(markdown.slice(1, markdown.indexOf("\n")));
    const imageNode = node.firstChild?.firstChild;
    if (!imageNode || !imageNode.destination)
      throw new Error("Intenté parsear un ^!! pero no era una imágen");
    if (!imageNode.firstChild?.literal) console.warn(`El ^!! de ${sourceFileName} no tiene alt`);

    image = {
      src: imageNode.destination,
      alt: imageNode.firstChild?.literal || "",
    };
    markdown = markdown.slice(markdown.indexOf("\n"));
  }

  const parsed = reader.parse(markdown);
  const markdownHtml = writer.render(parsed);

  checkLinks(sourceFileName, markdownHtml);
  const contentHtml = await hackilyTransformHtml(markdownHtml);
  return { html: contentHtml, image };
}

async function compileJavascript(config: Config, sourceFileName: string): Promise<string> {
  const fn = await import("./" + join(config.sourcePath, sourceFileName));
  return await fn.default();
}

// ==============================================
// Generated HTML
// ==============================================

function renderHtml(...world: Renderable[]): string {
  return `<!doctype html><html lang="es">` + render(...world) + "</html>";
}

function generateHead(titlee: string, outputName: string): Renderable[] {
  // TODO: deshardcodear og:url
  return [
    metaUtf8,
    meta({
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    }),
    meta({ name: "author", content: "Nulo" }),
    meta({ property: "og:title", content: titlee }),
    meta({ property: "og:type", content: "website" }),
    meta({ property: "og:url", content: `https://nulo.ar/${outputName}.html` }),
    meta({ property: "og:image", content: "cowboy.svg" }),
    link({ rel: "stylesheet", href: "drip.css" }),
    link({ rel: "icon", href: "cowboy.svg" }),
    title(titlee),
  ];
}

function formatDate(dateish: Dateish, upper: boolean = false): string {
  const date = new Date(dateish.year, dateish.month - 1, dateish.day);
  const formatted = dateFormatter.format(date);
  if (upper) {
    // no le digan a la policía del unicode!
    return formatted[0].toUpperCase() + formatted.slice(1);
  } else return formatted;
}

interface Dateish {
  year: number;
  month: number;
  day: number;
}
function dateishToString({ year, month, day }: Dateish): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

type TitleMetadata =
  | {
      // title puede tener length == 0 y por lo tanto ser falseish
      title: string;
      date?: Dateish;
    }
  | { date: Dateish };
function parseName(name: string): TitleMetadata {
  const titleWithDate = /^((?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2}))? ?(?<title>.*)$/;

  const found = name.match(titleWithDate);
  if (!found || !found.groups) throw new Error("Algo raro pasó");
  const { title } = found.groups;

  const date =
    (found.groups.year && {
      year: parseInt(found.groups.year),
      month: parseInt(found.groups.month),
      day: parseInt(found.groups.day),
    }) ||
    undefined;
  // no definir title si es length == 0
  if (!title && date) return { date };
  return { title, date };
}

function dateishToElement(
  dateish: Dateish,
  { itemprop, upper }: { itemprop?: string; upper?: boolean } = {}
): VirtualElement {
  return time(
    { datetime: dateishToString(dateish), ...(itemprop ? { itemprop } : {}) },
    formatDate(dateish, upper)
  );
}

function formatNameToInline(name: string): Renderable[] {
  const parsed = parseName(name);
  if ("title" in parsed) {
    const { title, date } = parsed;
    return [title, ...(date ? [` (`, dateishToElement(date), `)`] : [])];
  } else {
    return [dateishToElement(parsed.date, { upper: true })];
  }
}
function formatNameToPlainText(name: string): string {
  const parsed = parseName(name);
  if ("title" in parsed) {
    const { title, date } = parsed;
    return title + (date ? ` (${formatDate(date)})` : "");
  } else {
    return formatDate(parsed.date, true);
  }
}

function generateHeader(
  name: string,
  sourceCodePath: string,
  linkConexiones = false,
  image?: Image
): Renderable[] {
  const parsedTitle = parseName(name);
  return [
    nav(a({ href: "." }, "☚ Volver al inicio"), raw(buscadorHtml)),
    header(
      ...(image ? [img({ ...image, itemprop: "image" })] : []),
      ...("title" in parsedTitle
        ? [
            h1(parsedTitle.title),
            ...(parsedTitle.date
              ? [
                  dateishToElement(parsedTitle.date, {
                    itemprop: "datePublished",
                  }),
                  " / ",
                ]
              : []),
          ]
        : [
            h1(
              dateishToElement(parsedTitle.date, {
                itemprop: "datePublished",
                upper: true,
              })
            ),
          ]),
      a(
        {
          href: `https://gitea.nulo.in/Nulo/sitio/commits/branch/ANTIFASCISTA/${sourceCodePath}`,
        },
        "Historial"
      ),
      ...(linkConexiones ? [" / ", a({ href: "#conexiones" }, "Conexiones")] : [])
    ),
  ];
}

function generateConnectionsSection(fileConnections: Connection[]): Renderable[] {
  return fileConnections.length > 0
    ? [
        section(
          { id: "conexiones" },
          h2(`⥆ Conexiones (${fileConnections.length})`),
          ul(...fileConnections.map(({ linker }) => li(internalLink(linker))))
        ),
      ]
    : [];
}

async function compilePageList(config: Config, pageList: { src: string }[]) {
  const name = "Lista de páginas";
  const outputPath = join(config.buildPath, name + ".html");
  const html = renderHtml(
    ...generateHead(name, name),
    ...generateHeader(name, "compilar.ts"),
    ul(
      ...pageList
        .map(({ src: name }) => basename(name, extname(name)))
        .sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base" }))
        .map((name) => li(internalLink(name)))
    )
  );
  await writeFile(outputPath, html);
}

// ==============================================
// Conexiones
// ==============================================

interface Connection {
  linked: string;
  linker: string;
}

async function scanForConnections(sourcePath: string): Promise<Connection[]> {
  const dir = await opendir(sourcePath);
  let connections: Connection[] = [];
  for await (const entry of dir) {
    const extension = extname(entry.name);
    if (extension === ".md") {
      const name = basename(entry.name, ".md");
      const file = await readFile(join(config.sourcePath, entry.name), "utf-8");
      for (const [, linked] of file.matchAll(wikilinkExp)) {
        connections.push({ linked, linker: name });
      }
    }
  }
  return connections;
}

// ==============================================
// Markdown utils
// ==============================================

async function hackilyTransformHtml(html: string): Promise<string> {
  html = html
    .replaceAll("<a h", '<a rel="noopener noreferrer" h')
    .replaceAll(wikilinkExp, (_, l) => render(internalLink(l)));
  for (const [match, archivo] of html.matchAll(/<nulo-sitio-reemplazar-con archivo="(.+?)" \/>/g)) {
    html = html.replace(match, (await compileFile(config, archivo)).contentHtml);
  }
  return html;
}

function checkLinks(srcName: string, html: string) {
  const matches = html.matchAll(wikilinkExp);
  const list = pageList.map(({ src }) => basename(src, extname(src)));
  if (!matches) return;
  for (const match of matches) {
    if (!list.some((n) => n === match[1])) {
      console.warn(`${srcName} linkea a ${match[1]}, pero no existe`);
    }
  }
}

// ==============================================
// Linking
// ==============================================

function internalLink(path: string): VirtualElement {
  const href = encodeURI(`./${path}.html`);
  return a({ href }, ...formatNameToInline(path));
}
