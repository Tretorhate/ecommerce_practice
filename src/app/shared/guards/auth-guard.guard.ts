import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isLoggedIn().pipe(
    map((loggedIn) => {
      if (loggedIn) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
  );
};

export const authLoginGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.checkAuth().pipe(
    map(() => {
      router.navigate(['/']);
      return false;
    }),
    catchError(() => {
      // If checkAuth fails, user is not logged in
      return of(true);
    }),
  );
};
