import dateParser from '../../../utils/re_ad-date-parser';

const AssignedItem = (props) => {
  const { ad } = props;

  return (
    <div className='row assigned-list-item'>
      <div className='col-12 col-md'>
        <div className='row'>
          <div className='col-12 title'>{ad.title}</div>
          <div className='col-12 short-info'>
            {ad.transaction}, {ad.city} ({ad.state})
            <br />
            <i className='bi-calendar-check'></i> {dateParser(ad.date)}
          </div>
        </div>
      </div>
      <div className='col-12 col-md-auto'>
        <div
          className='row'
          style={{ height: '100%', alignContent: 'space-between' }}
        >
          <div className='col-12 text-md-end mb-2'>
            <span className='price me-1 mb-1'>{ad.price} PLN</span>
          </div>
          <div className='col-12 text-md-end'>
            <button className='btn btn-outline-primary btn-sm me-1 mb-1'>
              Oznacz jako zakończone
            </button>
            <button className='btn btn-outline-primary btn-sm me-1 mb-1'>
              Szczegóły
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedItem;
