import { CategoriesGenres } from '@/dummyData';
import useFetch from '@/hooks/useFetch';
import Category from '@/mobile/components/sub-components/MobileCategory';
import PopularProduct from '@/mobile/components/sub-components/MobilePopularProduct';
import { useTranslation } from 'react-i18next';

const HomeLayout = () => {
  const { t } = useTranslation();
  const { data, loading } = useFetch('/api/products/popularItem');

  return (
    <div className="w-screen">
      <div className="w-full justify-center">
        <div className="bg-[#ff9966] flex flex-col">
          <h2 className="text-sm sm:text-xl font-bold">
            {t('PromotionTitle')}
          </h2>
        </div>
        <Category dataArray={CategoriesGenres} />
        <PopularProduct dataArray={data} loading={loading} />
      </div>
    </div>
  );
};

export default HomeLayout;
