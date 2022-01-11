export default function formatDatePl(date) {
  let day = date.getDate();
  if (day < 10) {
    day = '0' + day;
  }

  let month = date.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }

  const year = date.getFullYear();

  const formatedDate = day + '.' + month + '.' + year;

  return formatedDate;
}
