import useLogin from '@/hooks/useLogin';
import { userLogin } from '@/reducers/loginSlice';
import { resetMessage, setMessage } from '@/reducers/notifySlice';
import { useAppDispatch } from '@/reducers/reduxHooks';
import authService from '@/services/authService';
import errorHelper from '@/utils/errorHelper';
import localStorageHelper from '@/utils/localStorageHelper';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../Notification';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginHook = useLogin();
  const { t } = useTranslation();

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await authService.login(loginHook.logindata);

      switch (response.status) {
        case 400:
        case 404:
        case 409:
        case 500:
          dispatch(
            setMessage({
              message: t(`Error.${response.message}`),
              success: false,
            })
          );
          setTimeout(() => {
            dispatch(resetMessage());
          }, 5000);
          return;
      }

      localStorageHelper.saveUser(response);
      dispatch(userLogin(response));

      loginHook.onReset();

      navigate('/');
    } catch (error: unknown) {
      const { message } = errorHelper(error);
      dispatch(setMessage({ message, success: false }));
      setTimeout(() => {
        dispatch(resetMessage());
      }, 5000);
    }
  };

  return (
    <form onSubmit={submitLogin}>
      <div className="w-96 mt-8 p-2.5 border border-solid border-gray-600 rounded-sm bg-gray-50">
        <h3 className="mb-2 p-0 text-center text-xl font-bold">
          {t('LoginTitle')}
        </h3>
        <div className="flex flex-col border-none gap-3.5">
          <input
            className="border border-slate-400 shadow-inner focus:border-sky-200 focus:shadow-sky-100"
            id="account"
            placeholder={t('PH.ACC')}
            {...loginHook}
          />
          <input
            className="border border-slate-400 shadow-inner focus:border-sky-200 focus:shadow-sky-100"
            id="password"
            placeholder={t('PH.PW')}
            {...loginHook}
          />
          <button className="border-none rounded-sm text-[#fafad2] bg-orange-400 cursor-pointer hover:text-white hover:bg-amber-500">
            {t('LoginBTN')}
          </button>
          <span>{t('ForgotPWTip')}</span>
          <Link
            to="/register"
            className="no-underline text-inherit hover:text-sky-300"
          >
            <span>{t('RegisterTip')}</span>
          </Link>
          <Notification />
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
