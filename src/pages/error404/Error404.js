import React from 'react';
import { Link } from 'react-router-dom';

/* Style CSS */
import './Error404.css';

const Error404 = () => {
  return (
    <div id='error404-screen'>
      <div className='error-wrapper'>
        <h1>404</h1>
        <p>Nie ma takiej strony.</p>
      </div>
      <Link to='/'>
        <i className='bi-chevron-left'></i> strona główna
      </Link>
    </div>
  );
};

export default Error404;
