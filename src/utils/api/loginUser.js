import Cookies from 'js-cookie';

export default async function loginUser(email, password, setters = {}) {
  const url = (process.env.REACT_APP_API_URL || '') + '/api/users/login';
  const data = { email, password };
  const { setIsWorking, setUser, setError } = setters;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data && data.user) {
        // Set global user
        setUser(data.user);
        // Set cookies token
        Cookies.set('token', data.token, { path: '/' });
        setIsWorking(false);
      } else if (data.validationErrors.password) {
        setIsWorking(false);
        return setError(data.validationErrors.password);
      } else {
        setIsWorking(false);
        return setError(data.validationErrors.error);
      }
    })
    .catch((err) => {
      setError('Wystąpił bład serwera.');
      setIsWorking(false);
    });
}
