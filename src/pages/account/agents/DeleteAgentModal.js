import { useState } from 'react';
import useDeleteAgent from '../../../hooks/useDeleteAgent';

const EditAgentModal = (props) => {
  const { agent, setAgents } = props;

  // Local state
  const [isWorking, setIsWorking] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [deletedAgent, setDeletedAgent] = useState(null);

  const deleteAgent = useDeleteAgent();

  const handleDelete = () => {
    const data = { agentId: agent._id };

    const setters = { setIsWorking, setError, setSuccess, setDeletedAgent };

    deleteAgent({ data, setters });
  };

  const handleClear = () => {
    if (success) {
      setTimeout(() => {
        setAgents((prev) => {
          const updatedList = prev.filter(
            (user) => user._id !== deletedAgent._id
          );
          return updatedList;
        });
      }, 500);
    } else {
      setError({});
    }
  };

  return (
    <div
      className='modal fade'
      id={'deleteAgentModal' + agent._id}
      tabIndex={-1}
      aria-labelledby={'deleteAgentModalLabel' + agent._id}
      aria-hidden='true'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      style={{ textTransform: 'none' }}
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5
              className='modal-title'
              id={'deleteAgentModalLabel' + agent._id}
            >
              Usuń konto
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
              onClick={() => handleClear()}
            />
          </div>
          {!success && (
            <div className='modal-body'>
              <h5 className='modal-title text-center mb-3'>
                <big>Czy na pewno usunąć agenta?</big>
              </h5>
              <div className='alert alert-secondary'>
                <p className='text-center mb-1'>
                  <big>{agent.username}</big>
                </p>
                <p className='text-center mb-0'>{agent.email}</p>
              </div>
              {error && error.error && (
                <p className='text-danger text-center'>{error.error}</p>
              )}
              <div className='text-center'>
                <button
                  type='button'
                  className='btn btn-primary btn-sm'
                  data-bs-dismiss='modal'
                  style={{ margin: '0 5px' }}
                >
                  Anuluj
                </button>
                <button
                  disabled={isWorking}
                  type='button'
                  className='btn btn-outline-danger btn-sm'
                  style={{ margin: '0 5px' }}
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  {isWorking ? 'Usuwanie...' : 'Usuń'}
                </button>
              </div>
            </div>
          )}
          {success && (
            <div className='modal-body'>
              <div className='alert alert-success'>
                <strong>Konto usunięte!</strong>
              </div>
              <div className='text-center'>
                <button
                  type='button'
                  className='btn btn-primary btn-sm'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                  style={{ margin: '0 5px 5px 0' }}
                  onClick={() => handleClear()}
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditAgentModal;
