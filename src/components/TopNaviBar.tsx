import { useAppSelector } from '@/reducers/reduxHooks';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser, userLogin, userLogout } from '../reducers/loginSlice';
import SearchBar from './sub-components/SearchBar';
import Locales from './sub-components/dropdown/Locales';

const TopNaviBar = () => {
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);
  const dispatch = useDispatch();

  const WithLoginButton = () => {
    return (
      <div className="w-40 flex space-x-4 items-center">
        <Link
          className="w-20 border-none rounded text-white text-center hover:bg-lime-400 rounded"
          to="/register"
        >
          {t('Register')}
        </Link>
        <Link
          className="w-20 border-none rounded text-white text-center hover:bg-lime-400 rounded"
          to="/login"
        >
          {t('LogIn')}
        </Link>
      </div>
    );
  };

  const CartButton = () => {
    if (!user) {
      return null;
    }

    return (
      <button className="w-24 border-2 border-grey-50 rounded bg-yellow-600 text-white hover:text-amber-600 hover:bg-amber-200">
        <FontAwesomeIcon icon={faCartShopping} />
        <Link to="/cart">{t('CheckOut')}</Link>
      </button>
    );
  };

  const handleLogOut = () => {
    localStorage.removeItem('cartItems');
    localStorage.removeItem('loggedUser');
    dispatch(userLogout());
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      //blogService.setToken(user.token);
      dispatch(userLogin(user));
    }
  }, [dispatch]);

  return (
    <div className="flex space-x-4 bg-teal-800 w-full h-10 items-center">
      <div className="w-1/2 flex space-x-4 justify-end">
        <Link to="/">
          <span className="w-24 flex ml-1 items-center text-white border-2 border-transparent rounded-sm hover:border-white">
            <img className="w-12 h-8" src="/images/EmeraldGardenBanner.png" />
            {t('Home')}
          </span>
        </Link>
        <div className="items-center">
          <SearchBar />
        </div>
      </div>
      <div className="relative flex gap-2.5 w-1/2 justify-start">
        <Locales />
        {user ? (
          <div className="flex space-x-4">
            <span className="border-2 border-teal-800 text-white cursor-pointer hover:rounded-sm hover:border-white">
              {user.username}
            </span>
            <button
              className="w-20 border-none rounded text-white text-center hover:bg-lime-400 rounded"
              onClick={handleLogOut}
            >
              {t('LogOut')}
            </button>
          </div>
        ) : (
          <WithLoginButton />
        )}
        <CartButton />
      </div>
    </div>
  );
};

export default TopNaviBar;
