import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UserActions from '../actions/user.actions';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      mergeMap(({ email, password }) =>
        this.authService.login({ email, password }).pipe(
          map((response) => {
            // Expecting response: { accessToken, user }
            localStorage.setItem('accessToken', response.accessToken);
            return UserActions.loginSuccess({ user: response.user });
          }),
          catchError((error) => of(UserActions.loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.loginSuccess),
        tap(() => {
          this.router.navigate(['/']); // Navigate to home
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logout),
      map(() => {
        this.authService.logout();
        return UserActions.logoutSuccess();
      }),
      catchError((error) => of(UserActions.logoutFailure({ error })))
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.logoutSuccess),
        tap(() => {
          localStorage.removeItem('accessToken'); // Clean up auth token
          this.router.navigate(['/login']); // Navigate to login
        })
      ),
    { dispatch: false }
  );

  checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.checkAuth),
      mergeMap(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          return of(
            UserActions.checkAuthFailure({
              error: { status: 401, statusText: 'No token found' },
            })
          );
        }
        return this.authService.checkAuth().pipe(
          map((user) => UserActions.checkAuthSuccess({ user })),
          catchError((error) => of(UserActions.checkAuthFailure({ error })))
        );
      })
    )
  );
}
