import React from 'react';
import { NavLink } from 'react-router-dom';
import SidemenuHeader from './SidemenuHeader';
import { hideSideMenu } from '../../utils/sidemenuToggler';

// CSS Styles
import './Sidemenu.css';

const Drawer = () => {
  return (
    <aside id='sidemenu'>
      <SidemenuHeader />
      <h3 className='sidemenu-list-header'>Oferty</h3>
      <ul className='sidemenu-list'>
        <li>
          <NavLink to='/oferty/przegladaj' onClick={() => hideSideMenu()}>
            <i className='bi-search'></i>
            <span>Przeglądaj</span>
          </NavLink>
        </li>

        <li>
          <NavLink to='/oferty/przydzielone' onClick={() => hideSideMenu()}>
            <i className='bi-bookmarks'></i>
            <span>Przydzielone</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/oferty/koszyki' onClick={() => hideSideMenu()}>
            <i className='bi-basket3'></i>
            <span>Koszyki</span>
          </NavLink>
        </li>
        <li>
          <span className="disabled-link" onClick={() => hideSideMenu()}>
            <i className='bi-graph-up'></i>
            <span>Statystyki</span>
          </span>
        </li>
        <li>
          <span className="disabled-link" onClick={() => hideSideMenu()}>
            <i className='bi-clipboard-plus'></i>
            <span>Dodaj</span>
          </span>
        </li>
      </ul>
      <h3 className='sidemenu-list-header'>Konto</h3>
      <ul className='sidemenu-list'>
        <li>
          <NavLink to='/konto/mojedane' onClick={() => hideSideMenu()}>
            <i className='bi-briefcase'></i>
            <span>Moje dane</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/konto/agenci' onClick={() => hideSideMenu()}>
            <i className='bi-people'></i>
            <span>Agenci</span>
          </NavLink>
        </li>
        <li>
          <span className="disabled-link" to='/konto/logi' onClick={() => hideSideMenu()}>
            <i className='bi-list-check'></i>
            <span>Logi</span>
          </span>
        </li>
        <li>
          <span className="disabled-link" to='/konto/platnosci' onClick={() => hideSideMenu()}>
            <i className='bi-cash'></i>
            <span>Płatności</span>
          </span>
        </li>
        <li>
          <span className="disabled-link" to='/konto/ustawienia' onClick={() => hideSideMenu()}>
            <i className='bi-gear'></i>
            <span>Ustawienia</span>
          </span>
        </li>
      </ul>
      <h3 className='sidemenu-list-header'>Pozostałe</h3>
      <ul className='sidemenu-list'>
        <li>
          <NavLink to='/informator' onClick={() => hideSideMenu()}>
            <i className='bi-info-circle'></i>
            <span>Informator</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/contact' onClick={() => hideSideMenu()}>
            <i className='bi-envelope'></i>
            <span>Kontakt</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Drawer;
