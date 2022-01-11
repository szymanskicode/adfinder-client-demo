import React, { useState, useEffect } from 'react';
import { getCarts, toggleCartItem } from '../../../utils/cartEndpoints';
import { useNotification } from '../../../contexts/NotificationContext';

const AddToBasketWidget = (props) => {
  const { ad } = props.data;
  const Toast = useNotification();

  const [isLoading, setIsLoading] = useState(true);
  const [isWorking, setIsWorking] = useState(false);
  const [error, setError] = useState(null);
  const [carts, setCarts] = useState([]);
  const [selectValue, setSelectValue] = useState('all');
  const [options, setOptions] = useState({});

  // Get carts data
  useEffect(() => {
    const setters = { setCarts, setError, setIsLoading };
    getCarts(setters);
  }, []);

  // Create options for select field
  useEffect(() => {
    function compare(a, b) {
      if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
      if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
      return 0;
    }
    const select = {};
    carts.sort(compare).forEach((cart) => {
      select[cart.title] = cart._id;
    });
    setOptions(select);
    // eslint-disable-next-line
  }, [carts]);

  // Add or remove ad from selected cart
  const handleSubmit = (e) => {
    e.preventDefault();
    const setters = {
      setIsWorking,
      setCarts,
      setError,
      Toast,
    };

    if (selectValue !== 'all' && !isWorking) {
      toggleCartItem(ad._id, selectValue, setters);
      setSelectValue('all');
    }
  };

  return (
    <div className='modal-widget'>
      <div className='modal-widget-header'>Dodaj ofertę do koszyka</div>
      <div className='modal-widget-body'>
        {/* Add to busket form  */}
        {!isLoading && !error && (
          <form
            onSubmit={(e) => handleSubmit(e)}
            className='row g-3 align-items-center'
          >
            <div className='col-12'>
              <label
                className='visually-hidden'
              // htmlFor='inlineFormInputGroupUsername'
              >
                Username
              </label>
              <div className='input-group'>
                <div className='input-group-text widget-group-icon'>
                  <i className='bi-basket3-fill'></i>
                </div>
                <select
                  className='form-select'
                  value={selectValue}
                  onChange={(e) => setSelectValue(e.target.value)}
                >
                  <option value='all'>Wybierz...</option>
                  {Object.keys(options).map((cart) => {
                    const checkCart = carts.filter(
                      (item) => item._id === options[cart]
                    );

                    let exists = false;
                    if (checkCart[0].ads.includes(ad._id)) {
                      exists = true;
                    }

                    return (
                      <option
                        key={options[cart]}
                        value={options[cart]}
                        disabled={exists}
                      >
                        {cart}
                      </option>
                    );
                  })}
                </select>
                <button type='submit' className='btn btn-primary'>
                  OK
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddToBasketWidget;
