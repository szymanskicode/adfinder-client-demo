import { useState, useEffect } from 'react';
import { useGetGlobalState } from '../../../contexts/GlobalContext';
import useCreateAgent from '../../../hooks/useCreateAgent';

const AddAgentForm = (props) => {
  const { setAgents, clearFormFlag } = props;

  // Local state
  const [isWorking, setIsWorking] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const { user } = useGetGlobalState();
  const createAgent = useCreateAgent();

  const clearForm = () => {
    setUsername('');
    setPhone('');
    setEmail('');
    setPassword('');
    setRepeatPassword('');
    setError({});
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username,
      phone,
      email,
      password,
      repeatPassword,
      parentId: user._id,
      parentRole: user.role,
    };
    const setters = {
      setIsWorking,
      setError,
      setSuccess,
      setAgents,
    };

    createAgent({ data, setters });
  };

  useEffect(() => {
    setTimeout(() => {
      clearForm();
    }, 500);
  }, [clearFormFlag]);

  return (
    <div className='row'>
      <div className='col col-12'>
        {!success && (
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className='mb-3'>
              <label htmlFor='username' className='form-label'>
                Nazwa *
              </label>
              <input
                type='text'
                className='form-control'
                id='username'
                aria-describedby='usernameHelp'
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <div
                id='usernameHelp'
                className='form-text'
                style={{ fontWeight: 'normal' }}
              >
                {error && error.username ? (
                  <span className='text-danger'>{error.username}</span>
                ) : (
                  'Nazwa wyświetlana w serwisie.'
                )}
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor='phone' className='form-label'>
                Nr telefonu
              </label>
              <input
                type='text'
                className='form-control'
                id='phone'
                aria-describedby='phoneHelp'
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              <div
                id='phoneHelp'
                className='form-text'
                style={{ fontWeight: 'normal' }}
              >
                {error && error.phone ? (
                  <span className='text-danger'>{error.phone}</span>
                ) : (
                  'Informacja dla współpracowników.'
                )}
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                E-mail *
              </label>
              <input
                type='text'
                className='form-control'
                id='email'
                aria-describedby='emailHelp'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <div
                id='emailHelp'
                className='form-text'
                style={{ fontWeight: 'normal' }}
              >
                {error && error.email ? (
                  <span className='text-danger'>{error.email}</span>
                ) : (
                  'Wymagany przy logowaniu.'
                )}
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Hasło *
              </label>
              <input
                type='password'
                className='form-control'
                id='password'
                aria-describedby='passwordHelp'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div
                id='passwordHelp'
                className='form-text'
                style={{ fontWeight: 'normal' }}
              >
                {error && error.password ? (
                  <span className='text-danger'>{error.password}</span>
                ) : (
                  'Wymagane przy logowaniu.'
                )}
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor='repeatPassword' className='form-label'>
                Powtórz hasło *
              </label>
              <input
                type='password'
                className='form-control'
                id='repeatPassword'
                aria-describedby='repeatPasswordHelp'
                value={repeatPassword}
                onChange={(e) => {
                  setRepeatPassword(e.target.value);
                }}
              />
              <div
                id='repeatPasswordHelp'
                className='form-text'
                style={{ fontWeight: 'normal' }}
              >
                {error && error.repeatPassword && (
                  <span className='text-danger'>{error.repeatPassword}</span>
                )}
              </div>
            </div>
            {error && error.error && (
              <p className='text-danger'>{error.error}</p>
            )}
            <div style={{ textAlign: 'right' }}>
              <button
                type='button'
                className='btn btn-secondary btn-sm'
                data-bs-dismiss='modal'
                aria-label='Close'
                style={{ margin: '0 5px 5px 0' }}
                onClick={() => clearForm()}
              >
                Anuluj
              </button>
              <button
                disabled={isWorking}
                type='submit'
                className='btn btn-primary btn-sm'
                style={{ margin: '0 5px 5px 0px' }}
              >
                {isWorking ? 'Tworzenie...' : 'Utwórz konto'}
              </button>
            </div>
          </form>
        )}
        {success && (
          <>
            <div className='alert alert-success'>
              <strong>Konto zostało utworzone!</strong>
              <br />
              <span style={{ fontWeight: 'normal' }}>
                Można rozpocząć korzystanie z konta.
              </span>
            </div>
            <div className='text-center'>
              <button
                type='button'
                className='btn btn-primary btn-sm'
                data-bs-dismiss='modal'
                aria-label='Close'
                style={{ margin: '0 5px 5px 0' }}
                onClick={() => {
                  clearForm();
                  setTimeout(() => {
                    setSuccess(false);
                  }, 500);
                }}
              >
                OK
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddAgentForm;
