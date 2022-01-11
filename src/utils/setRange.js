export default function setRange(valFrom, valTo) {
  if (!valFrom || parseInt(valFrom) === 0) {
    valFrom = false;
  } else {
    valFrom = parseInt(valFrom);
  }

  if (!valTo || parseInt(valTo) === 0) {
    valTo = false;
  } else {
    valTo = parseInt(valTo);
  }

  if (valFrom > valTo) {
    valTo = false;
  }

  return [valFrom, valTo];
}
