import CartItem from '@/components/sub-components/CartItem';
import { ICartState, selectCart } from '@/reducers/cartSlice';
import { TUser } from '@/reducers/loginSlice';
import { resetMessage, setMessage } from '@/reducers/notifySlice';
import { useAppDispatch, useAppSelector } from '@/reducers/reduxHooks';
import orderService from '@/services/orderService';
import { IArrProps, IOrderData } from '@/utils/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

const PriceCalculator = (items: ICartState[]) => {
  return items.reduce(
    (count, item) => (count = count + item.quantity * item.price),
    0
  );
};

const CartForm = ({ user }: { user: TUser }) => {
  const cart = useAppSelector(selectCart);
  const uuid = user?.userId;
  const totalPrice = PriceCalculator(cart);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigator = useNavigate();

  /** build order */
  // Avoid auto actived when rendering components.
  const [active, setActive] = useState(false);
  // orderData - store props that order required.
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

  const handleSubmit = async () => {
    if (active) {
      return;
    }
    const itemArr: IArrProps[] = cart.map((e) => {
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
              setMessage({
                message: t('OrderSuccess', { ns: 'cart' }),
                success: true,
              })
            );
            setTimeout(() => {
              dispatch(resetMessage());
              navigator('/');
            }, 5000);
          } else {
            const { message } = data;
            dispatch(setMessage({ message, success: false }));
            setTimeout(() => {
              dispatch(resetMessage());
            }, 5000);
          }
        }
      } else {
        dispatch(
          setMessage({
            message: t('Error.UserNotFound', { ns: 'cart' }),
            success: false,
          })
        );
        setTimeout(() => {
          dispatch(resetMessage());
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
    <div className="w-[1080px] m-auto flex flex-col">
      <div className="align-center">
        <h3 className="font-bold">{t('MyShoppingCart', { ns: 'cart' })}</h3>
        <hr />
      </div>
      <form>
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
      </form>
    </div>
  );
};

export default CartForm;
