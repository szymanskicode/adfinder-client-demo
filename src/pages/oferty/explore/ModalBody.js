import dateParser from '../../../utils/re_ad-date-parser';
import priceSurfaceParser from '../../../utils/re_ad-price_surface-parser';
import providerParser from '../../../utils/re_ad-provider-parser';
import AddToBasketWidget from './AddToBasketWidget';
import AssignAgentWidget from './AssignAgentWidget';
import ModalAccordion from './ModalAccordion';

// Components
import Badges from './Badges';

const ModalBody = (props) => {
  const { ad } = props.data;

  return (
    <div className='modal-body'>
      <div className='row'>
        <div className='col col-12'>
          <Badges ad={ad} view='modal' />
        </div>
      </div>
      <div className='row'>
        <div className='col col-12'>
          <div className='row'>
            <div className='col col-12 col-md-6 col-xl-8'>
              {ad.date && <p>Data ogłoszenia: {dateParser(ad.date)}</p>}
              {<p>{ad.subcategory && 'Rodzaj ' + ad.subcategory}</p>}
              {(ad.category ||
                ad.transaction ||
                ad.state ||
                ad.city ||
                ad.district ||
                ad.street) && (
                <p className='det-breadcrumbs'>
                  {ad.category && ad.category}
                  {ad.transaction && ' > ' + ad.transaction}
                  {ad.state && ' > ' + ad.state}
                  {ad.city && ' > ' + ad.city}
                  {ad.district && ' > ' + ad.district}
                  {ad.street && ' > ' + ad.street}
                </p>
              )}
              {ad.price && (
                <h1 className='det-price'>
                  {ad.price && ad.price + ' PLN'}
                  <span className='det-price-surface-wrapper'>
                    <span className='det-price-surface'>
                      {ad.price && priceSurfaceParser(ad.price, ad.surface)}
                    </span>
                    <span className='det-price-surface-txt'>PLN/m²</span>
                  </span>
                </h1>
              )}
              {(ad.phone || ad.email || ad.url) && (
                <p className='det-contact-wrapper'>
                  {ad.phone && (
                    <span className='det-contact'>
                      <i className='bi-telephone-fill'></i>
                      {ad.phone}
                    </span>
                  )}
                  {ad.email && (
                    <span className='det-contact'>
                      <i className='bi-envelope-fill'></i>
                      {ad.email}
                    </span>
                  )}
                  {ad.url && (
                    <a
                      className='det-contact btn-link'
                      href={ad.url}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <i className='bi-globe'></i>
                      {ad.provider && providerParser(ad.provider)}
                    </a>
                  )}
                </p>
              )}
              {ad.title && <h6>{ad.title}</h6>}
              {ad.description && <p>{ad.description}</p>}
              {(Array.isArray(ad.additionalInfo) ||
                ad.surface ||
                ad.subcategory ||
                ad.rooms) &&
                ad.additionalInfo.length > 0 && (
                  <p className='info-badge-wrapper'>
                    {ad.surface && (
                      <span className='info-badge'>
                        {'Powierzchnia: ' + ad.surface + ' m²'}
                      </span>
                    )}
                    {ad.rooms && (
                      <span className='info-badge'>
                        {'Pokoje: ' + ad.rooms}
                      </span>
                    )}
                    {ad.subcategory && (
                      <span className='info-badge'>
                        {'Rodzaj: ' + ad.subcategory}
                      </span>
                    )}
                    {ad.additionalInfo.map((el, index) => (
                      <span key={index} className='info-badge'>
                        {el}
                      </span>
                    ))}
                  </p>
                )}
            </div>
            <div className='col col-12 col-md-6 col-xl-4'>
              <AddToBasketWidget data={{ ad }} />
              <AssignAgentWidget data={{ ad }} />
              <ModalAccordion data={{ ad }} />
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col col-12'>Tutaj komentarze...</div>
      </div>
    </div>
  );
};

export default ModalBody;
