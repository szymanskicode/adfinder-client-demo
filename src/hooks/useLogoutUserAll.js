import { useHistory } from 'react-router-dom';
import { useSetUser } from '../contexts/GlobalContext';
import Cookies from 'js-cookie';

export default function useLogoutUserAll() {
  const setUser = useSetUser();
  const history = useHistory();

  // Logout user from all devices
  const logoutUserAll = async () => {
    const url = (process.env.API_URL || '') + '/api/users/logoutAll';
    const token = await Cookies.get('token');

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: null,
    })
      .then((response) => response.json())
      .then((data) => {
        Cookies.remove('token', { path: '/' });
        setUser(null);
        history.push('/logowanie');
      })
      .catch((err) => {
        Cookies.remove('token', { path: '/' });
        setUser(null);
        history.push('/logowanie');
      });
  };

  return logoutUserAll;
}
