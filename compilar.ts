import { copyFile, mkdir, opendir, readFile, writeFile } from "fs/promises";
import { basename, extname, join } from "path";
import { execFile as execFileCallback } from "child_process";
import { promisify } from "util";
import * as commonmark from "commonmark";

const execFile = promisify(execFileCallback);

const reader = new commonmark.Parser({ smart: true });
const writer = new commonmark.HtmlRenderer({ safe: false, smart: true });

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

const wikilinkExp = /\[\[(.+?)\]\]/giu;

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

async function hackilyTransformHtml(html: string): Promise<string> {
  html = html
    .replaceAll("<a h", '<a rel="noopener noreferrer" h')
    .replaceAll(wikilinkExp, `<a href="$1.html">$1</a>`);
  for (const [match, archivo] of html.matchAll(
    /<nulo-sitio-reemplazar-con archivo="(.+?)" \/>/g
  )) {
    html = html.replace(match, await compileContentHtml(config, archivo));
  }
  return html;
}

const connections = await scanForConnections(config.sourcePath);

await mkdir(config.buildPath, { recursive: true });

const dir = await opendir(config.sourcePath);
let pageList: string[] = [];
let promises: { [key: string]: Promise<void> } = {};
for await (const entry of dir) {
  if (!entry.isFile()) continue;
  promises[entry.name] = compileFile(entry.name);
}
await Promise.all(Object.values(promises));

await compilePageList(config, pageList);

async function compileFile(name: string) {
  const extension = extname(name);
  if (
    [".js", ".md", ".css", ".png", ".jpg", ".mp4", ".svg", ".html"].includes(
      extension
    )
  ) {
    await copyFile(join(config.sourcePath, name), join(config.buildPath, name));
  }
  if ([".md", ".gen"].includes(extension)) {
    pageList.push(basename(name, extension));
    await compileFullHtml(config, name);
  }
}

async function compilePageList(config: Config, pageList: string[]) {
  const name = "Lista de páginas";
  const outputPath = join(config.buildPath, name + ".html");
  const html =
    generateHead(name, name) +
    generateHeader(name, "compilar.ts") +
    `<ul>
  ${pageList
    .map((name) => `<li><a href="${name}.html">${name}</a></li>`)
    .join("\n")}
</ul>
`;
  await writeFile(outputPath, html);
}

async function compileFullHtml(config: Config, sourceFileName: string) {
  const name = basename(sourceFileName, extname(sourceFileName));
  const isIndex = name === "index";
  const title = isIndex ? "nulo.in" : name;
  const fileConnections = connections.filter(({ linked }) => linked === name);

  const contentHtml = await compileContentHtml(config, sourceFileName);

  const html =
    generateHead(title, name) +
    (isIndex
      ? ""
      : generateHeader(title, sourceFileName, fileConnections.length > 0)) +
    contentHtml +
    generateConnectionsSection(fileConnections);

  const outputPath = join(config.buildPath, name + ".html");
  await writeFile(outputPath, html);
}

// ==============================================
// Get HTML
// ==============================================

//TODO: memoize
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

function generateHead(title: string, outputName: string) {
  // TODO: deshardcodear og:url
  return `<!doctype html>
<meta charset=utf-8>
<meta name=viewport content="width=device-width, initial-scale=1.0">
<meta name=author content=Nulo>
<meta property=og:title content="${title}">
<meta property=og:type content=website>
<meta property=og:url content="https://nulo.in/${outputName}.html">
<meta property=og:image content=cowboy.svg>
<link rel=stylesheet href=drip.css>
<link rel=icon href=cowboy.svg>
<title>${title}</title>
`;
}

function generateHeader(
  title: string,
  sourceCodePath: string,
  linkConexiones = false
) {
  return `<a href=.>☚ Volver al inicio</a><header>
  <h1>${title}</h1>
  <a href="https://gitea.nulo.in/Nulo/sitio/commits/branch/ANTIFASCISTA/${sourceCodePath}">Historial</a>${
    linkConexiones
      ? ` / 
<a href="#conexiones">Conexiones</a>`
      : ""
  }
</header>`;
}

function generateConnectionsSection(fileConnections: Connection[]): string {
  return fileConnections.length > 0
    ? `
<section id=conexiones>
  <h2>⥆ Conexiones (${fileConnections.length})</h2>
  <ul>
    ${fileConnections
      .map(({ linker }) => `<li><a href="${linker}.html">${linker}</a></li>`)
      .join("\n")}
  </ul>
</section>`
    : "";
}

// ==============================================
// Markdown utils
// ==============================================

function renderMarkdown(markdown: string) {
  const parsed = reader.parse(markdown);
  return writer.render(parsed);
}
