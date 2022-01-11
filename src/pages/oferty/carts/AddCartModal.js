import { useState } from 'react';
import AddCartForm from './AddCartForm';

const AddCArtModal = (props) => {
  const { setCarts, setSelectValue } = props;

  // Local state
  const [closeFlag, setCloseFlag] = useState(false);

  return (
    <div
      className='modal fade'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      id='ModalAddCart'
      tabIndex={-1}
      aria-labelledby='ModalLabelAddCart'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='ModalLabelAddCart'>
              Nowy koszyk
            </h5>
            <button
              onClick={() => setCloseFlag((prev) => !prev)}
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            />
          </div>
          <AddCartForm
            setCarts={setCarts}
            setSelectValue={setSelectValue}
            closeFlag={closeFlag}
          />
        </div>
      </div>
    </div>
  );
};

export default AddCArtModal;
