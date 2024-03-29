import localStorageHelper from '@/utils/localStorageHelper';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export type TUser = {
  userId: string;
  username: string;
  token: string;
};

// Define a type for the slice state
interface IUserState {
  user: TUser | null;
}

const initialValue: IUserState = {
  user: null,
};
const initialState: IUserState =
  localStorageHelper.loadStorage('loggedUser') ?? initialValue;

const loginSlice = createSlice({
  name: 'login', // combination reducer name
  initialState,
  reducers: {
    userLogin(state, action: PayloadAction<TUser>) {
      return { ...state, user: action.payload };
    },
    userLogout: () => initialValue,
  },
});

export const { userLogin, userLogout } = loginSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.login.user;
export default loginSlice.reducer;
