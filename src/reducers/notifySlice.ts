import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

// Define a type for the slice state
interface INotifyState {
  message: string;
  success?: boolean;
}

const initialState: INotifyState = {
  message: '',
  success: true,
};

const notifySlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(_state, action: PayloadAction<INotifyState>) {
      const { message, success } = action.payload;

      return { message, success };
    },
    resetMessage: () => initialState,
  },
});

export const { setMessage, resetMessage } = notifySlice.actions;
export const selectNotification = (state: RootState) =>
  state.notification.message;
export default notifySlice.reducer;
