const z = require("zod");

const dateishExp = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/;
const zDateish = z
  .string()
  .regex(dateishExp)
  .transform((s) => {
    const found = s.match(dateishExp);
    return {
      year: parseInt(found.groups.year),
      month: parseInt(found.groups.month),
      day: parseInt(found.groups.day),
    };
  });
/** @typedef {z.infer<zDateish>} Dateish */

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
/**
 * @param {Dateish} dateish
 * @returns Date
 */
function dateishToDate(dateish) {
  return new Date(dateish.year, dateish.month - 1, dateish.day);
}
/**
 * @param {Date} date
 * @param {boolean} upper
 * @returns string
 */
function formatDate(date, upper = false) {
  const formatted = dateFormatter.format(date);
  if (upper) {
    // no le digan a la policía del unicode!
    return formatted[0].toUpperCase() + formatted.slice(1);
  } else return formatted;
}

/**
 * @param {Dateish} dateis
 * @returns string
 */
function dateishToString({ year, month, day }) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

// /**
//  * @param {Dateish} dateish
//  * @param {{ itemprop?: string, upper?: boolean }} params
//  * @returns string
//  */
// function dateishToElement(dateish, { itemprop, upper } = {}) {
//   const itempropParam = (itemprop && ` itemprop="${itemprop}"`) || "";
//   return `<time datetime="${dateishToString(dateish)}" ${itempropParam}>${formatDate(
//     dateishToDate(dateish),
//     upper
//   )}</time>`;
// }

const dateToISO = /** @param {Date} date */ (date) => date.toISOString().slice(0, 10);

module.exports = { formatDate, zDateish, dateishToDate, dateToISO };
