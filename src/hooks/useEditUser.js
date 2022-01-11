import Cookies from 'js-cookie';
import { useState } from 'react';
import { useSetUser } from '../contexts/GlobalContext';
import useLogoutUserAll from './useLogoutUserAll';

export default function useEditUser() {
  // State
  const [editError, setEditError] = useState(null);

  const setUser = useSetUser();
  const logoutUserAll = useLogoutUserAll();
  const token = Cookies.get('token');

  // Fetch user
  const editUser = (props) => {
    const dataObj = props.data;
    const setIsWorking = props.setIsWorking;

    const url = (process.env.API_URL || '') + '/api/users/me';
    const data = dataObj;
    setIsWorking(true);
    setEditError(null);

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
        if (data && data.user) {
          // Remove last used email when email was changed
          if (dataObj.email) {
            Cookies.remove('last_used_email', { path: '' });
          }
          // Logout if email or password was changed
          if (dataObj.email || dataObj.password) {
            logoutUserAll();
          }
          // Set global user
          setUser(data.user);
        } else if (data.validationErrors) {
          setEditError(data.validationErrors);
        } else if (data.error) {
          setEditError(data);
        }
        setIsWorking(false);
      })
      .catch((err) => {
        setEditError({ error: 'Wystąpił bład serwera.' + err });
        setIsWorking(false);
      });
  };

  return [editUser, editError];
}
