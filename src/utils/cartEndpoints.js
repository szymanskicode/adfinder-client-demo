import Cookies from 'js-cookie';

// CREATE CART
export function createCart(data = {}, setters = {}) {
  const token = Cookies.get('token');
  const { setCarts, setError, setIsWorking, setSuccess } = setters;
  const url = (process.env.API_URL || '') + '/api/carts'

  setIsWorking && setIsWorking(true);

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.cart) {
        setCarts && setCarts((prev) => [...prev, data.cart]);
        setSuccess && setSuccess(true);
      }

      if (data.validation) {
        setError && setError(data.validation);
      }

      if (data.error) {
        setError && setError(data.error);
      }

      setIsWorking && setIsWorking(false);
    })
    .catch((error) => {
      setError && setError({ error: 'Coś poszło nie tak...' });
      setIsWorking && setIsWorking(false);
    });
}

// GET CARTS
export function getCarts(setters = {}) {
  const token = Cookies.get('token');
  const { setCarts, setError, setIsLoading } = setters;
  const url = (process.env.API_URL || '') + '/api/carts'

  setIsLoading && setIsLoading(true);

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.carts) {
        setCarts && setCarts(data.carts);
      }

      if (data.error) {
        setError && setError(data.error);
      }

      setIsLoading && setIsLoading(false);
    })
    .catch((error) => {
      setError && setError({ error: 'Coś poszło nie tak...' });
      setIsLoading && setIsLoading(false);
    });
}

// DELETE CART
export function deleteCart(cartId, setters = {}) {
  const token = Cookies.get('token');
  const url = (process.env.API_URL || '') + ('/api/carts?cartId=' + cartId);
  const { setCarts, setDeletedCart, setIsWorking, setError, setSuccess } =
    setters;

  setIsWorking && setIsWorking(true);

  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.cart && !setDeletedCart) {
        setCarts &&
          setCarts((prev) => {
            const newArr = prev.filter((el) => el._id !== data.cart._id);
            return newArr;
          });
        setSuccess && setSuccess(true);
      }

      if (data.cart && setDeletedCart) {
        setDeletedCart(data.cart);
        setSuccess && setSuccess(true);
      }

      if (data.error) {
        setError && setError(data.error);
      }

      setIsWorking && setIsWorking(false);
    })
    .catch((error) => {
      setError && setError({ error: 'Coś poszło nie tak...' });

      setIsWorking && setIsWorking(false);
    });
}

// UPDATE CART
export function updateCart(data, cartId, setters) {
  const token = Cookies.get('token');
  const url = (process.env.API_URL || '') + ('/api/carts?cartId=' + cartId);
  const {
    setCarts,
    setIsWorking,
    setError,
    setUpdateTitle,
    setUpdateDescription,
    Toast,
  } = setters;

  setIsWorking && setIsWorking(true);

  fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.cart) {
        setCarts &&
          setCarts((prev) => {
            const newArr = prev.filter((el) => el._id !== data.cart._id);
            newArr.push(data.cart);
            return newArr;
          });

        setUpdateTitle && setUpdateTitle(false);
        setUpdateDescription && setUpdateDescription(false);
      }

      if (data.validation) {
        const message = data.validation[Object.keys(data.validation)[0]];
        Toast && Toast({ type: 'dark', message });
      }

      if (data.error) {
        setError && setError(data.error);
        Toast && Toast({ type: 'dark', message: data.error });
      }

      setIsWorking && setIsWorking(false);
    })
    .catch((error) => {
      setError && setError({ error: 'Coś poszło nie tak...' });

      setIsWorking && setIsWorking(false);
    });
}

// TOGGLE CART ITEM
export function toggleCartItem(adId, cartId, setters) {
  const token = Cookies.get('token');
  const url = (process.env.API_URL || '') + `/api/cart?cartId=${cartId}`;
  const data = { adId };
  const { setCarts, setCartItems, setIsWorking, setError, Toast } = setters;

  setIsWorking && setIsWorking(true);

  fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.cart) {
        setCarts &&
          setCarts((prev) => {
            const filtered = prev.filter((cart) => cart._id !== data.cart._id);
            const updated = [...filtered, data.cart];

            return updated;
          });
        setCartItems && setCartItems(data.cart.ads);
        Toast && Toast({ type: 'dark', message: 'Zapisano!' });
      }

      if (data.error) {
        setError && setError(data.error);
        Toast && Toast({ type: 'dark', message: data.error });
      }

      setIsWorking && setIsWorking(false);
    })
    .catch((error) => {
      console.log(error);
      setError && setError({ error: 'Coś poszło nie tak...' });
      Toast && Toast({ type: 'dark', message: 'Coś poszło nie tak...' });
      setIsWorking && setIsWorking(false);
    });
}
