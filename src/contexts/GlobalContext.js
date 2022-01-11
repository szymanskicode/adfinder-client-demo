import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
  const [state, setState] = useState({
    isLoading: true,
    underMaintenance: false,
    user: null,
  });

  const [loaders, setLoaders] = useState({
    loadingUser: true,
  });

  const url = 'https://adfinder-server-demo.herokuapp.com/api/users/isauth'

  // LOADERS
  useEffect(() => {
    if (!loaders.loadingUser) {
      // Ending state laoding...
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  }, [loaders.loadingUser]);

  // SETTING USER
  useEffect(() => {
    async function fetchUser() {
      return new Promise((resolve) => {
        const token = Cookies.get('token');

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: null,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data && data.user._id) {
              setState((prevState) => ({
                ...prevState,
                user: data.user,
              }));
              resolve();
            } else {
              setState((prevState) => ({
                ...prevState,
                user: null,
              }));
              resolve();
            }
          })
          .catch((err) => {
            setState((prevState) => ({
              ...prevState,
              user: null,
            }));
            resolve();
          });
      });
    }

    async function setUser() {
      return new Promise((resolve) => {
        setLoaders((prevState) => ({
          ...prevState,
          loadingUser: false,
        }));
        resolve();
      });
    }

    async function initializeUser() {
      await fetchUser();
      await setUser();
    }

    initializeUser();
  }, []);

  return (
    <GlobalContext.Provider value={{ state, setState }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

// CUSTOM HOOK - Get Global State
export const useGetGlobalState = () => {
  const { state } = useContext(GlobalContext);
  return state;
};

// CUSTOM HOOK - Set Global User
export const useSetUser = () => {
  const { setState } = useContext(GlobalContext);
  const setUser = (user) => {
    setState((prevState) => ({
      ...prevState,
      user,
    }));
  };
  return setUser;
};

// // CUSTOM HOOK - Set Global User
// export const useSetUser = (user) => {
//   const { setState } = useContext(GlobalContext);
//   return () => {
//     setState((prevState) => ({
//       ...prevState,
//       user,
//     }));
//   };
// };
