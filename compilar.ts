import { copyFile, mkdir, opendir, readFile, writeFile } from "fs/promises";
import { basename, extname, join } from "path";
import { execFile as execFileCallback } from "child_process";
import { promisify } from "util";
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
} from "@nulo/html.js";

const execFile = promisify(execFileCallback);

const reader = new commonmark.Parser({ smart: true });
const writer = new commonmark.HtmlRenderer({ safe: false, smart: true });

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const wikilinkExp = /\[\[(.+?)\]\]/giu;

const compilers: {
  [key: string]: (config: Config, sourceFileName: string) => Promise<string>;
} = {
  ".md": compileMarkdownHtml,
  ".gen": compileExecutableHtml,
};

interface Config {
  sourcePath: string;
  buildPath: string;
}
const config: Config = {
  sourcePath: ".",
  buildPath: "build",
};

const connections = await scanForConnections(config.sourcePath);

await mkdir(config.buildPath, { recursive: true });

const dir = await opendir(config.sourcePath);
let pageList: string[] = [];
let promises: Promise<void>[] = [];
for await (const entry of dir) {
  if (!entry.isFile()) continue;
  promises.push(compileFile(entry.name));
}
await Promise.all(promises);

await compilePageList(config, pageList);

async function compileFile(name: string) {
  const extension = extname(name);
  if (
    [
      ".ts",
      ".md",
      ".css",
      ".js",
      ".png",
      ".jpg",
      ".mp4",
      ".svg",
      ".html",
    ].includes(extension)
  ) {
    await copyFile(join(config.sourcePath, name), join(config.buildPath, name));
  }
  if ([".md", ".gen"].includes(extension)) {
    pageList.push(basename(name, extension));
    await compilePage(config, name);
  }
}

async function compilePage(config: Config, sourceFileName: string) {
  const name = basename(sourceFileName, extname(sourceFileName));
  const isIndex = name === "index";
  const title = isIndex ? "nulo.in" : formatTitleToPlainText(name);
  const fileConnections = connections.filter(({ linked }) => linked === name);

  const contentHtml = await compileContentHtml(config, sourceFileName);

  const html = render(
    ...generateHead(title, name),
    ...(isIndex
      ? []
      : generateHeader(name, sourceFileName, fileConnections.length > 0)),
    raw(contentHtml),
    ...generateConnectionsSection(fileConnections)
  );

  const outputPath = join(config.buildPath, name + ".html");
  await writeFile(outputPath, html);
}

// ==============================================
// Get HTML
// ==============================================

// TODO: memoize
function compileContentHtml(
  config: Config,
  sourceFileName: string
): Promise<string> {
  return compilers[extname(sourceFileName)](config, sourceFileName);
}

async function compileMarkdownHtml(
  config: Config,
  sourceFileName: string
): Promise<string> {
  const markdown = await readFile(
    join(config.sourcePath, sourceFileName),
    "utf-8"
  );
  const markdownHtml = renderMarkdown(markdown);
  const contentHtml = await hackilyTransformHtml(markdownHtml);
  return contentHtml;
}

async function compileExecutableHtml(
  config: Config,
  sourceFileName: string
): Promise<string> {
  const { stdout, stderr } = await execFile(
    "./" + join(config.sourcePath, sourceFileName)
  );
  if (stderr.length > 0) console.error(`${sourceFileName} stderr: ${stderr}`);

  return stdout;
}

// ==============================================
// Generated HTML
// ==============================================

function generateHead(titlee: string, outputName: string): Renderable[] {
  // TODO: deshardcodear og:url
  return [
    doctype(),
    metaUtf8,
    meta({
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    }),
    meta({
      name: "author",
      content: "Nulo",
    }),
    meta({
      property: "og:title",
      content: titlee,
    }),
    meta({
      property: "og:type",
      content: "website",
    }),
    meta({
      property: "og:url",
      content: `https://nulo.in/${outputName}.html`,
    }),
    meta({
      property: "og:image",
      content: "cowboy.svg",
    }),
    link({
      rel: "stylesheet",
      href: "drip.css",
    }),
    link({
      rel: "icon",
      href: "cowboy.svg",
    }),
    title(titlee),
  ];
}

function formatDate(dateish: Dateish): string {
  const date = new Date(dateish.year, dateish.month - 1, dateish.day);
  return dateFormatter.format(date);
}

interface Dateish {
  year: number;
  month: number;
  day: number;
}
interface TitleMetadata {
  // title puede tener length == 0 y por lo tanto ser falseish
  title: string;
  date?: Dateish;
}
function parseTitle(name: string): TitleMetadata {
  const titleWithDate =
    /^((?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2}))? ?(?<title>.*)$/;

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
  return { title, date };
}

// formatTitle formattea un title para ser mostrado.
// si existe una date pero no un titulo (por ejemplo, un archivo tipo `2023-03-09.md`) usa la fecha como título.
// si si existe un titulo, la pone como date para ponerse en un subtitulo o entre paréntesis
function formatTitle(title: TitleMetadata): { title: string; date?: string } {
  if (title.title) {
    let date: string | undefined;
    if (title.date) date = formatDate(title.date);
    return { title: title.title, date };
  } else {
    if (title.date) {
      const date = formatDate(title.date);
      // no le digan a la policía del unicode!
      return { title: date[0].toUpperCase() + date.slice(1) };
    } else {
      console.debug(title);
      throw new Error("Imposible: TitleMetadata totalmente vacío");
    }
  }
}

function formatTitleToPlainText(title: string): string {
  const formattedTitle = formatTitle(parseTitle(title));
  return (
    formattedTitle.title +
    (formattedTitle.date ? ` (${formattedTitle.date})` : "")
  );
}

function generateHeader(
  name: string,
  sourceCodePath: string,
  linkConexiones = false
): Renderable[] {
  const formattedTitle = formatTitle(parseTitle(name));
  return [
    a({ href: "." }, "☚ Volver al inicio"),
    header(
      h1(formattedTitle.title),
      ...(formattedTitle.date ? [p(formattedTitle.date)] : []),
      a(
        {
          href: `https://gitea.nulo.in/Nulo/sitio/commits/branch/ANTIFASCISTA/${sourceCodePath}`,
        },
        "Historial"
      ),
      ...(linkConexiones
        ? [" / ", a({ href: "#conexiones" }, "Conexiones")]
        : [])
    ),
  ];
}

function generateConnectionsSection(
  fileConnections: Connection[]
): Renderable[] {
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

async function compilePageList(config: Config, pageList: string[]) {
  const name = "Lista de páginas";
  const outputPath = join(config.buildPath, name + ".html");
  const html = render(
    ...generateHead(name, name),
    ...generateHeader(name, "compilar.ts"),
    ul(
      ...pageList
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

function renderMarkdown(markdown: string) {
  const parsed = reader.parse(markdown);
  return writer.render(parsed);
}

async function hackilyTransformHtml(html: string): Promise<string> {
  html = html
    .replaceAll("<a h", '<a rel="noopener noreferrer" h')
    .replaceAll(wikilinkExp, (_, l) => render(internalLink(l)));
  for (const [match, archivo] of html.matchAll(
    /<nulo-sitio-reemplazar-con archivo="(.+?)" \/>/g
  )) {
    html = html.replace(match, await compileContentHtml(config, archivo));
  }
  return html;
}

// ==============================================
// Linking
// ==============================================

function internalLink(path: string): VirtualElement {
  const href = encodeURI(`./${path}.html`);
  return a({ href }, formatTitleToPlainText(path));
}
