import Notification from '@/components/Notification';
import TopNaviBar from '@/components/TopNaviBar';
import CartItem from '@/components/sub-components/CartItem';
import { ICartState, selectCart } from '@/reducers/cartSlice';
import { selectUser } from '@/reducers/loginSlice';
import { resetMessage, setMessage } from '@/reducers/notifySlice';
import { useAppDispatch, useAppSelector } from '@/reducers/reduxHooks';
import orderService from '@/services/orderService';
import { IOrderData } from '@/utils/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

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
const Cart = () => {
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
    navigator('/login');
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
            dispatch(setMessage({ message: t('OrderSuccess') }));
            setTimeout(() => {
              resetMessage();
            }, 3000);

            setTimeout(() => navigator('/'), 5000);
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
    <div className="bg-gray-200">
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
      <div className="w-[1080px] m-auto flex flex-col">
        <div className="align-center">
          <h3>{t('MyShoppingCart', { ns: 'cart' })}</h3>
          <hr />
        </div>
        <div className="w-[800px] gap-1">
          {cart.length === 0 ? (
            <div>{t('EmptyCart', { ns: 'cart' })}</div>
          ) : (
            cart.map((item, index) => <CartItem key={index} obj={item} />)
          )}
          <hr />
          <div className="flex justify-between mt-1">
            <button
              type="submit"
              className="w-28 border border-amber-600 rounded-md bg-amber-400 cursor-pointer hover:text-amber-400 hover:bg-yellow-200 disabled:cursor-not-allowed disabled:text-gray-600 disabled:bg-yellow-200"
              onClick={handleSubmit}
              disabled={cart.length === 0 || active}
            >
              {t('CheckOut')}
            </button>
            <Link
              type="submit"
              className="w-28 border border-amber-600 rounded-md text-center bg-amber-400 cursor-pointer hover:text-amber-400 hover:bg-yellow-200"
              to="/products/search"
            >
              {t('GoShopping', { ns: 'cart' })}
            </Link>
            <SubTotal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
