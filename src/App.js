import { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useGetGlobalState } from './contexts/GlobalContext';

// Components
import Loading from './pages/loading/Loading';
import Maintenance from './pages/maintenance/Maintenance';
import Login from './pages/login/Login';
import Navbar from './components/navbar/Navbar';
import Sidemenu from './components/sidemenu/Sidemenu';
import Dashboard from './pages/dashboard/Dashboard';
import Explore from './pages/oferty/explore/Explore';
import Ad from './pages/oferty/ad/Ad';
import Observed from './pages/oferty/observed/Observed';
import Carts from './pages/oferty/carts/Carts';
import Assigned from './pages/oferty/assigned/Assigned';
import Stats from './pages/oferty/stats/Stats';
import AddAd from './pages/oferty/addAd/AddAd';
import Mydata from './pages/account/mydata/Mydata';
import Agents from './pages/account/agents/Agents';
import Payments from './pages/account/payments/Payments';
import Logs from './pages/account/logs/Logs';
import Layout from './pages/layout/Layout';
import Informator from './pages/informator/Informator';
import Settings from './pages/settings/Settings';
import Contact from './pages/contact/Contact';
import AdminLogs from './pages/admin/logs/Logs';
import Error404 from './pages/error404/Error404';

// CSS Styles
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loaders, setLoaders] = useState({
    isLoadingGlobalState: true,
  });

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

  if (isLoading) {
    return <Loading />;
  } else if (!isLoading && globalState.underMaintenance) {
    return <Maintenance />;
  } else {
    return (
      <>
        <Switch>
          <Route path='/' exact>
            <Layout>
              <Navbar />
              <Sidemenu />
              <Dashboard />
            </Layout>
          </Route>

          <Route path='/oferty/przegladaj/:page'>
            <Layout>
              <Navbar />
              <Sidemenu />
              <Explore />
            </Layout>
          </Route>

          <Route path='/oferty/przegladaj'>
            <Redirect to='/oferty/przegladaj/1' />
          </Route>

          <Route path='/oferty/szczegoly/:id'>
            <Layout>
              <Navbar />
              <Sidemenu />
              <Ad />
            </Layout>
          </Route>

          <Route path='/oferty/obserwowane'>
            <Layout>
              <Navbar />
              <Sidemenu />
              <Observed />
            </Layout>
          </Route>

          <Route path='/oferty/przydzielone'>
            <Layout>
              <Navbar />
              <Sidemenu />
              <Assigned />
            </Layout>
          </Route>

          <Route path='/oferty/statystyki'>
            <Layout>
              <Navbar />
              <Sidemenu />
              <Stats />
            </Layout>
          </Route>

          <Route path='/oferty/koszyki'>
            <Layout>
              <Navbar />
              <Sidemenu />
              <Carts />
            </Layout>
          </Route>

          <Route path='/oferty/dodaj'>
            <Layout>
              <Navbar />
              <Sidemenu />
              <AddAd />
            </Layout>
          </Route>

          <Route path='/konto/mojedane'>
            <Layout>
              <Navbar />
              <Sidemenu />
              <Mydata />
            </Layout>
          </Route>

          <Route path='/konto/ustawienia'>
            <Layout>
              <Navbar />
              <Sidemenu />
              <Settings />
            </Layout>
          </Route>

          <Route path='/konto/agenci'>
            <Layout>
              <Navbar />
              <Sidemenu />
              <Agents />
            </Layout>
          </Route>

          <Route path='/konto/platnosci'>
            <Layout>
              <Navbar />
              <Sidemenu />
              <Payments />
            </Layout>
          </Route>

          <Route path='/konto/logi'>
            <Layout>
              <Navbar />
              <Sidemenu />
              <Logs />
            </Layout>
          </Route>

          <Route path='/contact'>
            <Layout>
              <Navbar />
              <Sidemenu />
              <Contact />
            </Layout>
          </Route>

          <Route path='/informator'>
            <Layout>
              <Navbar />
              <Sidemenu />
              <Informator />
            </Layout>
          </Route>

          <Route path='/admin/logs'>
            <AdminLogs />
          </Route>

          <Route path='/logowanie'>
            <Login />
          </Route>

          <Route path='/'>
            <Error404 />
          </Route>
        </Switch>
      </>
    );
  }
}

export default App;
