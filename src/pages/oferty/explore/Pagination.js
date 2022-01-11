import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

// CSS Styles
import '../Offers.css';

const Pagination = (props) => {
  const { count, limit } = props;

  const history = useHistory();

  const { page } = useParams();

  // Local state
  const [activePage, setActivePage] = useState();
  const [pagesArr, setPagesArr] = useState([1]);
  const [pagesNum, setPagesNum] = useState();

  // Count pages
  useEffect(() => {
    let countPages = parseInt(count / limit);
    const modulo = count % limit;
    if (modulo > 0) {
      countPages = countPages + 1;
    }
    setPagesNum(countPages);
    // eslint-disable-next-line
  }, [count, limit]);

  // Set array of pages
  useEffect(() => {
    if (pagesNum) {
      let arr = [];
      for (let page = 1; page <= pagesNum; page++) {
        arr.push(page);
      }
      setPagesArr(arr);
    }
  }, [pagesNum]);

  // Initialize page
  useEffect(() => {
    if (!pagesNum) {
      return;
    }
    if (parseInt(page).toString() === page) {
      if (parseInt(page) <= 0 || parseInt(page) > pagesNum) {
        history.push('/oferty/przegladaj/1');
      } else {
        setActivePage(parseInt(page));
      }
    } else {
      history.push('/oferty/przegladaj/1');
    }
    // eslint-disable-next-line
  }, [page, pagesNum]);

  // Handle page select
  const handlePageChange = (e) => {
    e.preventDefault();
    setActivePage(e.target.value);
    history.push('/oferty/przegladaj/' + e.target.value);
  };

  // Handle go prev and next
  const handlePrev = () => {
    history.push('/oferty/przegladaj/' + (activePage - 1));
  };
  const handleNext = () => {
    history.push('/oferty/przegladaj/' + (activePage + 1));
  };

  return (
    <div className='pagination-wrapper'>
      {pagesArr.length > 0 &&
        activePage &&
        <div className='input-group'>
          <button
            className='input-group-text label btn btn-link'
            onClick={() => handlePrev()}
            disabled={parseInt(activePage) === 1}
          >
            <i className='bi-caret-left-fill'></i>
          </button>
          <select
            className='form-select form-select-sm'
            value={activePage}
            onChange={(e) => handlePageChange(e)}
          >
            {pagesArr.length > 0 &&
              activePage &&
              pagesArr.map((page) => {
                return (
                  <option key={page} value={page}>
                    {page}
                  </option>
                );
              })}
          </select>
          <div className='input-group-text'>/</div>
          <div
            className='input-group-text'
            style={{ paddingLeft: '0px', paddingRight: '0px' }}
          >
            {isNaN(pagesNum) ? '1' : `${pagesNum}`}
          </div>
          <button
            className='input-group-text label btn btn-link'
            disabled={parseInt(activePage) === parseInt(pagesNum)}
            onClick={() => handleNext()}
          >
            <i className='bi-caret-right-fill'></i>
          </button>
        </div>
      }
    </div>
  );
};

export default Pagination;
