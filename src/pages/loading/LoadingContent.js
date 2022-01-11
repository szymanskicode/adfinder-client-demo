import './Loading.css';

const LoadingContent = () => {
  return (
    <div className='loader-wrapper'>
      <div className='ad-finder'>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span>Wczytywanie danych...</span>
    </div>
  );
};

export default LoadingContent;
