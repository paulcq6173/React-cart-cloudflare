import MobileSearchBar from '@/mobile/components/sub-components/MobileSearchBar';
import { selectUser, userLogout } from '@/reducers/loginSlice';
import { useAppDispatch, useAppSelector } from '@/reducers/reduxHooks';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import MobileCollapsedSideBar from './sub-components/MobileCollapsedSideBar';

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
        <MobileCollapsedSideBar />
      </div>
      <MobileSearchBar />
      <div className="flex justify-start text-sm text-white bg-teal-950">
        <Link to="/mobile/products/search">Hot</Link>
      </div>
    </div>
  );
};

export default TopNav;
