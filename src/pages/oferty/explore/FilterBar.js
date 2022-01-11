import formatDatePl from '../../../utils/format-date-pl';

// CSS Styles
import '../Offers.css';

const FilterBar = (props) => {
  const { form, setVal, resetForm } = props;

  return (
    <div className='row'>
      <div className='col col-12'>
        <div id='filter-bar'>
          {form.startDate.getDate() === new Date().getDate() &&
            form.endDate.getDate() === new Date().getDate() && (
              <span className='filter-bar-badge today'>
                <span style={{ textTransform: 'none' }}>Dzisiaj</span>
              </span>
            )}

          {form.startDate.getDate() !== new Date().getDate() && (
            <span
              onClick={() => setVal({ startDate: new Date() })}
              className='filter-bar-badge'
            >
              Data od:{' '}
              <span style={{ textTransform: 'lowercase' }}>
                {formatDatePl(form.startDate)}
              </span>{' '}
              <i className='bi-x-circle'></i>
            </span>
          )}

          {form.endDate.getDate() !== new Date().getDate() && (
            <span
              onClick={() => setVal({ endDate: new Date() })}
              className='filter-bar-badge'
            >
              Data do:{' '}
              <span style={{ textTransform: 'lowercase' }}>
                {formatDatePl(form.endDate)}
              </span>{' '}
              <i className='bi-x-circle'></i>
            </span>
          )}

          {form.state !== 'all' && (
            <span
              onClick={() => setVal({ state: 'all' })}
              className='filter-bar-badge'
            >
              Region:{' '}
              <span style={{ textTransform: 'lowercase' }}>{form.state}</span>{' '}
              <i className='bi-x-circle'></i>
            </span>
          )}

          {form.city !== '' && (
            <span className='filter-bar-badge'>
              Miasto:{' '}
              <span
                onClick={() => setVal({ city: '' })}
                style={{ textTransform: 'lowercase' }}
              >
                {form.city}
              </span>{' '}
              <i className='bi-x-circle'></i>
            </span>
          )}

          {form.transaction !== 'all' && (
            <span
              onClick={() => setVal({ transaction: 'all' })}
              className='filter-bar-badge'
            >
              Transakcja:{' '}
              <span style={{ textTransform: 'lowercase' }}>
                {form.transaction}
              </span>{' '}
              <i className='bi-x-circle'></i>
            </span>
          )}

          {form.category !== 'all' && (
            <span
              onClick={() => setVal({ category: 'all' })}
              className='filter-bar-badge'
            >
              Nieruchomość:{' '}
              <span style={{ textTransform: 'lowercase' }}>
                {form.category}
              </span>{' '}
              <i className='bi-x-circle'></i>
            </span>
          )}

          {form.rooms !== 'all' && (
            <span
              onClick={() => setVal({ rooms: 'all' })}
              className='filter-bar-badge'
            >
              Pokoje:{' '}
              <span style={{ textTransform: 'lowercase' }}>{form.rooms}</span>{' '}
              <i className='bi-x-circle'></i>
            </span>
          )}

          {form.subcategory !== 'all' && (
            <span
              onClick={() => setVal({ subcategory: 'all' })}
              className='filter-bar-badge'
            >
              Rodzaj:{' '}
              <span style={{ textTransform: 'lowercase' }}>
                {form.subcategory}
              </span>{' '}
              <i className='bi-x-circle'></i>
            </span>
          )}

          {form.surfaceFrom !== '' && (
            <span
              onClick={() => setVal({ surfaceFrom: '' })}
              className='filter-bar-badge'
            >
              Pow. od:{' '}
              <span style={{ textTransform: 'lowercase' }}>
                {form.surfaceFrom}m²
              </span>{' '}
              <i className='bi-x-circle'></i>
            </span>
          )}

          {form.surfaceTo !== '' && (
            <span
              onClick={() => setVal({ surfaceTo: '' })}
              className='filter-bar-badge'
            >
              Pow. do:{' '}
              <span style={{ textTransform: 'lowercase' }}>
                {form.surfaceTo}m²
              </span>{' '}
              <i className='bi-x-circle'></i>
            </span>
          )}

          {form.priceFrom !== '' && (
            <span
              onClick={() => setVal({ priceFrom: '' })}
              className='filter-bar-badge'
            >
              Cena od:{' '}
              <span style={{ textTransform: 'lowercase' }}>
                {form.priceFrom}m²
              </span>{' '}
              <i className='bi-x-circle'></i>
            </span>
          )}

          {form.priceTo !== '' && (
            <span
              onClick={() => setVal({ priceTo: '' })}
              className='filter-bar-badge'
            >
              Cena do:{' '}
              <span style={{ textTransform: 'lowercase' }}>
                {form.priceTo}m²
              </span>{' '}
              <i className='bi-x-circle'></i>
            </span>
          )}

          {form.phrase !== '' && (
            <span
              onClick={() => setVal({ phrase: '' })}
              className='filter-bar-badge'
            >
              Fraza:{' '}
              <span style={{ textTransform: 'none' }}>{form.phrase}</span>{' '}
              <i className='bi-x-circle'></i>
            </span>
          )}

          {form.searchAll !== true && (
            <span
              onClick={() => setVal({ searchAll: true })}
              className='filter-bar-badge'
            >
              Niesprecyzowane:{' '}
              <span style={{ textTransform: 'none' }}>wyłączone</span>{' '}
              <i className='bi-x-circle'></i>
            </span>
          )}

          {(form.state !== 'all' ||
            form.city !== '' ||
            form.transaction !== 'all' ||
            form.category !== 'all' ||
            form.rooms !== 'all' ||
            form.subcategory !== 'all' ||
            form.surfaceFrom !== '' ||
            form.surfaceTo !== '' ||
            form.priceFrom !== '' ||
            form.priceTo !== '' ||
            form.startDate.getDate() !== new Date().getDate() ||
            form.endDate.getDate() !== new Date().getDate() ||
            form.phrase !== '' ||
            form.searchAll === false) && (
              <span className='filter-bar-badge remove-all'>
                <span
                  onClick={() => resetForm()}
                  style={{ textTransform: 'none' }}
                >
                  Usuń filtry
                </span>{' '}
              </span>
            )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
