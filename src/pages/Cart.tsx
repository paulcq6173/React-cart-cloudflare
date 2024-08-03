import Notification from '@/components/Notification';
import TopNaviBar from '@/components/TopNaviBar';
import CartForm from '@/components/forms/CartForm';
import { selectUser } from '@/reducers/loginSlice';
import { useAppSelector } from '@/reducers/reduxHooks';
import { redirect } from 'react-router-dom';

/**
 * Shopping Cart process.
 *
 */
const Cart = () => {
  const user = useAppSelector(selectUser);

  if (!user) {
    redirect('/login');
    return;
  }

  return (
    <div className="h-dvh bg-gray-200">
      <TopNaviBar />
      <div className="w-[1080px] pt-0 pr-1.5 m-auto border border-gray-200 rounded-md bg-yellow-100">
        <span>
          <h1 className="font-extrabold">Message</h1>
          Dear customer, we're appreciated that you choose our site.
          <br />
          If you have any questions, please use help service.
        </span>
        <Notification />
      </div>
      <CartForm user={user} />
    </div>
  );
};

export default Cart;
