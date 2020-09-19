import csv from "csv-parse/lib/sync";

export async function fetchData() {
  const today = formatDateYMD(new Date());
  const baseLink =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/";
  const response = await fetch(baseLink + today + ".csv");
  let data = response.ok ? csv(await response.text(), { columns: true }) : null;
  return data;
}

function formatDateYMD(date) {
  let d = date.getUTCDate() - 1;
  let m = date.getUTCMonth() + 1;
  let y = date.getUTCFullYear();
  return (m < 10 ? "0" + m : m) + "-" + d + "-" + y;
}
