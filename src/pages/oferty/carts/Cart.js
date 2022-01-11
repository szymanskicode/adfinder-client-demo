import { useState } from 'react';
import { deleteCart, updateCart } from '../../../utils/cartEndpoints';
import CartItem from './CartItem';
import { useNotification } from '../../../contexts/NotificationContext';

const Cart = (props) => {
  const { cart, setCarts, setSelectValue } = props;
  const Toast = useNotification();

  // Local state
  const [isWorking, setIsWorking] = useState(false);
  const [deletedCart, setDeletedCart] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(false);
  const [updateDescription, setUpdateDescription] = useState(false);
  const [title, setTitle] = useState(cart.title);
  const [description, setDescription] = useState(cart.description);
  const [cartItems, setCartItems] = useState(cart.ads);

  // Delete element
  const handleDelete = () => {
    const cartId = cart._id;
    const setters = {
      setCarts,
      setIsWorking,
      setError,
      setSuccess,
      setDeletedCart,
    };

    deleteCart(cartId, setters);
  };

  // Remove element from DOM after deleting it.
  const handleRemove = () => {
    if (!success) {
      return;
    }

    setSelectValue('all');

    setTimeout(() => {
      setCarts((prev) => {
        const newArr = prev.filter((el) => el._id !== deletedCart._id);
        return newArr;
      });
      setSuccess(false);
      setError(null);
      setDeletedCart({});
    }, 500);
  };

  // Cancel update cart name and description
  const handleCancelEdit = () => {
    setUpdateTitle(false);
    setUpdateDescription(false);
    setTitle(cart.title);
    setDescription(cart.description);
  };

  // Upodate cart title or description
  const handleUpdate = (item) => {
    const data = {};

    if (item === 'title') {
      data.title = title;
    }

    if (item === 'description') {
      data.description = description;
    }

    const cartId = cart._id;

    const setters = {
      setCarts,
      setIsWorking,
      setError,
      setUpdateDescription,
      setUpdateTitle,
      Toast,
    };

    updateCart(data, cartId, setters);
  };

  return (
    <div className='cart-wrapper card flat' my-data={cart._id}>
      <div className='cart-inner'>
        <div className='cart-image-wrapper'>
          <div className='cart-image'>
            <i className='bi-basket3'></i>
            <button
              className='btn btn-outline-danger btn-sm'
              data-bs-toggle='modal'
              data-bs-target={`#Modal${cart._id}`}
            >
              Usuń
            </button>
          </div>
        </div>
        {/* Modal */}
        <div
          className='modal fade'
          data-bs-backdrop='static'
          data-bs-keyboard='false'
          id={`Modal${cart._id}`}
          tabIndex={-1}
          aria-labelledby={`ModalLabel${cart._id}`}
          aria-hidden='true'
        >
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id={`ModalLabel${cart._id}`}>
                  Usuń koszyk
                </h5>
                <button
                  onClick={() => handleRemove()}
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                />
              </div>
              {!success && (
                <div className='modal-body'>
                  <h6 className='text-center mb-1'>CZY NA PEWNO USUNĄĆ?</h6>
                  <p className='text-center mb-3'>{cart.title}</p>

                  {error && <p className='text-center text-danger'>{error}</p>}
                  <div className='text-center'>
                    <button
                      type='button'
                      className='btn btn-primary btn-sm'
                      data-bs-dismiss='modal'
                      style={{ marginRight: '15px' }}
                    >
                      Anuluj
                    </button>
                    <button
                      disabled={isWorking}
                      onClick={() => handleDelete()}
                      type='button'
                      className='btn btn-outline-danger btn-sm'
                    >
                      {isWorking ? 'Usuwanie...' : 'Usuń'}
                    </button>
                  </div>
                </div>
              )}
              {success && (
                <div className='modal-body'>
                  <div className='alert alert-success mb-3'>
                    <strong>Koszyk został usunięty.</strong>
                  </div>
                  <div className='text-center'>
                    <button
                      onClick={() => handleRemove()}
                      type='button'
                      className='btn btn-primary btn-sm'
                      data-bs-dismiss='modal'
                    >
                      OK
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='cart'>
          <div className='cart-header'>
            {cart?.title && !updateTitle && (
              <span className='cart-title'>
                {cart.title}{' '}
                <i
                  onClick={() => {
                    setUpdateTitle(true);
                    setUpdateDescription(false);
                    setDescription(cart.description);
                  }}
                  className='bi-pencil-square'
                ></i>
              </span>
            )}
            {cart?.title && updateTitle && (
              <div
                className='input-group input-group-sm'
                style={{
                  padding: '0 10px',
                  maxWidth: '500px',
                }}
              >
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type='text'
                  className='form-control'
                  style={{
                    borderRadius: '0px',
                  }}
                />
                <span
                  onClick={() => handleCancelEdit()}
                  className='input-group-text input-edit-button cancel'
                  style={{
                    border: 'none',
                  }}
                >
                  <i className='bi-x'></i>
                </span>
                <span
                  onClick={() => handleUpdate('title')}
                  className='input-group-text input-edit-button confirm'
                  style={{
                    border: 'none',
                  }}
                >
                  <i className='bi-check2'></i>
                </span>
              </div>
            )}

            <span className='cart-description'>
              {cart?.description && !updateDescription && (
                <>{cart.description} </>
              )}
              {!updateDescription && (
                <i
                  onClick={() => {
                    setUpdateDescription(true);
                    setUpdateTitle(false);
                    setTitle(cart.title);
                  }}
                  className='bi-pencil-square'
                ></i>
              )}
            </span>

            {updateDescription && (
              <div
                className='input-group input-group-sm'
                style={{
                  padding: '0 10px',
                  maxWidth: '500px',
                }}
              >
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type='text'
                  className='form-control'
                  aria-label='Amount (to the nearest dollar)'
                  style={{
                    borderRadius: '0px',
                  }}
                />
                <span
                  onClick={() => handleCancelEdit()}
                  className='input-group-text input-edit-button cancel'
                  style={{
                    border: 'none',
                  }}
                >
                  <i className='bi-x'></i>
                </span>
                <span
                  onClick={() => handleUpdate('description')}
                  className='input-group-text input-edit-button confirm'
                  style={{
                    border: 'none',
                  }}
                >
                  <i className='bi-check2'></i>
                </span>
              </div>
            )}
          </div>
          <div className='cart-content'>
            {cartItems.length === 0 && (
              <p className='text-muted'>
                <small>Koszyk jest obecnie pusty.</small>
              </p>
            )}
            {cartItems.length > 0 &&
              cartItems.map((item) => {
                return (
                  <CartItem
                    key={item}
                    ad={item}
                    cartId={cart._id}
                    setCartItems={setCartItems}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
