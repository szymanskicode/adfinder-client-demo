import Cookies from 'js-cookie';
import saveLog from '../utils/saveLog';

const useGetAds = () => {
  const getAds = (setAds, criteria = {}, setters = {}) => {
    setAds('fetching...');
    let url = (process.env.API_URL || '') + '/api/re_ads';
    const token = Cookies.get('token');
    const params = criteria; //object;

    const { setCount, setLimit } = setters;

    if (Object.keys(params).length > 0) {
      Object.keys(params).forEach((key, index) => {
        if (index === 0) {
          url = url + '?';
        } else {
          url = url + '&';
        }
        url = url + key + '=' + params[key];
      });
    }

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ads) {
          setAds(data.ads);
          data.count && setters.setCount && setCount(data.count);
          data.limit && setters.setLimit && setLimit(data.limit);
        } else {
          setAds([]);
        }
      })
      .catch((err) => {
        setAds({ error: 'Wystąpił błąd przy pobieraniu danych.' });
        saveLog({
          type: 'danger',
          msg: 'Error during fetching ads / ' + err,
          info: 'Wykryto w .catch() w useGetAds.js',
        });
      });
  };

  return getAds;
};

export default useGetAds;
