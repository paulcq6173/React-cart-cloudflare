import TopNaviBar from '@/components/TopNaviBar';
import LoginForm from '@/components/forms/LoginForm';
import { resetMessage, setMessage } from '@/reducers/notifySlice';
import { useAppDispatch } from '@/reducers/reduxHooks';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const loc = useLocation();

  if (loc.state) {
    if (loc.state?.success) {
      dispatch(setMessage({ message: t('RegisterSuccess') }));
    } else {
      const message = loc.state?.message;
      dispatch(setMessage({ message, success: false }));
    }
    setTimeout(() => {
      dispatch(resetMessage());
    }, 5000);
  }

  return (
    <div className="loginContainer">
      <TopNaviBar />
      <div className="w-full lg:max-w-5xl flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
