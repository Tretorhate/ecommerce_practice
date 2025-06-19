import { RouterReducerState } from '@ngrx/router-store';
import { UserState } from './user.state';
import { ProfileState } from './profile.state';
import { ProductsState } from './products.state';
import { CartState } from './cart.state';
import { OrdersState } from './orders.state';
import { ReviewsState } from './reviews.state';
import { RouterStateUrl } from './router.state';

export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
  user: UserState;
  profile: ProfileState;
  products: ProductsState;
  cart: CartState;
  orders: OrdersState;
  reviews: ReviewsState;
}

export const initialAppState: AppState = {
  router: {} as RouterReducerState<RouterStateUrl>,
  user: {
    user: null,
    loading: false,
    error: null,
  },
  profile: {
    profile: null,
    loading: false,
    error: null,
  },
  products: {
    products: [],
    loading: false,
    error: null,
  },
  cart: {
    items: [],
    loading: false,
    error: null,
  },
  orders: {
    orders: [],
    loading: false,
    error: null,
  },
  reviews: {
    reviews: [],
    loading: false,
    error: null,
  },
};

export function getInitialState(): AppState {
  return initialAppState;
}
