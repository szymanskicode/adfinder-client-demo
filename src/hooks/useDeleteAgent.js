import Cookies from 'js-cookie';

export default function useDeleteAgent() {
  const deleteAgent = (props) => {
    const url = '/api/agents';
    const token = Cookies.get('token');
    const { data, setters } = props;
    const { setIsWorking, setError, setSuccess, setDeletedAgent } = setters;

    setIsWorking(true);

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          setDeletedAgent && setDeletedAgent(data.user);
          setSuccess && setSuccess(true);
          setIsWorking && setIsWorking(false);
        } else if (data.error) {
          setError && setError(data);
          setIsWorking && setIsWorking(false);
        } else {
          throw Error;
        }
      })
      .catch((err) => {
        setError && setError({ error: 'Wystąpił nieoczekiwany błąd.' });
        setIsWorking && setIsWorking(false);
      });
  };

  return deleteAgent;
}
