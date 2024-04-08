import Locales from '@/components/sub-components/dropdown/Locales';
import Collapsible from '@/mobile/components/Collapsible';
import { setOption } from '@/reducers/filterSlice';
import { useAppDispatch } from '@/reducers/reduxHooks';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const MobileCollapsedSideBar = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(setOption({ options: { category: e.currentTarget.value } }));
  };

  return (
    <Collapsible>
      <div className="bg-sky-700">
        <Link
          className="block h-5 sm:h-8 text-white text-sm sm:text-xl no-underline hover:bg-orange-400"
          to="/mobile"
        >
          {t('Home')}
        </Link>
        <Locales />
      </div>
      <p className="w-full bg-teal-700 text-white text-center">Categories</p>
      <Link
        className="block text-center text-black text-sm bg-teal-400 no-underline text-base hover:bg-orange-400"
        to="/mobile/products/search"
      >
        {t('PopularItem')}
      </Link>
      <button
        className="w-full bg-teal-400 hover:bg-orange-400"
        value="Books"
        onClick={handleClick}
      >
        <Link
          className="text-black text-sm no-underline text-base"
          to="/mobile/products/search"
        >
          {t('Books')}
        </Link>
      </button>
      <button
        className="w-full bg-teal-400 hover:bg-orange-400"
        value="Videos"
        onClick={handleClick}
      >
        <Link
          className="text-black text-sm no-underline text-base"
          to="/mobile/products/search"
        >
          {t('Videos')}
        </Link>
      </button>
      <button
        className="w-full bg-teal-400 hover:bg-orange-400"
        value="Games"
        onClick={handleClick}
      >
        <Link
          className="text-black text-sm no-underline text-base"
          to="/mobile/products/search"
        >
          {t('Games')}
        </Link>
      </button>
    </Collapsible>
  );
};

export default MobileCollapsedSideBar;
