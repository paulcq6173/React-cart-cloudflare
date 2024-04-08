import { userLogin } from '@/reducers/loginSlice';
import { useEffect } from 'react';
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
    <div className="w-full h-fit flex flex-col justify-center">
      <RoutesLayout />
    </div>
  );
}

export default App;
