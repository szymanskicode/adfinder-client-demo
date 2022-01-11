import ModalBody from './ModalBody';

const Modal = (props) => {
  const { ad } = props.data;

  return (
    <>
      {/* Modal */}
      <div
        className='modal modal-detiles fade'
        id={'id' + ad._id}
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex={-1}
        aria-labelledby={'id' + ad._id + 'Label'}
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5
                className='modal-title ad-detiles-header'
                id={'id' + ad._id + 'Label'}
              >
                Szczegóły ogłoszenia
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              />
            </div>
            <ModalBody data={{ ad }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
