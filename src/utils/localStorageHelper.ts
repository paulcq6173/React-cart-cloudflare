import { ICartState } from '@/reducers/cartSlice';
import { TUser } from '@/reducers/loginSlice';

const loadStorage = (key: string) => {
  let foundItem;

  try {
    switch (key) {
      case 'cartItems':
        foundItem = window.localStorage.getItem('cartItems');
        if (!foundItem) {
          return undefined;
        }
        return JSON.parse(foundItem);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    console.error('Unexpected error get caught.', error);
  }
};

const saveUser = (user: TUser) => {
  try {
    window.localStorage.setItem('loggedUser', JSON.stringify(user));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    console.error('Unexpected error get caught.', error);
  }
};

const isCart = (state: unknown): state is ICartState[] =>
  (state as ICartState[]) !== undefined;

const saveStorage = (state: unknown) => {
  try {
    if (isCart(state)) {
      window.localStorage.setItem('cartItems', JSON.stringify(state));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    console.error('Unexpected error get caught.', error);
  }
};

export default { loadStorage, saveUser, saveStorage };
