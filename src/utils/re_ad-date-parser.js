export default function fn(date) {
  if (date) {
    date = date.toString();
    const year = date.substring(0, 4);
    let month = date.substring(4, 6);
    const day = date.substring(6, 8);

    date = `${day}.${month}.${year}`;

    return date;
  } else return null;
}
