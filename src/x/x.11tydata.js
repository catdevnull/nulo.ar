const { basename, extname } = require("path");
const { zDateish, formatDate, dateishToDate } = require("../../helpers/date.js");

// /**
//  * @typedef {{
//     // title puede tener length == 0 y por lo tanto ser falseish
//     title: string;
//     date?: import("../.eleventy.js").Dateish;
// } |
//     {date: import("../.eleventy.js").Dateish;}} TitleMetadata
//  */

// const titleWithDateExp = /^((?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2}))? ?(?<title>.*)$/;
// /**
//  * @param {string} name
//  * @returns TitleMetadata
//  */
// function parseName(name) {
//   const found = name.match(titleWithDateExp);
//   if (!found || !found.groups) throw new Error("Algo raro pasó");
//   const { title } = found.groups;

//   const date =
//     (found.groups.year && {
//       year: parseInt(found.groups.year),
//       month: parseInt(found.groups.month),
//       day: parseInt(found.groups.day),
//     }) ||
//     undefined;
//   // no definir title si es length == 0
//   if (!title && date) return { date };
//   return { title, date };
// }

const wikilinkRegExp = /\[\[\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/g;

/**
 * @param {string} a
 * @param {string} b
 * @returns boolean
 */
function caselessCompare(a, b) {
  return a.normalize().toLowerCase() === b.normalize().toLowerCase();
}
const titleWithDateExp = /^((?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})) ?(?<title>.*)$/;

module.exports = {
  eleventyComputed: {
    title: ({ page }) => {
      const parsed = zDateish.safeParse(page.fileSlug);
      if (parsed.success) {
        return formatDate(dateishToDate(parsed.data), true);
      } else return page.fileSlug;
    },
    dateInTitle: ({ page }) => zDateish.safeParse(page.fileSlug).success,
    linkTitle: (data) => {
      const fileName = basename(data.page.inputPath, extname(data.page.inputPath));
      if (data.dateInTitle) {
        return data.title;
      } else if (fileName.match(titleWithDateExp)) {
        return `${data.page.fileSlug} (${formatDate(data.page.date, false)})`;
      } else return data.page.fileSlug;
    },
    // https://github.com/binyamin/eleventy-garden/blob/77be371da872f14adb827e707b49101920aafaec/notes/notes.11tydata.js#L15
    backlinks: (data) => {
      const notes = data.collections.x;
      const currentFileSlug = data.page.fileSlug;

      const backlinks = notes
        .filter((otherNote) =>
          (otherNote.template.frontMatter.content.match(wikilinkRegExp) || [])
            .map((/** @type {string} */ link) =>
              // Extract link location
              link
                .slice(2, -2)
                .split("|")[0]
                .replace(/.(md|markdown)\s?$/i, "")
                .trim(),
            )
            .map((/** @type {string} */ link) => {
              const partes = link.split("/");
              return partes[partes.length - 1];
            })
            .some((/** @type {string} */ link) => {
              return caselessCompare(link, currentFileSlug);
            }),
        )
        .map((otherNote) => ({
          url: otherNote.url,
          title: otherNote.data.title,
          preview: otherNote.template.frontMatter.content.slice(0, 240),
        }));

      return backlinks;
    },
  },
};
