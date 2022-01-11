import { useState, useEffect } from 'react';
import useGetAds from '../../../hooks/useGetAds';

// Components
import TableView from '../explore/TableView';
import LoadingContent from '../../loading/LoadingContent';

// CSS Styles
import '../Offers.css';

const Observed = () => {
  const [ads, setAds] = useState('fetching...');
  const getAds = useGetAds();
  useEffect(() => {
    const criteria = { obs: 1 };

    getAds(setAds, criteria);
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className='row'>
        <div className='col col-12'>
          <div className='accordion' id='search-accordion'>
            <div className='accordion-item'>
              <h2
                className='accordion-header page-title'
                id='searchAccordionHeadingOne'
              >
                <span>Obserwowane</span>
                <span
                  className='toggle-filters'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#searchAccordionOne'
                  aria-expanded='true'
                  aria-controls='searchAccordionOne'
                >
                  <i className='bi-sliders'></i> FILTRY
                </span>
              </h2>
              <div
                id='searchAccordionOne'
                className='accordion-collapse collapse'
                aria-labelledby='searchAccordionHeadingOne'
                data-bs-parent='#search-accordion'
              >
                <div className='accordion-body'>Wyszukiwarka tutaj...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col col-12'>
          {!ads || (ads === 'fetching...' && <LoadingContent />)}

          {ads.length < 1 && (
            <p className='alert alert-secondary text-center'>
              Brak wyników spełniających wybrane kryteria.
            </p>
          )}

          {ads.error && <p className='alert alert-secondary'>{ads.error}</p>}

          {Array.isArray(ads) && ads.length > 0 && <TableView data={ads} />}
        </div>
      </div>
    </>
  );
};

export default Observed;
