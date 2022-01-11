import React from 'react';
import { Link } from 'react-router-dom'

const SidemenuHeader = () => {
  return (
    <div className='sidemenu-header'>
      <Link to="/" style={{ color: 'inherit' }}>
        <h2 style={{ margin: '0px' }}>Adfinder</h2>
      </Link>
    </div>
  );
};

export default SidemenuHeader;
