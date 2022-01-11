import { useGetGlobalState } from '../../../contexts/GlobalContext';

// Components
import EditAgentModal from './EditAgentModal';
import DeleteAgentModal from './DeleteAgentModal';

// CSS Styles
import './Agents.css';

const AgentCard = (props) => {
  const { agent, setAgents } = props;
  const { user } = useGetGlobalState();

  return (
    <div className='col col-12 col-md-6 col-lg-4'>
      <div className='card agent-card flat' style={{ marginBottom: '30px' }}>
        {user.role === 'AccountOwner' && user._id === agent.parent && (
          <>
            <div className='agent-card-actions'>
              <span
                className='agent-card-action'
                data-bs-toggle='modal'
                data-bs-target={'#editAgentModal' + agent._id}
              >
                <i className='bi-pencil-square'></i>
              </span>
              <span
                className='agent-card-action danger'
                data-bs-toggle='modal'
                data-bs-target={'#deleteAgentModal' + agent._id}
              >
                <i className='bi-trash'></i>
              </span>
            </div>
            <EditAgentModal agent={agent} setAgents={setAgents} />
            <DeleteAgentModal agent={agent} setAgents={setAgents} />
          </>
        )}

        {agent && agent.username ? (
          <h2 className='agent-username'>
            <i className='bi-person-fill'></i> {agent.username}
          </h2>
        ) : (
          <h2 className='agent-username text-muted'>
            <i className='bi-person-fill'></i> ???
          </h2>
        )}
        {agent && agent.email && (
          <p className='agent-email'>
            <i className='bi-envelope'></i> {agent.email}
          </p>
        )}
        {agent && agent.phone ? (
          <p className='agent-phone'>
            <i className='bi-telephone'></i> {agent.phone}
          </p>
        ) : (
          <p className='agent-phone text-muted'>
            <i className='bi-telephone'></i> ???
          </p>
        )}
      </div>
    </div>
  );
};

export default AgentCard;
