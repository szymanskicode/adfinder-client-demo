import { useState } from 'react';
import { useGetGlobalState } from '../../../contexts/GlobalContext';
import useEditUser from '../../../hooks/useEditUser';

// CSS Styles
import './Mydata.css';

function timeConverter(timestamp) {
  const newDate = new Date(timestamp);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  const time = date + '.' + month + '.' + year;
  return time;
}

const Mydata = () => {
  const { user } = useGetGlobalState();
  const [editUser, editError] = useEditUser();

  // State
  const [isWorking, setIsWorking] = useState(false);
  const [error, setError] = useState({});
  const [username, setUsername] = useState(user.username);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('password');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [changePassword, setChangePassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {};
    if (username !== user.username) {
      data.username = username;
    }
    if (phone !== user.phone) {
      data.phone = phone;
    }
    if (email !== user.email) {
      data.email = email;
    }
    if (changePassword) {
      data.password = password;
    }
    if (changePassword) {
      data.repeatPassword = repeatPassword;
    }

    if (
      username !== user.username ||
      phone !== user.phone ||
      email !== user.email ||
      changePassword
    ) {
      editUser({ data, setIsWorking });
    } else {
      setError({ msg: 'Wprowadź zmiany, aby je zapisać.' });
    }
  };

  return (
    <div id='mojedane'>
      <div className='row'>
        <div className='col col-12'>
          <h2 className='page-title'>Moje dane</h2>
        </div>
      </div>
      <div className='row'>
        <div className='col col-12 col-md-6'>
          <form className='mb-4' onSubmit={(e) => handleSubmit(e)}>
            <h5 className='section-header'>Dane użytkownika</h5>
            <section className='section-body'>
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
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div id='usernameHelp' className='form-text'>
                  {editError && editError.username ? (
                    <span className='text-danger'>{editError.username}</span>
                  ) : (
                    <span>Nazwa wyświetlana w serwisie.</span>
                  )}
                </div>
              </div>

              <div className='mb-3'>
                <label htmlFor='phone' className='form-label'>
                  Nr Telefonu
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='phone'
                  aria-describedby='phoneHelp'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div id='phoneHelp' className='form-text'>
                  {editError && editError.phone ? (
                    <span className='text-danger'>{editError.phone}</span>
                  ) : (
                    <span>Informacja dla współpracowników.</span>
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
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div id='emailHelp' className='form-text'>
                  {editError && editError.email ? (
                    <span className='text-danger'>{editError.email}</span>
                  ) : (
                    <span>Wymagany przy logowaniu.</span>
                  )}
                </div>
              </div>

              <label htmlFor='password' className='form-label'>
                {changePassword ? 'Nowe Hasło *' : 'Hasło *'}
              </label>
              <div className='input-group'>
                <input
                  disabled={!changePassword}
                  type='password'
                  className='form-control'
                  id='password'
                  aria-describedby='passwordHelp'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className='btn btn-link'
                  type='button'
                  style={{ border: 'none', textDecoration: 'none' }}
                  onClick={() => {
                    setChangePassword((prev) => !prev);
                    if (password.length > 0) {
                      setPassword('');
                    } else {
                      setPassword('password');
                    }
                  }}
                >
                  {changePassword ? 'Nie zmieniaj' : 'Zmień'}
                </button>
              </div>
              <div id='passwordHelp' className='form-text mb-3'>
                {editError && editError.password && changePassword ? (
                  <span className='text-danger'>{editError.password}</span>
                ) : (
                  <span>Wymagane przy logowaniu.</span>
                )}
              </div>

              {changePassword && (
                <div className='mb-3'>
                  <label htmlFor='repassword' className='form-label'>
                    Powtórz hasło *
                  </label>
                  <input
                    type='password'
                    className='form-control'
                    id='repassword'
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                  <div className='form-text'>
                    {editError && editError.repeatPassword ? (
                      <span className='text-danger'>
                        {editError.repeatPassword}
                      </span>
                    ) : null}
                  </div>
                </div>
              )}
              {(email !== user.email || changePassword) && (
                <p>
                  <small>
                    Uwaga: Zmiana adres e-mail lub hasła spowoduje automatyczne
                    wylogowanie.
                  </small>
                </p>
              )}
              {((editError && editError.error) || error.msg) && (
                <p className='text-danger'>
                  {editError && editError.error} {error.msg && error.msg}
                </p>
              )}
              <button
                type='submit'
                className='btn btn-primary'
                disabled={isWorking}
              >
                {isWorking ? 'Zapisywanie...' : 'Zapisz'}
              </button>
            </section>
          </form>
        </div>
        <div className='col col-12 col-md-6'>
          <h5 className='section-header'>Dane twojej firmy</h5>
          <section className='section-body'>
            <p className='firm-info-p '>
              <span className='firm-info-label'>Nazwa: </span>
              <span className='firm-info'>{user.firmName}</span>
            </p>
            <p className='firm-info-p'>
              <span className='firm-info-label'>Adres: </span>
              <span className='firm-info'>
                {user.firmStreet} {user.firmStreetNumber}, {user.firmPostalCode}{' '}
                {user.firmCity}
              </span>
            </p>
            <p className='firm-info-p'>
              <span className='firm-info-label'>NIP: </span>
              <span className='firm-info'>{user.firmNIP}</span>
            </p>
            <p className='firm-info-p'>
              <span className='firm-info-label'>E-mail (główny): </span>
              <span className='firm-info'>{user.firmEmail}</span>
            </p>
            <p className='firm-info-p'>
              <span className='firm-info-label'>Nr tel: </span>
              <span className='firm-info'>{user.firmPhone}</span>
            </p>
            <hr />
            <p className='firm-info-p'>
              <span className='firm-info-label'>Rola: </span>
              <span className='firm-info'>
                {user.role && user.role.includes('wner')
                  ? 'Właściciel'
                  : user.role}
              </span>
            </p>
            <p className='firm-info-p'>
              <span className='firm-info-label'>Typ konta: </span>
              <span className='firm-info'>{user.accountType}</span>
            </p>
            <p className='firm-info-p'>
              <span className='firm-info-label'>Termin ważności konta: </span>
              <span className='firm-info'>{timeConverter(user.accountExpires)}</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Mydata;
