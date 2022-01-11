import { useState, useEffect } from 'react';
import useGetAds from '../../../hooks/useGetAds';
import dateParser from '../../../utils/re_ad-date-parser';

const ModalAccordionOther = (props) => {
  const { ad, setOtherCount } = props.data;

  // State
  const [otherAds, setOtherAds] = useState('fetching...');

  const getAds = useGetAds();

  // Fetch matching ads
  useEffect(() => {
    if (ad._id && ad.phone) {
      const criteria = {
        otherads: true,
        otherid: ad._id,
        otherphone: ad.phone,
      };
      getAds(setOtherAds, criteria);
    } else {
      setOtherAds([]);
    }
    // eslint-disable-next-line
  }, []);

  // Set match count
  useEffect(() => {
    if (Array.isArray(otherAds) && otherAds.length > 0) {
      setOtherCount(otherAds.length);
    }
    // eslint-disable-next-line
  }, [otherAds.length]);

  // Rendering...
  if (otherAds === 'fetching...') {
    return <p className='status-info'>Pobieranie danych...</p>;
  } else if (otherAds.error) {
    return <p className='status-info'>{otherAds.error}</p>;
  } else if (Array.isArray(otherAds) && otherAds.length < 1) {
    return <p className='status-info'>Brak wyników.</p>;
  } else {
    return otherAds.map((otherAd) => {
      return (
        <div key={otherAd._id} className='accordion-record'>
          <div className='row'>
            <div className='col col-auto'>
              Data: <strong>{dateParser(otherAd.date)}</strong>
            </div>
            <div className='col text-end'>
              Cena: <strong>{otherAd.price} PLN</strong>
            </div>
          </div>
          <div className='row'>
            <div className='col col-12'>
              Transakcja: <strong>{otherAd.transaction}</strong>
            </div>
            <div className='col col-12'>
              Rodzaj: <strong>{otherAd.category}</strong>
            </div>
            <div className='col col-12'>
              Powierzchnia: <strong>{otherAd.surface} m²</strong>
            </div>
            <div className='col col-12'>
              Województwo: <strong>{otherAd.state}</strong>
            </div>
            <div className='col col-12'>
              Miasto: <strong>{otherAd.city}</strong>
            </div>
          </div>
          <div className='row'>
            <div className='col col-12'>
              <span className='record-msg'>
                Tytuł: <strong>{otherAd.title}</strong>
              </span>
            </div>
          </div>
        </div>
      );
    });
  }
};

export default ModalAccordionOther;
