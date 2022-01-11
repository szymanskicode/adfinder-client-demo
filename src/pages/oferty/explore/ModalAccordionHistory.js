import { useState, useEffect } from 'react';
import useGetAds from '../../../hooks/useGetAds';
import dateParser from '../../../utils/re_ad-date-parser';

const ModalAccordionHistory = (props) => {
  const { ad, setHistoryCount } = props.data;

  // State
  const [historyAds, setHistoryAds] = useState('fetching...');

  const getAds = useGetAds();

  // Fetch matching ads
  useEffect(() => {
    if (ad.id && ad.date) {
      const criteria = {
        historyads: true,
        historyid: ad.id,
        historydate: ad.date,
      };
      getAds(setHistoryAds, criteria);
    } else {
      setHistoryAds([]);
    }
    // eslint-disable-next-line
  }, []);

  // Set match count
  useEffect(() => {
    if (Array.isArray(historyAds) && historyAds.length > 0) {
      setHistoryCount(historyAds.length);
    }
    // eslint-disable-next-line
  }, [historyAds.length]);

  // Rendering...
  if (historyAds === 'fetching...') {
    return <p className='status-info'>Pobieranie danych...</p>;
  } else if (historyAds.error) {
    return <p className='status-info'>{historyAds.error}</p>;
  } else if (Array.isArray(historyAds) && historyAds.length < 1) {
    return <p className='status-info'>Brak wyników.</p>;
  } else {
    return historyAds.map((historyAd) => {
      return (
        <div key={historyAd._id} className='accordion-record'>
          {(historyAd.date || historyAd.price) && (
            <div className='row'>
              {historyAd.date && (
                <div className='col col-auto'>
                  Data: <strong>{dateParser(historyAd.date)}</strong>
                </div>
              )}
              {historyAd.price && (
                <div className='col text-end'>
                  Cena: <strong>{historyAd.price} PLN</strong>
                </div>
              )}
            </div>
          )}
          {historyAd.transaction && (
            <div className='row'>
              <div className='col col-12'>
                <span className='record-msg'>
                  Transakcja: <strong>{historyAd.transaction}</strong>
                </span>
              </div>
            </div>
          )}
        </div>
      );
    });
  }
};

export default ModalAccordionHistory;
