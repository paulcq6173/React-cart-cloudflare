import { deleteItem, selectCart, updateCart } from '@/reducers/cartSlice';
import { useAppDispatch, useAppSelector } from '@/reducers/reduxHooks';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IParams {
  obj: {
    gtin: string;
    name: string;
    photo: string;
    price: number;
    quantity: number;
  };
  stock: number;
}

const CartItem = ({ obj, stock }: IParams) => {
  const { t } = useTranslation();
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const [err, setErr] = useState('');
  const regex = /^[0-9\b]+$/; // exclude char.
  const reqGTIN = obj.gtin;
  const foundItem = cart.find((e) => e.gtin === reqGTIN);
  const itemPrice = Math.floor(obj.price);
  let qty: number = foundItem?.quantity ? foundItem.quantity : 1;

  const handleEditQTY = (e: React.FormEvent) => {
    e.preventDefault();
    if (foundItem) {
      if (qty <= stock) {
        setErr('');
        dispatch(updateCart({ ...foundItem, quantity: qty }));
      } else {
        qty = stock;
        setErr(
          `We're sorry, this item stock:${stock} less than you requested quantity.`
        );
      }
    } else {
      setErr("Sorry, item doesn't exist.");
    }
  };
  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    if (foundItem) {
      dispatch(deleteItem(reqGTIN));
    } else {
      setErr("Sorry, the item that you requested to delete doesn't exist.");
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
                  min="0"
                  className="w-24"
                  placeholder={`${qty}`}
                  onChange={(e) => {
                    if (e.target.value === '' || regex.test(e.target.value)) {
                      qty = Number(e.target.value);
                    }
                  }}
                />
                <button
                  className="w-24 border-none rounded-sm bg-[#ff7f50] cursor-pointer hover:text-red-950 hover:bg-red-400"
                  onClick={handleEditQTY}
                >
                  {t('Update')}
                </button>
                <button
                  className="w-24 border-none rounded-sm bg-[#ff7f50] cursor-pointer hover:text-red-950 hover:bg-red-400"
                  onClick={handleDelete}
                >
                  {t('Delete')}
                </button>
              </div>
              {err && <span className="text-red-600">{err}</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
