import Tippy from "@tippy.js/react"
import "tippy.js/dist/tippy.css"

const BadgesTable = (props) => {
  const { handleToggleBadge, badges } = props;
  return (
    <>
      <Tippy delay={250} placement={"top"} content="Obejrzane">
        <div className='td-ad-badge-wrapper'>
          <span
            className={`td-ad-badge badge-watched ${badges.isWatched && 'active'
              }`}
            onClick={() => handleToggleBadge('watched')}
          >
            <i className='bi-eye'></i>
          </span>
        </div>
      </Tippy>
      <Tippy delay={250} placement={"top"} content="Obserwuj">
        <div className='td-ad-badge-wrapper'>
          <span
            className={`td-ad-badge badge-favorite ${badges.isFavorite && 'active'
              }`}
            onClick={() => handleToggleBadge('favorite')}
          >
            <i className='bi-star'></i>
          </span>
        </div>
      </Tippy>
      <Tippy delay={250} placement={"top"} content="Telefon">
        <div className='td-ad-badge-wrapper'>
          <span
            className={`td-ad-badge badge-phone ${badges.isPhone && 'active'}`}
            onClick={() => handleToggleBadge('phone')}
          >
            <i className='bi-telephone-outbound'></i>
          </span>
        </div>
      </Tippy>
      <Tippy delay={250} placement={"top"} content="Obdzwonione">
        <div className='td-ad-badge-wrapper'>
          <span
            className={`td-ad-badge badge-phoned ${badges.isPhoned && 'active'}`}
            onClick={() => handleToggleBadge('phoned')}
          >
            <i className='bi-telephone-inbound'></i>
          </span>
        </div>
      </Tippy>
      <Tippy delay={250} placement={"top"} content="W bazie">
        <div className='td-ad-badge-wrapper'>
          <span
            className={`td-ad-badge badge-inbase ${badges.isInbase && 'active'}`}
            onClick={() => handleToggleBadge('inbase')}
          >
            <i className='bi-folder'></i>
          </span>
        </div>
      </Tippy>
      <Tippy delay={250} placement={"top"} content="Spotkanie">
        <div className='td-ad-badge-wrapper'>
          <span
            className={`td-ad-badge badge-meeting ${badges.isMeeting && 'active'
              }`}
            onClick={() => handleToggleBadge('meeting')}
          >
            <i className='bi-calendar-event'></i>
          </span>
        </div>
      </Tippy>
      <Tippy delay={250} placement={"top"} content="Umowa">
        <div className='td-ad-badge-wrapper'>
          <span
            className={`td-ad-badge badge-contract ${badges.isContract && 'active'
              }`}
            onClick={() => handleToggleBadge('contract')}
          >
            <i className='bi-file-text'></i>
          </span>
        </div>
      </Tippy>
      <Tippy delay={250} placement={"top"} content="Zamknięte">
        <div className='td-ad-badge-wrapper'>
          <span
            className={`td-ad-badge badge-closed ${badges.isClosed && 'active'}`}
            onClick={() => handleToggleBadge('closed')}
          >
            <i className='bi-door-closed'></i>
          </span>
        </div>
      </Tippy>
      <Tippy delay={250} placement={"top"} content="Pośrednik">
        <div className='td-ad-badge-wrapper'>
          <span
            className={`td-ad-badge badge-agent ${badges.isAgent && 'active'}`}
            onClick={() => handleToggleBadge('agent')}
          >
            <i className='bi-person'></i>
          </span>
        </div>
      </Tippy>
      <Tippy delay={250} placement={"top"} content="Bez pośredników">
        <div className='td-ad-badge-wrapper'>
          <span
            className={`td-ad-badge badge-noagent ${badges.isNoagent && 'active'
              }`}
            onClick={() => handleToggleBadge('noagent')}
          >
            <i className='bi-person-x'></i>
          </span>
        </div>
      </Tippy>
      <Tippy delay={250} placement={"top"} content="Nieaktualne">
        <div className='td-ad-badge-wrapper'>
          <span
            className={`td-ad-badge badge-outdated ${badges.isOutdated && 'active'
              }`}
            onClick={() => handleToggleBadge('outdated')}
          >
            <i className='bi-trash'></i>
          </span>
        </div>
      </Tippy>
    </>
  );
};

export default BadgesTable;
