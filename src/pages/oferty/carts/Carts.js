import { useState, useEffect } from 'react';
import { getCarts } from '../../../utils/cartEndpoints';
import Cart from './Cart';
import LoadingContent from '../../loading/LoadingContent';
import AddCartModal from './AddCartModal';

// CSS Styles
import './Carts.css';

const Carts = () => {
  // Local state
  const [isLoading, setIsLoading] = useState(true);
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

  // Show only one selected cart
  useEffect(() => {
    [].forEach.call(document.getElementsByClassName('cart-wrapper'), (el) => {
      if (el.getAttribute('my-data') !== selectValue) el.style.display = 'none';
      if (el.getAttribute('my-data') === selectValue)
        el.style.display = 'block';
      if (selectValue === 'all') el.style.display = 'block';
    });
  }, [selectValue]);

  return (
    <div id='carts'>
      <div className='row'>
        <div className='col col-12'>
          <h2 className='page-title header-button'>
            <span>Koszyki</span>
            {carts?.length > 0 && (
              <button
                className='btn btn-primary btn-sm'
                data-bs-toggle='modal'
                data-bs-target='#ModalAddCart'
                style={{ marginLeft: 'auto' }}
              >
                Nowy koszyk
              </button>
            )}
          </h2>
        </div>
      </div>
      <AddCartModal setCarts={setCarts} setSelectValue={setSelectValue} />
      {isLoading && <LoadingContent />}
      {!isLoading && carts?.length === 0 && (
        <div className='alert alert-secondary'>
          <h6 className='text-center'>Nie masz jeszcze żadnych koszyków.</h6>
          <p className='text-center'>
            <small>
              Koszyki pozwalają w łatwy sposób organizować i przechowywać
              <br />
              ogłoszenia, którymi mogą być zainteresowani twoi klienci.
            </small>
          </p>
          <div className='text-center'>
            <button
              className='btn btn-primary btn-sm'
              data-bs-toggle='modal'
              data-bs-target='#ModalAddCart'
            >
              Utwórz swój pierwszy koszyk
            </button>
          </div>
        </div>
      )}
      {!isLoading && (
        <>
          {carts?.length > 0 && (
            <div className='row'>
              <div className='col col-12'>
                <select
                  className='form-select mb-3'
                  value={selectValue}
                  onChange={(e) => setSelectValue(e.target.value)}
                >
                  <option value='all'>Wszystkie</option>
                  {Object.keys(options).map((cart) => (
                    <option key={options[cart]} value={options[cart]}>
                      {cart}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          <div className='row'>
            <div className='col col-12'>
              {error && <p>{error}</p>}
              {carts &&
                carts.map((cart) => (
                  <Cart
                    key={cart._id}
                    cart={cart}
                    setCarts={setCarts}
                    setSelectValue={setSelectValue}
                  />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Carts;
