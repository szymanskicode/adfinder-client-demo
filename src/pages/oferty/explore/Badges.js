import { useState, useEffect } from 'react';
import { useGetGlobalState } from '../../../contexts/GlobalContext';
import useUpdateBadge from '../../../hooks/useUpdateBadge';

// Components
import BadgesTable from './BadgesTable';
import BadgesModal from './BadgesModal';

const Badges = (props) => {
  const { ad, view } = props;

  // State
  const [isWatched, setIsWatched] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isPhoned, setIsPhoned] = useState(false);
  const [isInbase, setIsInbase] = useState(false);
  const [isMeeting, setIsMeeting] = useState(false);
  const [isContract, setIsContract] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isAgent, setIsAgent] = useState(false);
  const [isNoagent, setIsNoagent] = useState(false);
  const [isOutdated, setIsOutdated] = useState(false);

  const { user } = useGetGlobalState();
  const badges = user.badges;

  const toggleBadge = useUpdateBadge();

  // Set active badges
  useEffect(() => {
    if (
      badges.includes('watched' + ad._id) ||
      badges.filter((str) => str.includes(ad._id.toString())).length > 0
    ) {
      setIsWatched(true);
    } else {
      setIsWatched(false);
    }
    if (badges.includes('favorite' + ad._id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
    if (badges.includes('phone' + ad._id)) {
      setIsPhone(true);
    } else {
      setIsPhone(false);
    }
    if (badges.includes('phoned' + ad._id)) {
      setIsPhoned(true);
    } else {
      setIsPhoned(false);
    }
    if (badges.includes('inbase' + ad._id)) {
      setIsInbase(true);
    } else {
      setIsInbase(false);
    }
    if (badges.includes('meeting' + ad._id)) {
      setIsMeeting(true);
    } else {
      setIsMeeting(false);
    }
    if (badges.includes('contract' + ad._id)) {
      setIsContract(true);
    } else {
      setIsContract(false);
    }
    if (badges.includes('closed' + ad._id)) {
      setIsClosed(true);
    } else {
      setIsClosed(false);
    }
    if (badges.includes('agent' + ad._id)) {
      setIsAgent(true);
    } else {
      setIsAgent(false);
    }
    if (badges.includes('noagent' + ad._id)) {
      setIsNoagent(true);
    } else {
      setIsNoagent(false);
    }
    if (badges.includes('outdated' + ad._id)) {
      setIsOutdated(true);
    } else {
      setIsOutdated(false);
    }
    // eslint-disable-next-line
  }, [badges.length]);

  // Quick toggle badge in local state
  const quickToggle = (bn) => {
    if (bn === 'watched' && !isWatched) {
      setIsWatched(true);
    } else if (
      bn === 'watched' &&
      isWatched &&
      badges.filter((str) => str.includes(ad._id.toString())).length <= 1
    ) {
      setIsWatched(false);
    } else {
      setIsWatched(true);
    }
    bn === 'favorite' && setIsFavorite((prev) => !prev);
    bn === 'phone' && setIsPhone((prev) => !prev);
    bn === 'phoned' && setIsPhoned((prev) => !prev);
    bn === 'inbase' && setIsInbase((prev) => !prev);
    bn === 'meeting' && setIsMeeting((prev) => !prev);
    bn === 'contract' && setIsContract((prev) => !prev);
    bn === 'closed' && setIsClosed((prev) => !prev);
    bn === 'agent' && setIsAgent((prev) => !prev);
    bn === 'noagent' && setIsNoagent((prev) => !prev);
    bn === 'outdated' && setIsOutdated((prev) => !prev);
  };

  const handleToggleBadge = (badgeName, adId = ad._id) => {
    toggleBadge(badgeName, adId);
    quickToggle(badgeName);
  };

  const badgesList = {
    isWatched,
    isFavorite,
    isPhone,
    isPhoned,
    isInbase,
    isMeeting,
    isContract,
    isClosed,
    isAgent,
    isNoagent,
    isOutdated,
  };

  return (
    <>
      {view === 'table' && (
        <BadgesTable
          handleToggleBadge={handleToggleBadge}
          badges={badgesList}
        />
      )}
      {view === 'modal' && (
        <BadgesModal
          handleToggleBadge={handleToggleBadge}
          badges={badgesList}
        />
      )}
    </>
  );
};

export default Badges;
