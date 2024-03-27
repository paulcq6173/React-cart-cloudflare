import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import filterSlice from './filterSlice';
import loginSlice from './loginSlice';
import notifySlice from './notifySlice';

/**
 * Redux toolkit configuration.
 *
 * Refers https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks
 */
export const store = configureStore({
  reducer: {
    login: loginSlice,
    searchFilter: filterSlice,
    notification: notifySlice,
    cart: cartSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
