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
  const message = loc.state?.message;

  if (loc.state) {
    if (loc.state.success) {
      dispatch(setMessage({ message: t(`${message}`), success: true }));
    } else {
      dispatch(setMessage({ message, success: false }));
    }
    setTimeout(() => {
      dispatch(resetMessage());
    }, 5000);
  }

  return (
    <div>
      <TopNaviBar />
      <LoginForm />
    </div>
  );
};

export default Login;
