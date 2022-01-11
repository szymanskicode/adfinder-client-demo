import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useGetAds from '../../../hooks/useGetAds';
import { toggleCartItem } from '../../../utils/cartEndpoints';
import { useNotification } from '../../../contexts/NotificationContext';

const CartItem = (props) => {
  const { ad: adId, cartId, setCartItems } = props;
  const Toast = useNotification();

  const [isWorking, setIsWorking] = useState(false);
  const [ads, setAds] = useState([]);

  const getAds = useGetAds();

  useEffect(() => {
    const setters = {};
    const criteria = {
      singlead: true,
      adId,
    };
    getAds(setAds, criteria, setters);
    // eslint-disable-next-line
  }, []);

  const handleRemoveItemFormCart = () => {
    const setters = { setIsWorking, setCartItems, Toast };
    if (!isWorking) {
      toggleCartItem(adId, cartId, setters);
    }
  };

  return (
    <div className='cart-item flat'>
      {ads?.error ? (
        <p>???</p>
      ) : (
        <>
          <div className='cart-item-data'>
            <div className='row'>
              <div className='col col-12'>
                <strong>
                  <small>{ads[0]?.title && ads[0].title}</small>
                </strong>
                <br />
                {ads[0]?.city && ads[0].city}
                {ads[0]?.state && (
                  <>
                    <i className='bi-dot'></i>
                    {ads[0].state}
                  </>
                )}
                {ads[0]?.price && (
                  <>
                    <i className='bi-dot'></i>
                    {ads[0].price}zł
                  </>
                )}
              </div>
            </div>
          </div>
          <div className='cart-item-action'>
            <Link to={`/oferty/szczegoly/${adId}`}>
              <button className='btn btn-outline-primary btn-sm'>
                <i className='bi-search'></i>
              </button>
            </Link>
            <button
              onClick={() => handleRemoveItemFormCart()}
              className='btn btn-outline-danger btn-sm'
            >
              <i className='bi-x'></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
