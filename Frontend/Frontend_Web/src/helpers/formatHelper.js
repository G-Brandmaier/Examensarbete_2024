import iso6391 from "iso-639-1";
import { getYear, getMonth, getDate } from "date-fns";

/* TIME */
export const formatMinutesToHoursAndMinutes = (minutes) => {
  var hours = Math.floor(minutes / 60);
  var restMinutes = minutes % 60;
  return `${hours}h  ${restMinutes}min`;
};

export const getAgeFromDate = (date) => {
  let todaysDate = new Date();
  let todaysYear = getYear(todaysDate);
  let compareYear = getYear(date);
  let age = todaysYear - compareYear;

  if (
    todaysDate < new Date(getYear(todaysDate), getMonth(date), getDate(date))
  ) {
    age--;
  }
  return `${age} years`;
};

/* CURRENCY */
export function getCurrency(amount) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formattedAmount = formatter.format(amount);
  return formattedAmount;
}

/* LANGUAGE */
export function getLanguage(languageCode) {
  const languageName = iso6391.getName(languageCode);
  return languageName;
}
