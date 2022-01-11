import Cookies from 'js-cookie';

export default function useEditAgent() {
  const editAgent = (props) => {
    const url = (process.env.API_URL || '') + '/api/agent';
    const token = Cookies.get('token');
    const { data, setters } = props;
    const { setIsWorking, setError, setSuccess, setAgents } = setters;

    setIsWorking(true);

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
          setAgents &&
            setAgents((prev) => {
              const filteredList = prev.filter(
                (user) => user._id !== data.user._id
              );
              const updatedList = [...filteredList, data.user];
              return updatedList;
            });
          setSuccess && setSuccess(true);
          setIsWorking && setIsWorking(false);
        } else if (data.validationErrors) {
          setError && setError(data.validationErrors);
          setIsWorking && setIsWorking(false);
        } else if (data.error) {
          setError && setError(data);
          setIsWorking && setIsWorking(false);
        }
      })
      .catch((err) => {
        setError && setError({ error: 'Wystąpił nieoczekiwany błąd.' });
      });
  };

  return editAgent;
}
