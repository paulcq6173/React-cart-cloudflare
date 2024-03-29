import { IDataArrayElement } from '@/components/sub-components/Category';
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next';

const Category = ({ dataArray }: IDataArrayElement, url: string) => {
  const { t } = useTranslation();
  /** Handle category component skeleton loading */
  const { loading } = useFetch(url);

  return (
    <div className="flex bg-gray-200 gap-0.5 m-auto overflow-scroll">
      {dataArray.map((item, index) => (
        <div className="flex flex-col space-x-1" key={index}>
          {loading ? (
            <div>Loading Now</div>
          ) : (
            <div className="flex ml-1">
              <img className="w-20 h-12 rounded-sm" src={item.img} alt="" />
            </div>
          )}
          <div className="flex w-20 h-12 bg-gray-300 mt-1">
            <div className="text-center text-sm font-bold text-ellipsis">
              {t(`${item.genre}`)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
