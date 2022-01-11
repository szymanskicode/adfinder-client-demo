import React from 'react';
import { Link } from 'react-router-dom';

import { useGetGlobalState } from '../../contexts/GlobalContext';

const Home = () => {
  const state = useGetGlobalState();

  return (
    <>
      <div className="card flat text-center" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h1>Dashboard</h1>
        <p>Witaj {state && state.user && state.user.email}!</p>
        <Link to='/oferty/przegladaj'>
          <span className="btn btn-primary btn-lg">Przeglądaj oferty</span>
        </Link>
      </div>
    </>
  )
};

export default Home;
