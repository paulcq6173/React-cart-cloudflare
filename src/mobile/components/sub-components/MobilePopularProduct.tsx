import { IParams } from '@/components/sub-components/PopularProduct';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const PopularProduct = ({ dataArray, loading }: IParams) => {
  const { t } = useTranslation();

  return (
    <div className="w-screen bg-gray-100 overflow-scroll">
      {loading ? (
        <div className="bg-teal-800">Loading Now...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 bg-gray-200 gap-1">
          {dataArray.map((item, index: number) => (
            <Link
              className="no-underline text-inherit"
              to={`/mobile/products/${item.gtin}`}
              key={index}
            >
              <div className="flex bg-white w-11/12 m-auto sm:w-56 sm:h-40">
                <img
                  src={item.image}
                  alt=""
                  className="items-center w-20 h-auto object-fit sm:w-28 sm:h-32"
                />
                <div className="w-28 sm:w-56 mb-0.5">
                  <div className="text-sm sm:text-base">
                    {t(`${item.title}`)}
                  </div>
                  <div className="text-xs sm:text-base top-1 right-0">
                    {`${t('ListPrice')}:`}
                    <p>{`${item.listprice.toLocaleString()} TWD`}</p>
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
