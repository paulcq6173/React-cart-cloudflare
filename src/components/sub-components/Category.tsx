import { useTranslation } from 'react-i18next';
import useFetch from '../../hooks/useFetch';
import { CategorySkeleton } from './Skeleton';

interface IDataArrayElement {
  dataArray: {
    id: number;
    genre: string;
    img: string;
  }[];
}

const Category = ({ dataArray }: IDataArrayElement, url: string) => {
  const { t } = useTranslation();
  /** Handle category component skeleton loading */
  const { loading } = useFetch(url);

  return (
    <div className="lg:max-w-5xl w-2/3 flex bg-gray-200 gap-0.5 m-auto overflow-hidden">
      {dataArray.map((item, index) => (
        <div className="flex flex-col space-x-4" key={index}>
          {loading ? (
            <CategorySkeleton />
          ) : (
            <div className="flex ml-4">
              <img
                className="rounded-sm object-cover w-40 h-28"
                src={item.img}
                alt=""
              />
            </div>
          )}
          <div className="flex w-40 h-28 bg-gray-300 mt-2">
            <div className="text-center font-extrabold truncate">
              {t(`${item.genre}`)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
