export function getTitleFromId(id: string) {
  const parts = id.split("/");
  const title = parts[0].replace(/\.md$/, "");
  return title;
}
