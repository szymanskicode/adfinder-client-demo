import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import loginUser from '../../utils/api/loginUser';
import { useSetUser } from '../../contexts/GlobalContext';

const SectionPassword = (props) => {
  const { userEmail, setStep } = props.useState;

  const [isWorking, setIsWorking] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const [password, setPassword] = useState('');

  const history = useHistory();
  const setGlobalUser = useSetUser();

  // Login user
  const handleSubmit = (e) => {
    const setters = {
      setIsWorking,
      setError,
      setUser,
    };

    setIsWorking(true);
    e.preventDefault();
    loginUser(userEmail, password, setters);
  };

  // Set global user
  useEffect(() => {
    if (user._id) {
      setGlobalUser(user);
    }
    // eslint-disable-next-line
  }, [user._id]);

  return (
    <section>
      <div className='form-header'>
        <span
          onClick={() => {
            setStep('email');
            Cookies.remove('last_used_email', { path: '' });
            history.push('/logowanie');
          }}
          className='material-icons btnBack'
          style={{ marginLeft: 'auto' }}
        >
          <i className='bi-chevron-left'></i>
        </span>
        <span style={{ marginRight: 'auto' }}>{userEmail}</span>
      </div>
      <div className='form-content'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Hasło
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby='passwordHelp'
              autoFocus
            />
            <div id='passwordHelp' className='form-text text-danger'>
              {error}
            </div>
          </div>
          <button
            disabled={isWorking}
            type='submit'
            className='btn btn-primary'
            style={{ display: 'block', margin: '0 auto' }}
          >
            {isWorking ? 'Logowanie...' : 'Zaloguj się'}
          </button>
        </form>
      </div>
      <div className='forget-password'>
        <a href='/zmien-haslo'>Nie pamiętasz hasła?</a>
      </div>
    </section>
  );
};

export default SectionPassword;
