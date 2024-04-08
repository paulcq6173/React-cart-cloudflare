import Notification from '@/components/Notification';
import MobileTopNavBar from '@/mobile/components/MobileTopNav';
import { ICartState, selectCart } from '@/reducers/cartSlice';
import { selectUser } from '@/reducers/loginSlice';
import { resetMessage, setMessage } from '@/reducers/notifySlice';
import { useAppDispatch, useAppSelector } from '@/reducers/reduxHooks';
import orderService from '@/services/orderService';
import { IOrderData } from '@/utils/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, redirect, useNavigate } from 'react-router-dom';
import MobileCartItem from '../components/sub-components/MobileCartItem';

const PriceCalculator = (items: ICartState[]) => {
  return items.reduce(
    (count, item) => (count = count + item.quantity * item.price),
    0
  );
};

/**
 * Shopping Cart process.
 *
 */
const MobileCart = () => {
  const { t } = useTranslation();
  const cart = useAppSelector(selectCart);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const uuid = user?.userId;
  const totalPrice = PriceCalculator(cart);

  /** build order */
  // Avoid auto actived when rendering components.
  const [active, setActive] = useState(false);
  // orderData - storing props that order required.
  const [orderData, setOrderData] = useState<IOrderData>({
    userId: uuid,
    purchaseItems: [],
    totalPrice: totalPrice,
    status: 'pending',
    options: [
      { creditCard: true, giftCardPoint: 0, delivery: 'free delivery' },
    ],
    note: '',
  });

  if (!user) {
    redirect('/mobile/login');
    return;
  }

  const SubTotal = () => {
    let count: number = 0;
    cart.forEach((e) => (count += e.quantity));

    let stringItem = `${count} ${t('Item', { ns: 'cart' })}`;
    if (count > 1) {
      stringItem = `${count} ${t('Items', { ns: 'cart' })}`;
    }

    return (
      <div>
        {t('SubTotal', { ns: 'cart' })} ({stringItem}) : {totalPrice} TWD
      </div>
    );
  };

  /** Check If anything out of stock or doesn't exist */
  //const { data, error } = ItemStatus(itemArr);

  const handleSubmit = async () => {
    if (active) {
      return;
    }
    const itemArr = cart.map((e) => {
      return {
        gtin: e.gtin,
        name: e.name,
        quantity: e.quantity,
      };
    });

    try {
      if (user) {
        setOrderData((item) => ({ ...item, purchaseItems: itemArr }));

        if (window.confirm(t('CheckoutConfirm', { ns: 'cart' }))) {
          setActive(true);
          const data = await orderService.create(orderData);

          if (data.status === 200) {
            dispatch(
              setMessage({ message: t('OrderSuccess', { ns: 'cart' }) })
            );
            setTimeout(() => {
              resetMessage();
            }, 3000);

            setTimeout(() => navigator('/mobile'), 5000);
          } else {
            const { message } = data;
            dispatch(setMessage({ message, success: false }));
            setTimeout(() => {
              resetMessage();
            }, 5000);
          }

          // Update stock must be after order be created.
          //setStockData(data, userID);
          //console.log('setting stock data...');
        }
      } else {
        dispatch(
          setMessage({
            message: t('Error.UserNotFound', { ns: 'cart' }),
            success: false,
          })
        );
        setTimeout(() => {
          resetMessage();
        }, 5000);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(t('Error.UploadFailed', { ns: 'cart' }));
      } else {
        console.error(t('Error.Unexpected', { ns: 'cart' }), err);
      }
    }
  };

  return (
    <div className="w-screen bg-gray-200">
      <MobileTopNavBar />
      <div className="w-11/12 m-auto border border-black rounded-md bg-yellow-100">
        <span className="text-sm sm:text-base">
          <h1 className="text-base sm:text-xl font-bold">Message</h1>
          Dear customer, we're appreciated that you choose our site.
          <br />
          If you have any questions, please use help service.
        </span>
        <Notification />
      </div>
      <div className="w-screen p-1 flex flex-col">
        <div className="font-bold align-center">
          <h3>{t('MyShoppingCart', { ns: 'cart' })}</h3>
          <hr />
        </div>
        {cart.length === 0 ? (
          <div>{t('EmptyCart', { ns: 'cart' })}</div>
        ) : (
          cart.map((item, index) => <MobileCartItem key={index} obj={item} />)
        )}
        <hr className="w-11/12" />
        <div className="w-screen grid grid-cols-1 mt-1">
          <SubTotal />
          <div className="flex space-x-2">
            <button
              type="submit"
              className="w-20 text-sm sm:w-24 sm:text-base border border-amber-600 rounded-md bg-amber-400 cursor-pointer hover:text-amber-400 hover:bg-yellow-200 disabled:cursor-not-allowed disabled:text-gray-600 disabled:bg-yellow-200"
              onClick={handleSubmit}
              disabled={cart.length === 0 || active}
            >
              {t('CheckOut')}
            </button>
            <Link
              className="w-28 text-sm sm:w-36 sm:text-base border border-amber-600 rounded-md text-center bg-amber-400 cursor-pointer hover:text-amber-400 hover:bg-yellow-200"
              to="/mobile/products/search"
            >
              {t('GoShopping', { ns: 'cart' })}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileCart;
