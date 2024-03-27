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

const initialState: ICartState[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    createCart(state, action: PayloadAction<ICartState>) {
      return state.concat(action.payload);
    },
    updateCart(state, action: PayloadAction<ICartState>) {
      const itemToAdd = action.payload;
      const foundItem = state.find((e) => e.gtin === itemToAdd.gtin);
      if (foundItem) {
        return state.map((e) => (e.gtin === foundItem.gtin ? itemToAdd : e));
      }
      return state.concat(action.payload);
    },
    deleteItem(state, action: PayloadAction<string>) {
      const gtin = action.payload;
      return state.filter((item) => item.gtin !== gtin);
    },
    resetCart() {
      return initialState;
    },
  },
});

export const { createCart, updateCart, deleteItem, resetCart } =
  cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export default cartSlice.reducer;
