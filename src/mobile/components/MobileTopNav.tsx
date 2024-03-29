import Collapsible from '@/mobile/components/Collapsible';
import { selectUser, userLogout } from '@/reducers/loginSlice';
import { useAppDispatch, useAppSelector } from '@/reducers/reduxHooks';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const TopNav = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleLogOut = () => {
    localStorage.removeItem('cartItems');
    localStorage.removeItem('loggedUser');
    dispatch(userLogout());
  };

  const WithLoginButton = () => {
    if (user) {
      return (
        <div className="w-30 flex items-center">
          <button
            className="w-14 border-none rounded text-sm text-white text-center hover:bg-lime-400 rounded"
            onClick={handleLogOut}
          >
            {t('LogOut')}
          </button>
        </div>
      );
    }

    return (
      <div className="w-30 flex space-x-1 items-center gap-0.5 sm:gap-1">
        <Link
          className="w-14 border border-green-600 rounded-sm text-sm text-white text-center hover:bg-lime-400"
          to="/mobile/register"
        >
          {t('Register')}
        </Link>
        <Link
          className="w-12 border border-green-600 rounded-sm text-sm text-white text-center hover:bg-lime-400"
          to="/mobile/login"
        >
          {t('LogIn')}
        </Link>
      </div>
    );
  };

  return (
    <div className="w-screen z-0 bg-teal-800">
      <div className="w-full flex h-8 space-x-1 justify-center items-center sm:gap-1">
        <Link
          className="w-10 h-6 flex items-center text-white border-2 border-transparent rounded-sm hover:border-white"
          to="/mobile"
        >
          <img className="w-8 h-5" src="/images/EmeraldGardenBanner.png" />
        </Link>
        <WithLoginButton />
        <Collapsible>
          <Link
            className="block h-5 sm:h-8 text-white text-sm sm:text-xl bg-teal-700 no-underline hover:bg-orange-400"
            to="/mobile"
          >
            {t('Home')}
          </Link>
          <Link
            className="block text-white text-sm bg-teal-400 no-underline text-base hover:bg-orange-400"
            to="/mobile"
          >
            {t('PopularItem')}
          </Link>
          <Link
            className="block text-white text-sm bg-teal-400 no-underline text-base hover:bg-orange-400"
            to="/mobile"
          >
            {t('Contact')}
          </Link>
          <Link
            className="block text-white text-sm bg-teal-400 no-underline text-base hover:bg-orange-400"
            to="/"
          >
            {t('ToPCHome')}
          </Link>
        </Collapsible>
      </div>
      <div className="flex gap-0.5 justify-center">
        <span className="w-screen ml-1 mr-1 flex justify-center">
          <input
            className="w-40 sm:w-48 md:w-2/3 outline-none border-2 border-transparent rounded-sm focus:border-orange-600"
            placeholder="keyword"
          />
          <Link
            to="/mobile/products/search"
            className="w-5 flex items-center rounded-sm text-white bg-orange-400"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>
        </span>
      </div>
      <div className="flex justify-start text-sm text-white bg-teal-950">
        <Link to="/mobile/products/search">Hot</Link>
      </div>
    </div>
  );
};

export default TopNav;
