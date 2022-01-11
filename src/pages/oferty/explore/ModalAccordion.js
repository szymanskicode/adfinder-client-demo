import { useState } from 'react';

// Components
import ModalAccordionHistory from './ModalAccordionHistory';
import ModalAccordionOther from './ModalAccordionOther';

const ModalAccordion = (props) => {
  const { ad } = props.data;

  // State
  // eslint-disable-next-line
  const [registryCount, setRegistryCount] = useState(0);
  const [historyCount, setHistoryCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);

  return (
    <div className='modal-widget' style={{ boxShadow: 'none' }}>
      <div className='accordion' id={'accordion' + ad._id}>
        <div className='accordion-item'>
          <h2 className='accordion-header' id={'headingOne' + ad._id}>
            <button
              className='accordion-button collapsed btn-link'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target={'#collapseOne' + ad._id}
              aria-expanded='false'
              aria-controls={'collapseOne' + ad._id}
            >
              Rejestr zdarzeń ({registryCount})
            </button>
          </h2>
          <div
            id={'collapseOne' + ad._id}
            className='accordion-collapse collapse'
            aria-labelledby={'headingOne' + ad._id}
            data-bs-parent={'#accordion' + ad._id}
          >
            <div className='accordion-body'>
              {/* Single record */}
              <div className='accordion-record'>
                <span className='record-date'>
                  <strong>27.02.2021</strong> godz. 15:43
                </span>
                <span className='record-msg'>
                  <strong>Username</strong> (user@wp.pl) dodał akcję Obejrzane.
                </span>
              </div>
              <div className='accordion-record'>
                <span className='record-date'>
                  <strong>27.02.2021</strong> godz. 15:43
                </span>
                <span className='record-msg'>
                  <strong>Username</strong> (user@wp.pl) usunął akcję Obejrzane.
                </span>
              </div>
              <div className='accordion-record'>
                <span className='record-date'>
                  <strong>27.02.2021</strong> godz. 15:43
                </span>
                <span className='record-msg'>
                  <strong>Username</strong> (user@wp.pl) dodał komentarz.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='accordion-item'>
          <h2 className='accordion-header' id={'headingTwo' + ad._id}>
            <button
              className='accordion-button collapsed btn-link'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target={'#collapseTwo' + ad._id}
              aria-expanded='false'
              aria-controls={'collapseTwo' + ad._id}
            >
              Historia ogłoszenia ({historyCount})
            </button>
          </h2>
          <div
            id={'collapseTwo' + ad._id}
            className='accordion-collapse collapse'
            aria-labelledby={'headingTwo' + ad._id}
            data-bs-parent={'#accordion' + ad._id}
          >
            <div className='accordion-body'>
              <ModalAccordionHistory data={{ ad, setHistoryCount }} />
            </div>
          </div>
        </div>
        <div className='accordion-item'>
          <h2 className='accordion-header' id={'headingThree' + ad._id}>
            <button
              className='accordion-button collapsed btn-link'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target={'#collapseThree' + ad._id}
              aria-expanded='false'
              aria-controls={'collapseThree' + ad._id}
            >
              Inne ogłoszenia oferenta ({otherCount})
            </button>
          </h2>
          <div
            id={'collapseThree' + ad._id}
            className='accordion-collapse collapse'
            aria-labelledby={'headingThree' + ad._id}
            data-bs-parent={'#accordion' + ad._id}
          >
            <div className='accordion-body'>
              <ModalAccordionOther data={{ ad, setOtherCount }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAccordion;
