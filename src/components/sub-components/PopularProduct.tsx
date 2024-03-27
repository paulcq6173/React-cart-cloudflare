import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PopularItemSkeleton } from './Skeleton';

interface IParams {
  dataArray: {
    gtin: string;
    title: string;
    listprice: number;
    ratings: number;
    comments: number;
    image: string;
  }[];
  loading: boolean;
}

const PopularProduct = ({ dataArray, loading }: IParams) => {
  const { t } = useTranslation();

  return (
    <div className="lg:max-w-5xl w-2/3 flex bg-gray-100 overflow-scroll m-auto">
      {loading ? (
        <PopularItemSkeleton length={4} />
      ) : (
        <div className="flex space-x-2 justify-center bg-white">
          {dataArray.map((item, index: number) => (
            <Link
              className="no-underline text-inherit"
              to={`/products/${item.gtin}`}
              key={index}
            >
              <div className="w-44">
                <img src={item.image} alt="" className="w-40 h-48" />
                <div className="text-base w-40 mb-0.5">
                  <div className="title">{t(`${item.title}`)}</div>
                  <div className="font-medium top-2 right-0">
                    {item.listprice.toLocaleString()} NTD
                  </div>
                  <div className="flex text-center">
                    <button className="flex justify-center text-sm font-bold text-white w-5 h-5 border-none rounded-sm bg-lime-900">
                      {item.ratings}
                    </button>
                    <span className="text-sm text-black">
                      {t(`${item.ratings >= 4.3 ? 'Great' : 'Nice'}`)}
                    </span>
                    <p className="text-xs text-gray-400">
                      {item.comments.toLocaleString()}
                      {t('Discussion')}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularProduct;
