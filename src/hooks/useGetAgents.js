import Cookies from 'js-cookie';

const useGetAgents = () => {
  const getAgents = (props) => {
    const { setAgents, setError } = props.setters;
    let url = (process.env.API_URL || '') + '/api/agents';
    const token = Cookies.get('token');

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.users) {
          setAgents(data.users);
        } else {
          setAgents([]);
        }
      })
      .catch((err) => {
        setError({
          msg: 'Wystąpił błąd przy pobieraniu listy agentów.',
          detiles: null,
        });
        setAgents([]);
      });
  };

  return getAgents;
};

export default useGetAgents;
