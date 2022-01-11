import { useState, useEffect } from 'react';
import useGetAds from '../../../hooks/useGetAds';
import AssignedItem from './AssignedItem';

// CSS Styles
import '../Offers.css';

const Assigned = () => {
  const getAds = useGetAds();

  // Local state
  const [activeTab, setActiveTab] = useState('active');
  const [assignedAds, setAssignedAds] = useState([]);

  // Get assigned ads
  useEffect(() => {
    const criteria = { assignedAds: true };
    getAds(setAssignedAds, criteria);
    // eslint-disable-next-line
  }, []);

  return (
    <div id='assigned'>
      <div className='row'>
        <div className='col col-12'>
          <h2 className='page-title header-button'>
            <span>Przydzielone oferty</span>
          </h2>
        </div>
      </div>

      <nav className='tab-nav-wrapper'>
        <ul>
          <li
            className={`${activeTab === 'active' && 'active'}`}
            onClick={() => setActiveTab('active')}
          >
            Aktywne
          </li>
          <li
            className={`${activeTab === 'finished' && 'active'}`}
            onClick={() => setActiveTab('finished')}
          >
            Zakończone
          </li>
        </ul>
      </nav>

      {Array.isArray(assignedAds) &&
        assignedAds.length > 0 &&
        assignedAds.map((item) => <AssignedItem key={item._id} ad={item} />)}
    </div>
  );
};

export default Assigned;
