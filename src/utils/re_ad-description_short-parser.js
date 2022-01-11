export default function fn(title, dsc) {
  if (title && dsc) {
    const totalLength = 350;
    const titleLength = title.length;
    const dscLength = totalLength - titleLength;

    dsc = dsc.substring(0, dscLength);
    dsc = dsc.trim();
    dsc = dsc + '...';
    return (
      <>
        <strong>{title}</strong> {dsc}
      </>
    );
  } else return null;
}
