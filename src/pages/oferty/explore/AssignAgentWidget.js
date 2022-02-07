import { useState, useEffect } from "react";
import { useGetGlobalState } from "../../../contexts/GlobalContext";
import useGetAgents from "../../../hooks/useGetAgents";

const AssignAgentWidget = () => {
  const { user } = useGetGlobalState();
  const getAgents = useGetAgents();

  // Local State
  const [agents, setAgents] = useState([]);
  const [error, setError] = useState(null);
  const [selectValue, setSelectValue] = useState("select");

  // Get list of agents
  useEffect(() => {
    const setters = {
      setAgents,
      setError,
    };
    getAgents({ setters });
    // eslint-disable-next-line
  }, []);

  const handleAssignAd = (e) => {
    e.preventDefault();
    alert("Funkcjonalość niedostępna w wersji demonstracyjnej.");
  };

  return (
    <>
      {user.role === "AccountOwner" && !error ? (
        <div className="modal-widget">
          <div className="modal-widget-header">Przydziel ofertę agentowi</div>
          <div className="modal-widget-body">
            {/* Add to busket form  */}
            <form
              onSubmit={(e) => handleAssignAd(e)}
              className="row g-3 align-items-center"
            >
              <div className="col-12">
                <label
                  className="visually-hidden"
                  // htmlFor='inlineFormInputGroupUsername'
                >
                  Username
                </label>
                <div className="input-group">
                  <div className="input-group-text widget-group-icon">
                    <i className="bi-file-person-fill"></i>
                  </div>
                  <select
                    className="form-select"
                    // id='inlineFormSelectPref'
                    value={selectValue}
                    onChange={(e) => setSelectValue(e.target.value)}
                  >
                    {agents.map((agent) => {
                      if (agent.role === "AccountOwner") {
                        return (
                          <option key={agent._id} value="select">
                            Wybierz...
                          </option>
                        );
                      }
                      return (
                        <option key={agent._id} value={agent._id}>
                          {`${agent.username} (${agent.email})`}
                        </option>
                      );
                    })}
                  </select>
                  <button type="submit" className="btn btn-primary">
                    OK
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AssignAgentWidget;
