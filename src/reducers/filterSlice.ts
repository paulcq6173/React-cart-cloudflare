import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

type TOptions = {
  category: string | undefined;
};

interface IState {
  keyword?: string | undefined;
  options?: TOptions | undefined;
}

const initialState: IState = {
  keyword: '',
  options: {
    category: 'All',
  },
};

const filterSlice = createSlice({
  name: 'searchFilter',
  initialState,
  reducers: {
    setKeyword(state, action: PayloadAction<string>) {
      const keyword = action.payload;
      return { ...state, keyword: keyword };
    },
    setOption(state, action: PayloadAction<IState>) {
      const { options } = action.payload;
      return { ...state, options: options };
    },
    resetAll: () => initialState,
  },
});

export const { setKeyword, setOption, resetAll } = filterSlice.actions;
export const selectKeyword = (state: RootState) => state.searchFilter.keyword;
export const selectCategory = (state: RootState) =>
  state.searchFilter.options?.category;
export default filterSlice.reducer;
