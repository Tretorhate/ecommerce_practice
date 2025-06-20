import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CartActions from '../../store/actions/cart.actions';
import * as OrdersActions from '../../store/actions/orders.actions';
import { ProfileService } from './profile/profile.service';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  private store = inject(Store);
  private profileService = inject(ProfileService);

  initializeApp(): Promise<void> {
    return new Promise((resolve) => {
      // Load cart from localStorage into NgRx store
      this.store.dispatch(CartActions.loadCart());

      this.profileService.getProfile().subscribe({
        next: (profile) => {
          // Load orders from profile into NgRx store
          if (profile.orders && profile.orders.length > 0) {
            this.store.dispatch(
              OrdersActions.loadOrdersSuccess({ orders: profile.orders })
            );
          }
          resolve();
        },
        error: (error) => {
          // If profile fails to load (user not authenticated), just resolve
          console.log(
            'Profile not loaded (user may not be authenticated):',
            error
          );
          resolve();
        },
      });
    });
  }
}
