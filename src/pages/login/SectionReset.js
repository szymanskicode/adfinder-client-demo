import React from 'react';

const SectionReset = () => {
  return (
    <section>
      <div className='form-header'>
        <i className='material-icons' style={{ marginLeft: 'auto' }}>
          chevron_left
        </i>
        <span style={{ marginRight: 'auto' }}>
          piotrszymanskipoczta@gmail.com
        </span>
      </div>
      <div className='form-content'>
        <form className='col s12'>
          <div className='row' style={{ margin: '0px' }}>
            <div className='input-field col s12'>
              <i className='material-icons prefix'>lock_outline</i>
              <input id='password' type='password' />
              <label htmlFor='password'>Hasło</label>
            </div>
          </div>
          <button
            type='submit'
            className='waves-effect waves-light btn primary'
            style={{ display: 'block', margin: '0 auto' }}
          >
            Zaloguj się
          </button>
        </form>
      </div>
      <div className='forget-password'>
        <a href='/zmien-haslo'>Nie pamiętasz hasła?</a>
      </div>
    </section>
  );
};

export default SectionReset;
