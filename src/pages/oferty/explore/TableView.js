import { useGetGlobalState } from '../../../contexts/GlobalContext';
import useUpdateBadge from '../../../hooks/useUpdateBadge';

// Components
import Badges from './Badges';

// Parsers
import codeParser from '../../../utils/re_ad-code-parser';
import surfaceParser from '../../../utils/re_ad-surface-parser';
import priceSurfaceParser from '../../../utils/re_ad-price_surface-parser';
import urlParser from '../../../utils/re_ad-url-parser';
import descriptionShortParser from '../../../utils/re_ad-description_short-parser';
import dateParser from '../../../utils/re_ad-date-parser';
import Modal from './Modal';

const TableView = (props) => {
  const ads = props.data;

  const { user } = useGetGlobalState();
  const toggleBadge = useUpdateBadge();

  return (
    <table id='search-table' className='table'>
      <thead>
        <tr>
          <th scope='col'>Kod</th>
          <th scope='col'>Miasto</th>
          <th scope='col'>Ulica</th>
          <th scope='col'>m²</th>
          <th scope='col'>Cena</th>
          <th scope='col'>zł/m²</th>
          <th scope='col'>Opis</th>
          <th scope='col'>Akcje</th>
          <th scope='col'>Telefon</th>
          <th scope='col'>URL</th>
          <th scope='col'>Data</th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody>
        {ads.map((ad) => {
          return (
            <tr key={ad._id}>
              <td>{codeParser(ad.category, ad.transaction, ad.rooms)}</td>
              <td>
                <strong>{ad.city && ad.city}</strong>
                {ad.district && (
                  <>
                    <br />
                    {ad.district.toUpperCase()}
                  </>
                )}

                {ad.state && (
                  <>
                    <br />
                    {ad.state}
                  </>
                )}
              </td>
              <td>{ad.street && ad.street}</td>
              <td>{surfaceParser(ad.surface)}</td>
              <td>{ad.price && ad.price}</td>
              <td>{priceSurfaceParser(ad.price, ad.surface)}</td>
              <td style={{ width: '100%' }}>
                {descriptionShortParser(ad.title, ad.description)}
              </td>
              <td style={{ minWidth: '114px' }}>
                <Badges ad={ad} view='table' />
              </td>
              <td>{ad.phone && ad.phone}</td>
              <td>{urlParser(ad.url)}</td>
              <td className='text-nowrap'>{dateParser(ad.date)}</td>
              <td className='td-actions'>
                <span
                  className='table-td-btn btn-link'
                  data-bs-toggle='modal'
                  data-bs-target={'#id' + ad._id}
                  onClick={() =>
                    setTimeout(() => {
                      if (!user.badges.includes('watched' + ad._id)) {
                        toggleBadge('watched', ad._id);
                      }
                    }, 1000)
                  }
                >
                  <i className='bi-search'></i>
                </span>
                <Modal data={{ ad }} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableView;
