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
  const d =
    date.getUTCHours() <= 6 ? date.getUTCDate() - 2 : date.getUTCDate() - 1;
  const m = date.getUTCMonth() + 1;
  const y = date.getUTCFullYear();
  return (m < 10 ? "0" + m : m) + "-" + d + "-" + y;
}

export default { fetchAllData, fetchUSAData };
