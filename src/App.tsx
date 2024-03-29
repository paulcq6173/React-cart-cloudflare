import { userLogin } from '@/reducers/loginSlice';
import { useEffect } from 'react';
import Footer from './components/Footer';
import RoutesLayout from './components/layout/RoutesLayout';
import './index.css';
import { useAppDispatch } from './reducers/reduxHooks';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(userLogin(loggedUser));
    }
  }, [dispatch]);

  return (
    <div className="w-full max-w-7xl flex flex-col space-y-4 justify-center">
      <RoutesLayout />
      <Footer />
    </div>
  );
}

export default App;
