export default function fn(url) {
  if (url) {
    return (
      <a href={url} target='_blank' rel='noreferrer'>
        <span className='table-td-btn'>
          <i className='bi-link'></i>
        </span>
      </a>
    );
  } else return null;
}
