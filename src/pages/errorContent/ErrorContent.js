import React from 'react';
import { Link } from 'react-router-dom';

/* Style CSS */
import './ErrorContent.css';

const ErrorContent = () => {
  return (
    <div id='errorContent-screen'>
      <div className='error-wrapper'>
        <h1>Ups...</h1>
        <p>Coś poszło nie tak.</p>
      </div>
      <Link to='/'>
        <i className='bi-chevron-left'></i> strona główna
      </Link>
    </div>
  );
};

export default ErrorContent;
