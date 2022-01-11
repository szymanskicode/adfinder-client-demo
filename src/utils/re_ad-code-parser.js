export default function fn(category, transaction, rooms) {
  if (category && transaction) {
    let c;
    if (category.toLowerCase().includes('dzia')) {
      c = 'Dz';
    } else {
      c = category.substring(0, 1);
      c = c.toUpperCase();
    }

    let t;
    t = transaction.substring(0, 1);
    t = t.toUpperCase();

    let r;
    if (rooms) {
      r = rooms;
    } else r = '';

    let kod = c + t + r;

    return kod;
  } else return null;
}
