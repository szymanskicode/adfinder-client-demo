export default function fn(price, surface) {
  if (price & surface) {
    let value = price / surface;
    value = parseFloat(value).toFixed(0);
    return value;
  } else return null;
}
