export default function latinOnly(value) {
  if (value) {
    value = value.replace(/ą/g, 'a');
    value = value.replace(/Ą/g, 'A');
    value = value.replace(/ć/g, 'c');
    value = value.replace(/Ć/g, 'C');
    value = value.replace(/ę/g, 'e');
    value = value.replace(/Ę/g, 'E');
    value = value.replace(/ł/g, 'l');
    value = value.replace(/Ł/g, 'L');
    value = value.replace(/ń/g, 'n');
    value = value.replace(/Ń/g, 'N');
    value = value.replace(/ó/g, 'o');
    value = value.replace(/Ó/g, 'O');
    value = value.replace(/ś/g, 's');
    value = value.replace(/Ś/g, 'S');
    value = value.replace(/ż/g, 'z');
    value = value.replace(/Ż/g, 'Z');
    value = value.replace(/ź/g, 'z');
    value = value.replace(/Ź/g, 'Z');
    return value;
  } else {
    return null;
  }
}
