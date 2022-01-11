import { useState } from 'react';

// Components
import EditAgentForm from './EditAgentForm';

const EditAgentModal = (props) => {
  const { agent, setAgents } = props;

  // Local state
  const [clearFormFlag, setClearFormFlag] = useState(false);

  return (
    <div
      className='modal fade'
      id={'editAgentModal' + agent._id}
      tabIndex={-1}
      aria-labelledby={'editAgentModalLabel' + agent._id}
      aria-hidden='true'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      style={{ textTransform: 'none' }}
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id={'editAgentModalLabel' + agent._id}>
              Edytuj dane
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
            <EditAgentForm
              agent={agent}
              setAgents={setAgents}
              clearFormFlag={clearFormFlag}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAgentModal;
