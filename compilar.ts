import { copyFile, mkdir, opendir, readFile, writeFile } from "fs/promises";
import { basename, extname, join } from "path";
import { execFile as execFileCallback } from "child_process";
import { promisify } from "util";
import * as commonmark from "commonmark";

const execFile = promisify(execFileCallback);

const reader = new commonmark.Parser({ smart: true });
const writer = new commonmark.HtmlRenderer({ safe: false, smart: true });

interface Config {
  sourcePath: string;
  buildPath: string;
}
const config: Config = {
  sourcePath: ".",
  buildPath: "build",
};

function head(title: string, outputName: string) {
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

function header(title: string, sourceCodePath: string, linkConexiones = false) {
  return (
    `<a href=.>☚ Volver al inicio</a>` +
    `<header>
  <h1>${title}</h1>
  <a href="https://gitea.nulo.in/Nulo/sitio/commits/branch/ANTIFASCISTA/${sourceCodePath}">Historial</a>${
      linkConexiones
        ? ` / 
<a href="#conexiones">Conexiones</a>`
        : ""
    }
</header>`
  );
}
const wikilinkExp = /\[\[(.+?)\]\]/giu;

async function scanForConnections(sourcePath: string) {
  const dir = await opendir(sourcePath);
  let connections = [];
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

function hackilyTransformHtml(html: string) {
  return html
    .replaceAll("<a h", '<a rel="noopener noreferrer" h')
    .replaceAll(wikilinkExp, `<a href="$1.html">$1</a>`);
}

const connections = await scanForConnections(config.sourcePath);

await mkdir(config.buildPath, { recursive: true });

const dir = await opendir(config.sourcePath);
let pageList: string[] = [];
let promises = [];
for await (const entry of dir) {
  if (!entry.isFile()) continue;
  promises.push(compileFile(entry.name));
}
await Promise.all(promises);

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
  }

  if (extension === ".md") await compileMarkdown(config, name);
  else if (extension === ".gen") await compileExecutable(config, name);
}

async function compilePageList(config: Config, pageList: string[]) {
  const name = "Lista de páginas";
  const outputPath = join(config.buildPath, name + ".html");
  const html =
    head(name, name) +
    header(name, "compilar.js") +
    `<ul>
  ${pageList
    .map((name) => `<li><a href="${name}.html">${name}</a></li>`)
    .join("\n")}
</ul>
`;
  await writeFile(outputPath, html);
}
async function compileMarkdown(config: Config, sourceFileName: string) {
  const name = basename(sourceFileName, ".md");
  const markdown = await readFile(
    join(config.sourcePath, sourceFileName),
    "utf-8"
  );
  const markdownHtml = renderMarkdown(markdown);

  const fileConnections = connections.filter(({ linked }) => linked === name);

  const isIndex = sourceFileName === "index.md";
  const title = isIndex ? "nulo.in" : name;
  const html =
    head(title, sourceFileName) +
    (isIndex ? "" : header(title, sourceFileName, fileConnections.length > 0)) +
    hackilyTransformHtml(markdownHtml) +
    (fileConnections.length > 0
      ? `
<section id=conexiones>
  <h2>⥆ Conexiones (${fileConnections.length})</h2>
  <ul>
    ${fileConnections
      .map(({ linker }) => `<li><a href="${linker}.html">${linker}</a></li>`)
      .join("\n")}
  </ul>
</section>`
      : "");

  const outputPath = join(
    config.buildPath,
    basename(sourceFileName, ".md") + ".html"
  );
  await writeFile(outputPath, html);
}

async function compileExecutable(config: Config, sourceFileName: string) {
  const name = basename(sourceFileName, ".gen");

  const { stdout, stderr } = await execFile(
    "./" + join(config.sourcePath, sourceFileName)
  );
  if (stderr.length > 0) console.error(`${sourceFileName} stderr: ${stderr}`);

  const html = head(name, name) + header(name, sourceFileName) + stdout;

  const outputPath = join(
    config.buildPath,
    basename(sourceFileName, ".gen") + ".html"
  );
  await writeFile(outputPath, html);
}

// ==============================================
// Markdown utils
// ==============================================

function renderMarkdown(markdown: string) {
  const parsed = reader.parse(markdown);
  return writer.render(parsed);
}
