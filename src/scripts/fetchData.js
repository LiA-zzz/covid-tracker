import csv from "csv-parse/lib/sync";

export async function fetchAllData() {
  const today = formatDateYMD(new Date());
  const baseLink =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/";
  const response = await fetch(baseLink + today + ".csv");
  let data = response.ok ? csv(await response.text(), { columns: true }) : null;
  return data;
}

export async function fetchUSAData() {
  const today = formatDateYMD(new Date());
  const baseLink =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/";
  const response = await fetch(baseLink + today + ".csv");
  let data = response.ok ? csv(await response.text(), { columns: true }) : null;
  return data;
}

function formatDateYMD(date) {
  const daysPerMonth = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 31,
    12: 31,
  };
  let d =
    date.getUTCHours() <= 6 ? date.getUTCDate() - 2 : date.getUTCDate() - 1;
  let m = date.getUTCMonth() + 1;
  const y = date.getUTCFullYear();
  if (d === 0) {
    m = m - 1 > 0 ? m - 1 : 12;
    d =
      m === 2
        ? isLeapYear(y)
          ? daysPerMonth[m] + 1
          : daysPerMonth[m]
        : daysPerMonth[m];
  }
  return (m < 10 ? "0" + m : m) + "-" + d + "-" + y;
}

function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 && year % 400 === 0;
}
export default { fetchAllData, fetchUSAData };
