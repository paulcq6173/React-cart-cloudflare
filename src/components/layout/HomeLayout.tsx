import Category from '@/components/sub-components/Category';
import PopularProduct from '@/components/sub-components/PopularProduct';
import { CategoriesGenres } from '@/dummyData';
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next';

const HomeLayout = () => {
  const { t } = useTranslation();
  const { data, loading } = useFetch('/api/products/popularItem');

  return (
    <div className="flex flex-col">
      <div>
        <div className="lg:max-w-5xl bg-[#ff9966] m-auto w-2/3 flex flex-col justify-center">
          <h2 className="text-2xl font-bold">{t('PromotionTitle')}</h2>
        </div>
        <div className="listItems">
          <Category dataArray={CategoriesGenres} />
        </div>
        <div className="lg:max-w-5xl bg-[#ff9966] w-2/3 m-auto">
          <h2 className="text-2xl font-bold">{t('PopularProductTitle')}</h2>
        </div>
        <div className="listItems">
          <PopularProduct dataArray={data} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
