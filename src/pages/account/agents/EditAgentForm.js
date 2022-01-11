import { useState, useEffect } from 'react';
import useEditAgent from '../../../hooks/useEditAgent';

const EditAgentForm = (props) => {
  const { agent, setAgents, clearFormFlag } = props;

  // Local state
  const [isWorking, setIsWorking] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState(agent.username);
  const [phone, setPhone] = useState(agent.phone);
  const [email, setEmail] = useState(agent.email);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const editAgent = useEditAgent();

  const clearForm = () => {
    setUsername(agent.username);
    setPhone(agent.phone);
    setEmail(agent.email);
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
      agentId: agent._id,
    };
    if (username && username !== agent.username) {
      data.username = username;
    }
    if (phone && phone !== agent.phone) {
      data.phone = phone;
    }
    if (email && email !== agent.email) {
      data.email = email;
    }
    if (password && password !== agent.password) {
      data.password = password;
      data.repeatPassword = repeatPassword;
    }

    const setters = {
      setIsWorking,
      setError,
      setSuccess,
      setAgents,
    };

    if (!data.username && !data.phone && !data.email && !data.password) {
      setError({ error: 'Wprowadź zmiany, aby je zapisać.' });
      return;
    }

    editAgent({ data, setters });
  };

  useEffect(() => {
    setTimeout(() => {
      clearForm();
    }, 500);
    // eslint-disable-next-line
  }, [clearFormFlag]);

  return (
    <div className='row'>
      <div className='col col-12'>
        {!success && (
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className='mb-3'>
              <label htmlFor={'username' + agent._id} className='form-label'>
                Nazwa *
              </label>
              <input
                type='text'
                className='form-control'
                id={'username' + agent._id}
                aria-describedby={'usernameHelp' + agent._id}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <div
                id={'usernameHelp' + agent._id}
                className='form-text'
                style={{ fontWeight: 'normal' }}
              >
                {error && error.username && (
                  <span className='text-danger'>{error.username}</span>
                )}
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor={'phone' + agent._id} className='form-label'>
                Nr telefonu
              </label>
              <input
                type='text'
                className='form-control'
                id={'phone' + agent._id}
                aria-describedby={'phoneHelp' + agent._id}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              <div
                id={'phoneHelp' + agent._id}
                className='form-text'
                style={{ fontWeight: 'normal' }}
              >
                {error && error.phone && (
                  <span className='text-danger'>{error.phone}</span>
                )}
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor={'email' + agent._id} className='form-label'>
                E-mail *
              </label>
              <input
                type='text'
                className='form-control'
                id={'email' + agent._id}
                aria-describedby={'emailHelp' + agent._id}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <div
                id={'emailHelp' + agent._id}
                className='form-text'
                style={{ fontWeight: 'normal' }}
              >
                {error && error.email && (
                  <span className='text-danger'>{error.email}</span>
                )}
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor={'password' + agent._id} className='form-label'>
                Hasło *
              </label>
              <input
                type='password'
                className='form-control'
                id={'password' + agent._id}
                aria-describedby={'passwordHelp' + agent._id}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div
                id={'passwordHelp' + agent._id}
                className='form-text'
                style={{ fontWeight: 'normal' }}
              >
                {error && error.password && (
                  <span className='text-danger'>{error.password}</span>
                )}
              </div>
            </div>
            <div className='mb-3'>
              <label
                htmlFor={'repeatPassword' + agent._id}
                className='form-label'
              >
                Powtórz hasło *
              </label>
              <input
                type='password'
                className='form-control'
                id={'repeatPassword' + agent._id}
                aria-describedby={'repeatPasswordHelp' + agent._id}
                value={repeatPassword}
                onChange={(e) => {
                  setRepeatPassword(e.target.value);
                }}
              />
              <div
                id={'repeatPasswordHelp' + agent._id}
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
                {isWorking ? 'Zapisywanie...' : 'Zapisz'}
              </button>
            </div>
          </form>
        )}
        {success && (
          <>
            <div className='alert alert-success'>
              <strong>Dane zostały zmienione!</strong>
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

export default EditAgentForm;
