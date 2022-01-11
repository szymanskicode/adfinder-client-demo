import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import toSearchString from '../../../utils/toSearchString';
import setRange from '../../../utils/setRange';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import pl from 'date-fns/locale/pl';
import { useGetSearchForm } from '../../../contexts/SearchFormContext';
import scrollToTop from '../../../utils/scrollToTop';
import FilterBar from '../explore/FilterBar';

// CSS Styles
import './SearchBar.css';

registerLocale('pl', pl);

const SearchBar = (props) => {
  const { getAds, setAds, setCount, setLimit } = props;

  const { page } = useParams();
  const history = useHistory();

  // Contexts
  const { form, setVal, resetForm } = useGetSearchForm();

  // Local state
  const [timeoutId, setTimeoutId] = useState();
  const [listener, setListener] = useState(true);

  // Validate price
  function validatePrice(value, action) {
    value = value.replace(',', '.');
    value = value.replace(/ /g, '');

    if (!value || isNaN(value)) {
      if (action === 'from' && !value) {
        setVal({ priceFrom: '' });
      }
      if (action === 'from' && value) {
        setVal((prev) => prev);
      }
      if (action === 'to' && !value) {
        setVal({ priceTo: '' });
      }
      if (action === 'to' && value) {
        setVal((prev) => prev);
      }
    } else {
      let price = value.substring(0, 12);
      price = parseInt(value);
      action === 'from' && setVal({ priceFrom: price });
      action === 'to' && setVal({ priceTo: price });
    }
  }

  // Validate surface
  function validateSurface(value, action) {
    value = value.replace(',', '.');
    value = value.replace(/ /g, '');

    if (!value || isNaN(value)) {
      if (action === 'from' && !value) {
        setVal({ surfaceFrom: '' });
      }
      if (action === 'from' && value) {
        setVal((prev) => prev);
      }
      if (action === 'to' && !value) {
        setVal({ surfaceTo: '' });
      }
      if (action === 'to' && value) {
        setVal((prev) => prev);
      }
    } else {
      let surface = value.substring(0, 12);
      surface = parseInt(value);
      action === 'from' && setVal({ surfaceFrom: surface });
      action === 'to' && setVal({ surfaceTo: surface });
    }
  }

  // Price and surface display midifiers
  function displayBy3(val) {
    if (val) {
      val = val.toString();
    }
    val = val + ' ';
    val = val.trim();
    const arr = val.match(/\d{1,3}(?=(\d{3})*$)/g) || [];
    val = arr.join(' ');
    return val;
  }

  // Get ads on first render and when form changes
  useEffect(() => {
    scrollToTop();
    clearTimeout(timeoutId);
    setAds('fetching...');
    const criteria = {};

    // Build criteria object
    if (form.state && form.state !== 'all') {
      criteria.state = toSearchString(form.state);
    }

    if (form.city && form.city.trim() !== '') {
      criteria.city = toSearchString(form.city).trim();
    }

    if (form.transaction && form.transaction !== 'all') {
      criteria.transaction = toSearchString(form.transaction);
    }

    if (form.category && form.category !== 'all') {
      criteria.category = toSearchString(form.category);
    }

    if (form.subcategory && form.subcategory !== 'all') {
      criteria.subcategory = toSearchString(form.subcategory);
    }

    if (form.rooms && form.rooms !== 'all') {
      criteria.rooms = form.rooms;
    }

    if (form.surfaceFrom || form.surfaceTo) {
      const val = setRange(form.surfaceFrom, form.surfaceTo);
      if (val[0]) {
        criteria.surfacefrom = val[0];
      }
      if (val[1]) {
        criteria.surfaceto = val[1];
      }
    }

    if (form.priceFrom || form.priceTo) {
      const val = setRange(form.priceFrom, form.priceTo);
      if (val[0]) {
        criteria.pricefrom = val[0];
      }
      if (val[1]) {
        criteria.priceto = val[1];
      }
    }

    if (form.phrase && form.phrase !== 'all') {
      criteria.phrase = toSearchString(form.phrase);
    }
    if (form.checkDsc) {
      criteria.checkdsc = true;
    }
    if (form.searchAll) {
      criteria.searchall = true;
    }

    if (form.startDate && form.endDate) {
      function convertDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const value = year * 10000 + month * 100 + day;
        return value;
      }
      criteria.datefrom = convertDate(form.startDate);
      criteria.dateto = convertDate(form.endDate);
    }

    // Set requestet page
    criteria.page = page;

    const setters = { setCount, setLimit };
    // Get ads instantly on first load
    if (Object.keys(criteria).length === 0 && !timeoutId) {
      getAds(setAds, {}, setters);
      return;
    }

    // Get ads timeouted when criteria are changed
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const tId = setTimeout(() => {
      getAds(setAds, criteria, setters);
    }, 1500);
    setTimeoutId(tId);
    // eslint-disable-next-line
  }, [listener, page]);

  // Set the listener for start getting ads
  useEffect(() => {
    if (parseInt(page) > 1) {
      history.push('/oferty/przegladaj/1');
    } else {
      setListener((prev) => !prev);
    }
    // eslint-disable-next-line
  }, [
    form.transaction,
    form.state,
    form.city,
    form.category,
    form.subcategory,
    form.priceFrom,
    form.priceTo,
    form.surfaceFrom,
    form.surfaceTo,
    form.rooms,
    form.phrase,
    form.checkDsc,
    form.searchAll,
    form.startDate,
    form.endDate,
  ]);

  return (
    <div className='accordion' id='search-accordion'>
      <div className='accordion-item'>
        <h2
          className='accordion-header page-title'
          id='searchAccordionHeadingOne'
        >
          <span>Przeglądaj oferty</span>
          <span
            className='toggle-filters'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#searchAccordionOne'
            aria-expanded='true'
            aria-controls='searchAccordionOne'
          >
            <i className='bi-sliders'></i> FILTRY
          </span>
        </h2>
        <div
          id='searchAccordionOne'
          className='accordion-collapse collapse'
          aria-labelledby='searchAccordionHeadingOne'
          data-bs-parent='#search-accordion'
        >
          <div className='accordion-body search-bar'>
            <form id='search-form' className='row g-3'>
              <div className='col-12 col-md-6 col-lg-3'>
                <label htmlFor='form.state' className='form-label'>
                  Region
                  {form.state !== 'all' && (
                    <span
                      style={{ padding: '2px 5px', cursor: 'pointer' }}
                      onClick={() => setVal({ state: 'all' })}
                    >
                      <i className='bi-x-circle-fill text-danger'></i>
                    </span>
                  )}
                </label>
                <select
                  id='form.state'
                  className='form-select'
                  value={form.state}
                  onChange={(e) => setVal({ state: e.target.value })}
                >
                  <option value='all'>Cała Polska</option>
                  <option value='dolnoslaskie'>Dolnośląskie</option>
                  <option value='kujawsko-pomorskie'>Kujawsko-pomorskie</option>
                  <option value='lubelskie'>Lubelskie</option>
                  <option value='lubuskie'>Lubuskie</option>
                  <option value='lodzkie'>Łódzkie</option>
                  <option value='malopolskie'>Małopolskie</option>
                  <option value='mazowieckie'>Mazowieckie</option>
                  <option value='opolskie'>Opolskie</option>
                  <option value='podkarpackie'>Podkarpackie</option>
                  <option value='podlaskie'>Podlaskie</option>
                  <option value='pomorskie'>Pomorskie</option>
                  <option value='slaskie'>Śląskie</option>
                  <option value='swietokrzyskie'>Świętokrzyskie</option>
                  <option value='warminsko-mazurskie'>
                    Warmińsko-mazurskie
                  </option>
                  <option value='wielkopolskie'>Wielkopolskie</option>
                  <option value='zachodniopomorskie'>Zachodniopomorskie</option>
                </select>
              </div>
              <div className='col-12 col-md-6 col-lg-3'>
                <label htmlFor='form.city' className='form-label'>
                  Miasto
                  {form.city && (
                    <span
                      style={{ padding: '2px 5px', cursor: 'pointer' }}
                      onClick={() => setVal({ city: '' })}
                    >
                      <i className='bi-x-circle-fill text-danger'></i>
                    </span>
                  )}
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='form.city'
                  value={form.city}
                  onChange={(e) => setVal({ city: e.target.value })}
                />
              </div>
              <div className='col-12 col-md-6 col-lg-3'>
                <label htmlFor='form.transaction' className='form-label'>
                  Typ transakcji
                  {form.transaction !== 'all' && (
                    <span
                      style={{ padding: '2px 5px', cursor: 'pointer' }}
                      onClick={() => setVal({ transaction: 'all' })}
                    >
                      <i className='bi-x-circle-fill text-danger'></i>
                    </span>
                  )}
                </label>
                <select
                  id='form.transaction'
                  className='form-select'
                  value={form.transaction}
                  onChange={(e) => setVal({ transaction: e.target.value })}
                >
                  <option value='all'>Wszystko</option>
                  <option value='kupno'>Kupno</option>
                  <option value='sprzedaz'>Sprzedaż</option>
                  <option value='wynajem'>Wynajem</option>
                  <option value='najem'>Najem</option>
                  <option value='zamiana'>Zamiana</option>
                </select>
              </div>
              <div className='col-12 col-md-6 col-lg-3'>
                <label htmlFor='form.category' className='form-label'>
                  Nieruchomość
                  {form.category !== 'all' && (
                    <span
                      style={{ padding: '2px 5px', cursor: 'pointer' }}
                      onClick={() => setVal({ category: 'all' })}
                    >
                      <i className='bi-x-circle-fill text-danger'></i>
                    </span>
                  )}
                </label>
                <select
                  id='form.category'
                  className='form-select'
                  value={form.category}
                  onChange={(e) => {
                    setVal({ category: e.target.value });
                    setVal({ subcategory: 'all' });
                    setVal({ rooms: 'all' });
                  }}
                >
                  <option value='all'>Wszystko</option>
                  <option value='mieszkanie'>Mieszkanie</option>
                  <option value='dom'>Dom</option>
                  <option value='dzialka'>Działka</option>
                  <option value='biuro-lokal'>Biuro / lokal</option>
                  <option value='garaz-parking'>Garaż / parking</option>
                </select>
              </div>
              {form.category === 'mieszkanie' && (
                <div className='col-12 col-md-6 col-lg-3'>
                  <label htmlFor='form.rooms' className='form-label'>
                    Liczba pokoi
                    {form.rooms !== 'all' && (
                      <span
                        style={{ padding: '2px 5px', cursor: 'pointer' }}
                        onClick={() => setVal({ rooms: 'all' })}
                      >
                        <i className='bi-x-circle-fill text-danger'></i>
                      </span>
                    )}
                  </label>
                  <select
                    id='form.rooms'
                    className='form-select'
                    value={form.rooms}
                    onChange={(e) => setVal({ rooms: e.target.value })}
                  >
                    <option value='all'>Wszystko</option>
                    <option value='1'>Kawalerka</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4 i więcej</option>
                  </select>
                </div>
              )}
              {form.category === 'mieszkanie' && (
                <div className='col-12 col-md-6 col-lg-3'>
                  <label htmlFor='type' className='form-label'>
                    Rodzaj zabudowy
                    {form.subcategory !== 'all' && (
                      <span
                        style={{ padding: '2px 5px', cursor: 'pointer' }}
                        onClick={() => setVal({ subcategory: 'all' })}
                      >
                        <i className='bi-x-circle-fill text-danger'></i>
                      </span>
                    )}
                  </label>
                  <select
                    id='type'
                    className='form-select'
                    value={form.subcategory}
                    onChange={(e) => setVal({ subcategory: e.target.value })}
                  >
                    <option value='all'>Wszystko</option>
                    <option value='blok'>Blok</option>
                    <option value='kamienica'>Kamienica</option>
                    <option value='dom-wolnostojacy'>Dom wolnostojący</option>
                    <option value='szeregowiec'>Szeregowiec</option>
                    <option value='apartamentowiec'>Apartamentowiec</option>
                    <option value='loft'>Loft</option>
                  </select>
                </div>
              )}
              {form.category === 'dom' && (
                <div
                  className={`col-12  ${form.category !== 'mieszkanie'
                      ? 'col-md-12 col-lg-6'
                      : 'col-md-6 col-lg-3'
                    }`}
                >
                  <label htmlFor='type' className='form-label'>
                    Rodzaj zabudowy
                    {form.subcategory !== 'all' && (
                      <span
                        style={{ padding: '2px 5px', cursor: 'pointer' }}
                        onClick={() => setVal({ subcategory: 'all' })}
                      >
                        <i className='bi-x-circle-fill text-danger'></i>
                      </span>
                    )}
                  </label>
                  <select
                    id='type'
                    className='form-select'
                    value={form.subcategory}
                    onChange={(e) => setVal({ subcategory: e.target.value })}
                  >
                    <option value='all'>Wszystko</option>
                    <option value='wolnostojacy'>Wolnostojący</option>
                    <option value='blizniak'>Bliźniak</option>
                    <option value='szeregowiec'>Szeregowiec</option>
                    <option value='gospodarstwo'>Gospodarstwo</option>
                    <option value='letniskowy'>Letniskowy</option>
                  </select>
                </div>
              )}
              {form.category === 'dzialka' && (
                <div
                  className={`col-12  ${form.category !== 'mieszkanie'
                      ? 'col-md-12 col-lg-6'
                      : 'col-md-6 col-lg-3'
                    }`}
                >
                  <label htmlFor='type' className='form-label'>
                    Rodzaj
                    {form.subcategory !== 'all' && (
                      <span
                        style={{ padding: '2px 5px', cursor: 'pointer' }}
                        onClick={() => setVal({ subcategory: 'all' })}
                      >
                        <i className='bi-x-circle-fill text-danger'></i>
                      </span>
                    )}
                  </label>
                  <select
                    id='type'
                    className='form-select'
                    value={form.subcategory}
                    onChange={(e) => setVal({ subcategory: e.target.value })}
                  >
                    <option value='all'>Wszystko</option>
                    <option value='rekreacyjna'>Rekreacyjna</option>
                    <option value='budowlana'>Budowlana</option>
                    <option value='rolna'>Rolna</option>
                    <option value='lesna'>Leśna</option>
                    <option value='inwestycyjna'>Inwestycyjna</option>
                    <option value='rolno-budowlana'>Rolno-budowlana</option>
                    <option value='siedliskowa'>Siedliskowa</option>
                    <option value='ogrodek-dzialkowy'>Ogródek działkowy</option>
                  </select>
                </div>
              )}
              {form.category === 'biuro-lokal' && (
                <div
                  className={`col-12  ${form.category !== 'mieszkanie'
                      ? 'col-md-12 col-lg-6'
                      : 'col-md-6 col-lg-3'
                    }`}
                >
                  <label htmlFor='type' className='form-label'>
                    Przeznaczenie
                    {form.subcategory !== 'all' && (
                      <span
                        style={{ padding: '2px 5px', cursor: 'pointer' }}
                        onClick={() => setVal({ subcategory: 'all' })}
                      >
                        <i className='bi-x-circle-fill text-danger'></i>
                      </span>
                    )}
                  </label>
                  <select
                    id='type'
                    className='form-select'
                    value={form.subcategory}
                    onChange={(e) => setVal({ subcategory: e.target.value })}
                  >
                    <option value='all'>Wszystko</option>
                    <option value='uslugowe'>Usługowe</option>
                    <option value='biurowe'>Biurowe</option>
                    <option value='handlowe'>Handlowe</option>
                    <option value='gastronomiczne'>Gastronomiczne</option>
                    <option value='przemyslowe'>Przemysłowe</option>
                    <option value='hotelowe'>Hotelowe</option>
                  </select>
                </div>
              )}
              <div className='col-12 col-sm-6 col-md-3'>
                <label htmlFor='surfacefrom' className='form-label'>
                  Pow. od
                  {form.surfaceFrom !== '' && (
                    <span
                      style={{ padding: '2px 5px', cursor: 'pointer' }}
                      onClick={() => setVal({ surfaceFrom: '' })}
                    >
                      <i className='bi-x-circle-fill text-danger'></i>
                    </span>
                  )}
                </label>
                <div className='input-group'>
                  <input
                    type='text'
                    className='form-control'
                    id='surfacefrom'
                    value={form.surfaceFrom}
                    onChange={(e) => validateSurface(e.target.value, 'from')}
                  />
                  <div className='input-group-text'>m²</div>
                </div>
              </div>
              <div className='col-12 col-sm-6 col-md-3'>
                <label htmlFor='surfaceto' className='form-label'>
                  Pow. do
                  {form.surfaceTo !== '' && (
                    <span
                      style={{ padding: '2px 5px', cursor: 'pointer' }}
                      onClick={() => setVal({ surfaceTo: '' })}
                    >
                      <i className='bi-x-circle-fill text-danger'></i>
                    </span>
                  )}
                </label>
                <div className='input-group'>
                  <input
                    type='text'
                    className='form-control'
                    id='surfaceto'
                    value={form.surfaceTo}
                    onChange={(e) => validateSurface(e.target.value, 'to')}
                  />
                  <div className='input-group-text'>m²</div>
                </div>
              </div>
              <div className='col-12 col-sm-6 col-md-3'>
                <label htmlFor='pricefrom' className='form-label'>
                  Cena od
                  {form.priceFrom !== '' && (
                    <span
                      style={{ padding: '2px 5px', cursor: 'pointer' }}
                      onClick={() => setVal({ priceFrom: '' })}
                    >
                      <i className='bi-x-circle-fill text-danger'></i>
                    </span>
                  )}
                </label>
                <div className='input-group'>
                  <input
                    type='text'
                    className='form-control'
                    id='pricefrom'
                    value={displayBy3(form.priceFrom)}
                    onChange={(e) => validatePrice(e.target.value, 'from')}
                  />
                  <div className='input-group-text'>,00 PLN</div>
                </div>
              </div>
              <div className='col-12 col-sm-6 col-md-3'>
                <label htmlFor='priceto' className='form-label'>
                  Cena do
                  {form.priceTo !== '' && (
                    <span
                      style={{ padding: '2px 5px', cursor: 'pointer' }}
                      onClick={() => setVal({ priceTo: '' })}
                    >
                      <i className='bi-x-circle-fill text-danger'></i>
                    </span>
                  )}
                </label>
                <div className='input-group'>
                  <input
                    type='text'
                    className='form-control'
                    id='priceto'
                    value={displayBy3(form.priceTo)}
                    onChange={(e) => validatePrice(e.target.value, 'to')}
                  />
                  <div className='input-group-text'>,00 PLN</div>
                </div>
              </div>
              <div className='col-12 col-sm-6 col-md-6 col-lg-3 date-custom'>
                <label
                  htmlFor='datefrom'
                  className='form-label'
                  style={{ width: '100%' }}
                >
                  <span className='date-flex'>
                    <span>Data od</span>
                    <span
                      className='date-changer'
                      onClick={() => {
                        const date = new Date();

                        if (date.getDate() - 7 === form.startDate.getDate())
                          return;

                        date.setDate(date.getDate() - 7);
                        setVal({ startDate: date });
                      }}
                    >
                      7 dni
                    </span>
                    <span
                      className='date-changer'
                      onClick={() => {
                        const date = new Date();

                        if (date.getDate() - 3 === form.startDate.getDate())
                          return;

                        date.setDate(date.getDate() - 3);
                        setVal({ startDate: date });
                      }}
                    >
                      3 dni
                    </span>
                    <span
                      className='date-changer'
                      onClick={() => {
                        if (new Date().getDate() === form.startDate.getDate())
                          return;

                        setVal({ startDate: new Date() });
                      }}
                    >
                      Dziś
                    </span>
                  </span>
                </label>
                <DatePicker
                  selected={form.startDate}
                  onChange={(date) => {
                    if (!Boolean(date)) {
                      setVal({ startDate: new Date() });
                    } else setVal({ startDate: date });
                  }}
                  selectsStart
                  startDate={form.startDate}
                  endDate={form.endDate}
                  locale='pl'
                  dateFormat='dd.MM.yyyy'
                  className='form-control'
                  minDate={new Date(2000, 0, 1)}
                  maxDate={new Date()}
                />
              </div>
              <div className='col-12 col-sm-6 col-md-6 col-lg-3 date-custom'>
                <label htmlFor='dateto' className='form-label'>
                  <span className='date-flex'>
                    <span>Data do</span>
                    <span
                      className='date-changer'
                      onClick={() => {
                        setVal({ endDate: new Date() });
                      }}
                    >
                      Dziś
                    </span>
                  </span>
                </label>
                <DatePicker
                  selected={form.endDate}
                  onChange={(date) => {
                    if (!Boolean(date)) {
                      setVal({ endDate: new Date() });
                    } else setVal({ endDate: date });
                  }}
                  selectsEnd
                  startDate={form.startDate}
                  endDate={form.endDate}
                  minDate={form.startDate}
                  locale='pl'
                  dateFormat='dd.MM.yyyy'
                  className='form-control'
                  maxDate={new Date()}
                />
              </div>

              <div className='col-12 col-sm-6'>
                <label htmlFor='form.phrase' className='form-label'>
                  Szukana fraza
                  {form.phrase ? (
                    <span
                      style={{ padding: '2px 5px', cursor: 'pointer' }}
                      onClick={() => setVal({ phrase: '' })}
                    >
                      <i className='bi-x-circle-fill text-danger'></i>
                    </span>
                  ) : (
                    <span
                      style={{
                        paddingLeft: '5px',
                        fontWeight: 'normal',
                        textTransform: 'none',
                      }}
                    >
                      (np. nazwa ulicy, id ogłoszenia, etc.)
                    </span>
                  )}
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='form.phrase'
                  value={form.phrase}
                  onChange={(e) => setVal({ phrase: e.target.value })}
                />
              </div>
              <div className='col-12 col-sm-6'>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='checkdsc'
                    checked={form.checkDsc}
                    value={form.checkDsc}
                    onChange={(e) => {
                      setVal({ checkDsc: !form.checkDsc });
                    }}
                  />
                  <label className='form-check-label' htmlFor='checkdsc'>
                    Szukaj frazy także w opisie
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='searchall'
                    checked={form.searchAll}
                    value={form.searchAll}
                    onChange={(e) => {
                      setVal({ searchAll: !form.searchAll });
                    }}
                  />
                  <label className='form-check-label' htmlFor='searchall'>
                    Szukaj także niesprecyzowanych{' '}
                    <span
                      style={{ fontWeight: 'normal', textTransform: 'none' }}
                    >
                      (zalecane)
                    </span>
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
        <FilterBar form={form} setVal={setVal} resetForm={resetForm} />
      </div>
    </div>
  );
};

export default SearchBar;
