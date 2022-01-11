import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useGetGlobalState } from '../../contexts/GlobalContext';

// Components
import Loading from '../loading/Loading';
import ErrorContent from '../errorContent/ErrorContent';

// CSS Styles
import './Layout.css';

const Layout = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loaders, setLoaders] = useState({
    isLoadingGlobalState: true,
  });

  const history = useHistory();
  const globalState = useGetGlobalState();

  // LOADERS
  useEffect(() => {
    if (!loaders.isLoadingGlobalState) {
      setIsLoading(false);
    }
  }, [loaders.isLoadingGlobalState]);

  // LOADING GLOBAL STATE
  useEffect(() => {
    if (globalState && !globalState.isLoading) {
      setLoaders((prevState) => ({
        ...prevState,
        isLoadingGlobalState: false,
      }));
    }
    // eslint-disable-next-line
  }, [globalState.isLoading]);

  // Redirect if user is not logged
  useEffect(() => {
    if (!globalState.user) {
      history.push('/logowanie');
    }
    // eslint-disable-next-line
  });

  if (isLoading) {
    return <Loading />;
  } else if (!isLoading && globalState.user) {
    return (
      <>
        <div className='color-bar'></div>
        <div id='page-wrapper'>
          <nav id='navbar'>
            {/* Place for navbar */}
            {props.children[0]}
          </nav>
          <div className='content-wrapper'>
            {/* Place for page content */}
            <section>{props.children[2]}</section>
            <aside>Right side content here.</aside>
          </div>
        </div>
        {/* Place for sidemenu */}
        {props.children[1]}
      </>
    );
  } else {
    return <ErrorContent />;
  }
};

export default Layout;
