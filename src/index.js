import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// Context
import GlobalContextProvider from './contexts/GlobalContext';
import NotificationProvider from './contexts/NotificationContext';

ReactDOM.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <NotificationProvider>
        <Router>
          <App />
        </Router>
      </NotificationProvider>
    </GlobalContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
