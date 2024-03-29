import { faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export interface IParams {
  key: unknown;
  dataDetail: {
    id: number;
    gtin: string;
    category: string;
    type?: string;
    title: string;
    image: string;
    creator?: string;
    description: string;
    stock: number;
    listprice: number;
    discount: number;
    ratings: number;
    comments: number;
  };
}

const SearchList = ({ dataDetail }: IParams) => {
  const { t } = useTranslation();
  const { creator, ratings, type, discount, stock, listprice } = dataDetail;
  const styleStock = stock === 0 ? 'last:text-red-400' : 'last:text-green-400';

  return (
    <div className="h-fit w-200 flex items-center gap-4 border border-slate-200 rounded-md pl-4 shadow-lg">
      <img
        className="w-24 h-32 lg:h-60 lg:w-48 m-1 object-cover rounded-md"
        src={dataDetail.image}
        alt=""
      />
      <div className="pt-2.5 w-screen h-auto lg:w-[505px]">
        <div className="max-w-[360px] sm:max-w-[640px] lg:w-full h-fit grid grid-cols-1">
          {dataDetail.title}
          <div className="flex flex-col h-12 gap-0.5 sm:h-24 sm:gap-1.5">
            <span className="flex text-yellow-600">
              <button className="h-8 w-8 flex border-none items-center justify-center text-white text-base font-bold bg-orange-300 rounded-r-lg rounded-tl-lg">
                {ratings}
              </button>
              {ratings > 4 ? '★★★★☆' : '★★★☆☆'}
            </span>
            <span>
              {dataDetail.comments}
              {t('Discussion', { ns: 'searchResult' })}
            </span>
          </div>
        </div>
        <div className="infoDes">
          <div className="mt-2 flex justify-between items-end">
            <div className="border-slate-200 pt-4 pr-1 text-sm sm:text-base">
              <h3>
                {creator &&
                  t('Author', { ns: 'searchResult' }) + ': ' + creator}
              </h3>
              <div className="mt-1 text-gray-500">
                {type && (
                  <span>
                    <FontAwesomeIcon icon={faTags} />
                    {t(`Type.${type}`)}
                  </span>
                )}
                <br />
                <b className={styleStock}>
                  {`${t('Stock', { ns: 'searchResult' })} : `}{' '}
                  {stock === 0
                    ? t('Unavailible', { ns: 'searchResult' })
                    : stock}
                </b>
              </div>
            </div>
            <div className="text-sm">
              <span className="flex justify-end text-gray-400">
                {t('NoImportFeeDeposit', { ns: 'searchResult' })}
              </span>
              <span className="flex justify-end">
                {t('ListPrice', { ns: 'searchResult' })}:{' '}
                {discount > 0 ? <del>{listprice}</del> : listprice} TWD
              </span>
              <span className="flex justify-end text-sm sm:text-base font-medium">
                {Math.floor((listprice * (100 - discount)) / 100)} TWD
                {discount > 0 ? (
                  <p className="w-20 h-8 items-center text-white text-xs p-1 border-none bg-red-400">
                    {discount}% {t('PriceOFF', { ns: 'searchResult' })}
                  </p>
                ) : (
                  ''
                )}
              </span>
              <Link to={`/products/${dataDetail.gtin}`}>
                <button className="mt-2.5 w-16 text-sm sm:w-28 sm:text-base text-white text-center border-none bg-[#FF8E04] rounded cursor-pointer hover:bg-[#CE7201]">
                  {t('CheckDetail', { ns: 'searchResult' })}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchList;
