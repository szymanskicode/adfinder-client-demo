export default function fn(value) {
  if (value) {
    value = parseFloat(value).toFixed(1);
    value = value.replace('.', ',');
    return value;
  } else return null;
}
