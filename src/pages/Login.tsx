import TopNaviBar from '@/components/TopNaviBar';
import LoginForm from '@/components/forms/LoginForm';
import { resetMessage, setMessage } from '@/reducers/notifySlice';
import { useAppDispatch } from '@/reducers/reduxHooks';
import { useLocation } from 'react-router-dom';

const Login = () => {
  const dispatch = useAppDispatch();
  const loc = useLocation();

  if (loc.state) {
    const mes = loc.state?.message;
    if (loc.state?.success) {
      dispatch(setMessage({ message: mes }));
    }
    dispatch(setMessage({ message: mes, success: false }));
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
