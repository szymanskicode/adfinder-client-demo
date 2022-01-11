import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetGlobalState } from '../../../contexts/GlobalContext';
import useUpdateBadge from '../../../hooks/useUpdateBadge';
import useGetAds from '../../../hooks/useGetAds';
import ModalBody from '../explore/ModalBody';
import Loading from '../../loading/LoadingContent';
import Error404 from '../../error404/Error404';

import './Ad.css';

const Ad = () => {
  const params = useParams();
  const toggleBadge = useUpdateBadge();
  const { user } = useGetGlobalState();

  // Local state
  const [ad, setAd] = useState('fetching...');

  const getAds = useGetAds();

  // Fetch matching ads
  useEffect(() => {
    if (ad === 'fetching...') {
      const criteria = {
        singlead: true,
        adId: params.id,
      };
      getAds(setAd, criteria);
    } else {
      setAd([]);
    }
    // eslint-disable-next-line
  }, []);

  // Mark ad as watched after open
  useEffect(() => {
    if (!user.badges.includes('watched' + params.id)) {
      setTimeout(() => {
        toggleBadge('watched', params.id);
      }, 1000);
    }
    // eslint-disable-next-line
  }, [user._id, params.id]);

  return (
    <div className='row'>
      <div className='col-12'>
        <div id='ad-detiles' className='modal modal-detiles'>
          {ad === 'fetching...' && <Loading />}
          {ad !== 'fetching...' && ad?.length === 0 && <Error404 />}
          {ad !== 'fetching...' &&
            ad?.length > 0 &&
            ad.map((detiles) => (
              <ModalBody key={detiles._id} data={{ ad: detiles }} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Ad;
