export default function useCreateAgent() {
  const createAgent = (props) => {
    const url = (process.env.API_URL || '') + '/api/users';
    const { data, setters } = props;
    const { setIsWorking, setError, setSuccess, setAgents } = setters;

    setIsWorking(true);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          setAgents && setAgents((prev) => [...prev, data.user]);
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

  return createAgent;
}
