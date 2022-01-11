import latinStr from './latinStr';

export default function toSearchString(value) {
  if (value) {
    value = latinStr(value);
    value = value.toLowerCase();
    value = value.replace(/ /g, '-');
    return value;
  } else {
    return null;
  }
}
