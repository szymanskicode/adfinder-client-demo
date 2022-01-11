import { useState } from 'react';

// Components
import AddAgentForm from './AddAgentForm';

const AddAgentModal = (props) => {
  const { agent, setAgents } = props;

  // Local state
  const [clearFormFlag, setClearFormFlag] = useState(false);

  return (
    <>
      <button
        className='btn btn-primary btn-sm'
        style={{ margin: '-10px 0px -10px auto' }}
        data-bs-toggle='modal'
        data-bs-target='#addAgentModal'
      >
        <i className='bi-person-plus-fill'></i> Dodaj agenta
      </button>

      {/* Modal */}
      <div
        className='modal fade'
        id='addAgentModal'
        tabIndex={-1}
        aria-labelledby='addAgentModalLabel'
        aria-hidden='true'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        style={{ textTransform: 'none' }}
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addAgentModalLabel'>
                Dodaj agenta
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={() => setClearFormFlag((prev) => !prev)}
              />
            </div>
            <div className='modal-body'>
              <AddAgentForm
                agent={agent}
                setAgents={setAgents}
                clearFormFlag={clearFormFlag}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAgentModal;
