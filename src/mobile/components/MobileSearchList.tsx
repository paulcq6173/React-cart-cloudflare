import { IParams } from '@/components/SearchList';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const SearchList = ({ dataDetail }: IParams) => {
  const { t } = useTranslation();
  const { creator, ratings, type, discount, stock, listprice } = dataDetail;
  const styleStock = stock === 0 ? 'last:text-red-400' : 'last:text-green-400';

  return (
    <div className="grid grid-cols-2 w-screen mb-2 border border-slate-200 rounded-sm sm:gap-1.5">
      <div className="p-1 lg:h-60 lg:w-48">
        <img
          className="object-cover item-center rounded-sm"
          src={dataDetail.image}
          alt=""
        />
      </div>
      <div className="col-span-1 p-1 ml-1">
        <div className="text-sm lg:w-full h-fit grid grid-cols-1">
          <h3 className="w-24">{dataDetail.title}</h3>
          <div className="flex flex-col h-12 gap-0.5 sm:h-24 sm:gap-1.5">
            <span className="flex text-yellow-500 text-sm sm:text-base sm:font-bold">
              <button className="h-5 w-5 flex border-none items-center justify-center text-white bg-orange-300 rounded-r-sm rounded-tl-sm">
                {ratings}
              </button>
              {ratings > 4 ? '★★★★☆' : '★★★☆☆'}
            </span>
            <div className="flex justify-left text-sm text-slate-600 sm:text-base items-center">
              <FontAwesomeIcon icon={faTag} />
              {t(`Type.${type}`)}
            </div>
          </div>
          <div className="border-slate-200 pt-2 pr-1 text-xs sm:text-base">
            <h3>
              {creator && t('Author', { ns: 'searchResult' }) + ': ' + creator}
            </h3>
            <div className="mt-1 text-gray-500">
              <b className={styleStock}>
                {`${t('Stock', { ns: 'searchResult' })} : `}{' '}
                {stock === 0 ? t('Unavailible', { ns: 'searchResult' }) : stock}
              </b>
            </div>
          </div>
        </div>
        <div className="mt-2 flex justify-start items-end">
          <div className="text-sm">
            <span className="flex justify-start text-xs sm:text-base font-medium">
              {Math.floor((listprice * (100 - discount)) / 100)} TWD
            </span>
            <Link to={`/mobile/products/${dataDetail.gtin}`}>
              <button className="w-20 text-xs sm:text-base md:w-28 text-white text-center border-none bg-[#FF8E04] rounded cursor-pointer hover:bg-red-400">
                {t('CheckDetail', { ns: 'searchResult' })}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchList;
