import Cookies from 'js-cookie';
import { useSetUser } from '../contexts/GlobalContext';

export default function useUpdateBadge() {
  const token = Cookies.get('token');
  const setUser = useSetUser();

  // Fetch user
  const toggleBadge = (badgeName, adId) => {
    const url = (process.env.API_URL || '') + '/api/users/badge';
    const data = { adId, badgeName };

    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else throw Error();
      })
      .catch((err) => {
        return;
      });
  };

  return toggleBadge;
}
