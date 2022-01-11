import React, { useState } from 'react';

// Icons and Images
import { ReactComponent as CloseIcon } from './assets/icons/close.svg';

import './assets/css/Notification.css';

const Notification = (props) => {
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState(null);
  const [exit, setExit] = useState(false);

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 0.4;
        }
        clearInterval(id);
        return prev;
      });
    }, 20);
    setIntervalID(id);
  };

  const handlePauseTimer = () => {
    clearInterval(intervalID);
  };

  const handleCloseNotification = () => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {
      props.dispatch({
        type: 'REMOVE_NOTIFICATION',
        id: props.id,
      });
    }, 500);
  };

  React.useEffect(() => {
    if (width >= 100) {
      handleCloseNotification();
    }
    // eslint-disable-next-line
  }, [width]);

  React.useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`notification-item ${props.type.toLowerCase()} ${
        exit ? 'exit' : ''
      }`}
    >
      <div className='notification-flex'>
        <div className='notification-msg'>
          <p>{props.message}</p>
        </div>
        <div className='notification-close'>
          <span onClick={() => handleCloseNotification()}>
            <CloseIcon />
          </span>
        </div>
      </div>
      <div className='bar' style={{ width: `${width}%` }}></div>
    </div>
  );
};

export default Notification;
