import { useState, useEffect } from 'react';
import { createCart } from '../../../utils/cartEndpoints';

const AddCartForm = (props) => {
  const { setCarts, setSelectValue, closeFlag } = props;

  // Local state
  const [isWorking, setIsWorking] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Add cart
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
    };

    const setters = {
      setIsWorking,
      setCarts,
      setError,
      setSuccess,
    };

    createCart(data, setters);
  };

  // Clean up after adding cart
  const handleClose = () => {
    setTimeout(() => {
      setTitle('');
      setDescription('');
      setError(null);
      setSuccess(false);
      setSelectValue('all');
    }, 500);
  };

  // Run handleClose when modal is closed by header
  useEffect(() => {
    if (success) {
      handleClose();
    }
    // eslint-disable-next-line
  }, [closeFlag]);

  return (
    <>
      {!success && (
        <div className='modal-body'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className='mb-3'>
              <label htmlFor='cartTitle' className='form-label'>
                Nazwa *
              </label>
              <input
                type='text'
                className='form-control'
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                id='cartTitle'
              />
              <div
                id='titleHelp'
                className='form-text'
                style={{ fontWeight: 'normal' }}
              >
                {error && error.title && (
                  <span className='text-danger'>{error.title}</span>
                )}
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor='cartDescription' className='form-label'>
                Opis
              </label>
              <textarea
                className='form-control'
                id='cartDescription'
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div
                id='descriptionHelp'
                className='form-text'
                style={{ fontWeight: 'normal' }}
              >
                {error && error.description && (
                  <span className='text-danger'>{error.description}</span>
                )}
              </div>
            </div>
            {error && error.error && (
              <p className='text-danger'>{error.error}</p>
            )}
            <div className='text-center'>
              <button
                type='button'
                className='btn btn-secondary btn-sm'
                data-bs-dismiss='modal'
                style={{ marginRight: '15px' }}
              >
                Anuluj
              </button>
              <button
                disabled={isWorking}
                type='submit'
                className='btn btn-primary btn-sm'
              >
                {isWorking ? 'Tworzenie...' : 'Utwórz'}
              </button>
            </div>
          </form>
        </div>
      )}

      {success && (
        <div className='modal-body'>
          <div className='alert alert-success mb-3'>
            <strong>Koszyk został utworzony.</strong>
          </div>
          <div className='text-center'>
            <button
              type='button'
              className='btn btn-primary btn-sm'
              data-bs-dismiss='modal'
              onClick={() => handleClose()}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCartForm;
