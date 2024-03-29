import localStorageHelper from '@/utils/localStorageHelper';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

// this interface is the actual parameters you are holding in state
export interface ICartState {
  gtin: string;
  name: string;
  photo: string;
  price: number;
  quantity: number;
}

const initialValue: ICartState[] = [];
const initialState: ICartState[] =
  localStorageHelper.loadStorage('cartItems') ?? initialValue;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    createCart(state, action: PayloadAction<ICartState[]>) {
      state = action.payload;
      return state;
    },
    addCartItem(state, action: PayloadAction<ICartState>) {
      return state.concat(action.payload);
    },
    updateItemQty(state, action: PayloadAction<ICartState>) {
      const updateItem = action.payload;
      return state.map((e) => (e.gtin === updateItem.gtin ? updateItem : e));
    },
    deleteItem(state, action: PayloadAction<string>) {
      const gtin = action.payload;
      return state.filter((item) => item.gtin !== gtin);
    },
    resetCart() {
      return initialValue;
    },
  },
});

export const { createCart, addCartItem, updateItemQty, deleteItem, resetCart } =
  cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export default cartSlice.reducer;
