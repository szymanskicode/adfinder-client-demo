const BadgesModal = (props) => {
  const { handleToggleBadge, badges } = props;

  return (
    <div className='ad-badges'>
      <span
        className={`ad-badge badge-watched ${badges.isWatched && 'active'}`}
        onClick={() => handleToggleBadge('watched')}
      >
        <i className='bi-eye'></i> Obejrzane
      </span>
      <span
        className={`ad-badge badge-favorite ${badges.isFavorite && 'active'}`}
        onClick={() => handleToggleBadge('favorite')}
      >
        <i className='bi-star'></i> Obserwuj
      </span>
      <span
        className={`ad-badge badge-phone ${badges.isPhone && 'active'}`}
        onClick={() => handleToggleBadge('phone')}
      >
        <i className='bi-telephone-outbound'></i> Telefon
      </span>
      <span
        className={`ad-badge badge-phoned ${badges.isPhoned && 'active'}`}
        onClick={() => handleToggleBadge('phoned')}
      >
        <i className='bi-telephone-inbound'></i> Obdzwonione
      </span>
      <span
        className={`ad-badge badge-inbase ${badges.isInbase && 'active'}`}
        onClick={() => handleToggleBadge('inbase')}
      >
        <i className='bi-folder'></i> W bazie
      </span>
      <span
        className={`ad-badge badge-meeting ${badges.isMeeting && 'active'}`}
        onClick={() => handleToggleBadge('meeting')}
      >
        <i className='bi-calendar-event'></i> Spotkanie
      </span>
      <span
        className={`ad-badge badge-contract ${badges.isContract && 'active'}`}
        onClick={() => handleToggleBadge('contract')}
      >
        <i className='bi-file-text'></i> Umowa
      </span>
      <span
        className={`ad-badge badge-closed ${badges.isClosed && 'active'}`}
        onClick={() => handleToggleBadge('closed')}
      >
        <i className='bi-door-closed'></i> Zamknięte
      </span>
      <span
        className={`ad-badge badge-agent ${badges.isAgent && 'active'}`}
        onClick={() => handleToggleBadge('agent')}
      >
        <i className='bi-person'></i> Pośrednik
      </span>
      <span
        className={`ad-badge badge-noagent ${badges.isNoagent && 'active'}`}
        onClick={() => handleToggleBadge('noagent')}
      >
        <i className='bi-person-x'></i> Bez pośredników
      </span>
      <span
        className={`ad-badge badge-outdated ${badges.isOutdated && 'active'}`}
        onClick={() => handleToggleBadge('outdated')}
      >
        <i className='bi-trash'></i> Nieaktualne
      </span>
    </div>
  );
};

export default BadgesModal;
