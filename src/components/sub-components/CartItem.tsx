import { deleteItem, selectCart, updateItemQty } from '@/reducers/cartSlice';
import { resetMessage, setMessage } from '@/reducers/notifySlice';
import { useAppDispatch, useAppSelector } from '@/reducers/reduxHooks';
import productService from '@/services/productService';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface IParams {
  obj: {
    gtin: string;
    name: string;
    photo: string;
    price: number;
    quantity: number;
  };
}

const CartItem = ({ obj }: IParams) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const regex = /^[0-9\b]+$/; // exclude char.
  const { gtin, price } = obj;
  let stock = 0;
  productService.getProductById(gtin).then((data) => {
    if (data) {
      stock = data.stock;
    }
  });
  // Because 1.0 + 1.0 + 1.0 !== 3.0
  const itemPrice = Math.floor(price);
  const foundItem = cart.find((e) => e.gtin === gtin);
  // useState will cause referanceError due to loaded before initialization
  let qty: number = foundItem?.quantity ? foundItem.quantity : 1;

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value !== '' || regex.test(value)) {
      qty = Number(value);
    }
  };

  const handleEditQTY = (e: React.FormEvent) => {
    e.preventDefault();
    if (foundItem) {
      if (qty <= stock) {
        dispatch(updateItemQty({ ...foundItem, quantity: qty }));
      } else {
        qty = stock;
        const message = t('Error.SryNoEnoughStock', { ns: 'cart' });
        dispatch(setMessage({ message, success: false }));
        setTimeout(() => {
          dispatch(resetMessage());
        }, 5000);
      }
    } else {
      const message = t('Error.SryItemNotExist', { ns: 'cart' });
      dispatch(setMessage({ message, success: false }));
      setTimeout(() => {
        dispatch(resetMessage());
      }, 5000);
    }
  };

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    if (foundItem) {
      dispatch(deleteItem(gtin));
    } else {
      const message = t('Error.SryItemNotExist', { ns: 'cart' });
      dispatch(setMessage({ message, success: false }));
      setTimeout(() => {
        dispatch(resetMessage());
      }, 5000);
    }
  };

  return (
    <div className="flex rounded-md bg-white">
      {foundItem && (
        <div>
          <img className="h-48 w-36 p-[5px]" src={obj.photo} alt="" />
          <div className="flex flex-col">
            <div className="infoTitle">{obj.name}</div>
            <div className="block">
              <span className="justify-left">$ {itemPrice} TWD</span>
              <div className="flex gap-1.5">
                <input
                  type="number"
                  min="1"
                  className="w-24 border-1 border-black rounded-sm"
                  placeholder={String(qty)}
                  onChange={handleQtyChange}
                />
                <button
                  className="w-20 border-none rounded-sm bg-[#ff7f50] cursor-pointer hover:text-white hover:bg-red-400"
                  onClick={handleEditQTY}
                >
                  {t('Update', { ns: 'cart' })}
                </button>
                <button
                  className="w-20 border-none rounded-sm bg-[#ff7f50] cursor-pointer hover:text-white hover:bg-red-400"
                  onClick={handleDelete}
                >
                  {t('Delete', { ns: 'cart' })}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
