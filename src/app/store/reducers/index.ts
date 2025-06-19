import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { userReducer } from './user.reducer';
import { profileReducer } from './profile.reducer';
import { productsReducer } from './products.reducer';
import { cartReducer } from './cart.reducer';
import { ordersReducer } from './orders.reducer';
import { reviewsReducer } from './reviews.reducer';
import { routerReducer } from '@ngrx/router-store';

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  user: userReducer,
  profile: profileReducer,
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  reviews: reviewsReducer,
};
