import { useState, useEffect } from 'react';
import { useGetGlobalState } from '../../../contexts/GlobalContext';
import useGetAgents from '../../../hooks/useGetAgents';

// Components
import AgentCard from './AgentCard';
import AddAgentModal from './AddAgentModal';
import LoadingContent from '../../loading/LoadingContent';

// CSS Styles
import './Agents.css';

const Agents = () => {
  // Local state
  const [agents, setAgents] = useState();
  const [error, setError] = useState(null);

  const { user } = useGetGlobalState();
  const getAgents = useGetAgents();

  useEffect(() => {
    getAgents({ setters: { setAgents, setError } });
    // eslint-disable-next-line
  }, []);

  // Sort agents array by username
  function compare(a, b) {
    if (a.username.toLowerCase() < b.username.toLowerCase()) {
      return -1;
    }
    if (a.username.toLowerCase() > b.username.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  return (
    <>
      {!error && (
        <div id='agenci'>
          <div className='row'>
            <div className='col col-12'>
              <h2 className='page-title'>Agenci</h2>
            </div>
          </div>
          <div className='row'>
            <div className='col col-12'>
              <h5 className='section-header'>Główne konto</h5>
            </div>
            <div className='col col-12'>{!agents && <LoadingContent />}</div>
            {Array.isArray(agents) && agents.length > 0 && (
              <AgentCard
                agent={
                  agents.filter(
                    (agent) =>
                      agent._id === user.parent || agent._id === user._id
                  )[0]
                }
                setAgents={setAgents}
              />
            )}

            <div className='col col-12'>
              <h5 className='section-header agents-list-header'>
                Lista {user.role === 'AccountOwner' && 'twoich '}agentów
                {user.role === 'AccountOwner' && (
                  <AddAgentModal setAgents={setAgents} />
                )}
              </h5>
            </div>
            <div className='col col-12'>
              {!agents && <LoadingContent />}
              {Array.isArray(agents) && agents.length < 2 && (
                <div>
                  <div className='no-results-search'>
                    Brak dodatkowych kont.
                    <p style={{ margin: '0px' }}>
                      <small>
                        Utwórz konto i udostępnij je swojemu pracownikowi.
                      </small>
                    </p>
                  </div>
                </div>
              )}
              <div className='row'>
                {Array.isArray(agents) &&
                  agents.length > 0 &&
                  agents
                    .sort(compare)
                    .map((agent) =>
                      agent.role === 'AccountOwner' ? null : (
                        <AgentCard
                          key={agent._id}
                          agent={agent}
                          setAgents={setAgents}
                        />
                      )
                    )}
              </div>
            </div>
          </div>
        </div>
      )}
      {error && <p className='alert alert-danger'>{error.msg}</p>}
    </>
  );
};

export default Agents;
