import { useGetGlobalState } from '../../contexts/GlobalContext';
import useLogoutUserAll from '../../hooks/useLogoutUserAll';
import { toggleSideMenu } from '../../utils/sidemenuToggler';

// CSS Styles
import './Navbar.css';

const Navbar = () => {
  const globalState = useGetGlobalState();
  const { email, firmName, firmNIP } = globalState.user;

  // handle logout click
  const handleLogout = useLogoutUserAll();

  // parsing globalState.firmName
  function parseFirmName(firmName) {
    if (firmName) {
      const originalName = firmName;
      firmName = firmName.toUpperCase().substring(0, 10);
      if (originalName.length > firmName.length) {
        firmName = firmName + '...';
      }
      return firmName;
    }
  }

  return (
    <div className='navbar-inner'>
      <button
        className='navbar-btn circle sidemenu-toggler'
        style={{ marginRight: 'auto', zIndex: 1 }}
        onClick={() => toggleSideMenu()}
      >
        <i className='bi-list'></i>
      </button>

      <button className='navbar-btn circle' disabled>
        <i className='bi-bell'></i>
      </button>

      <span className='navbar-user-info-wrapper'>
        <i className='bi-briefcase-fill'></i>
        <span className='navbar-user-info'>
          <p className='user-email'>{email}</p>
          <p>
            {parseFirmName(firmName)} {firmNIP}
          </p>
        </span>
      </span>

      <button className='navbar-btn circle' onClick={() => handleLogout()}>
        <i className='bi-power'></i>
      </button>
    </div>
  );
};

export default Navbar;
