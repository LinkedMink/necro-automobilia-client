const DATE_OPTIONS = { year: "numeric", month: "long", day: "numeric" };
const DATE_LOCALE = "en-US";

export const getLongDateString = date => {
  let toFormat = date;
  if (typeof date === "string") {
    toFormat = new Date(date);
  }

  return toFormat.toLocaleDateString(DATE_LOCALE, DATE_OPTIONS);
};

export const getDateTimeString = date => {
  let toFormat = date;
  if (typeof date === "string") {
    toFormat = new Date(date);
  }

  return toFormat.toLocaleString(DATE_LOCALE);
};
