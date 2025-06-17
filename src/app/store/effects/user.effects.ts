import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UserActions from '../actions/user.actions';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      mergeMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          mergeMap((user) => [
            UserActions.loginSuccess({ user }),
            // Could add additional actions like:
            // loadUserProfile(),
            // loadUserCart(),
          ]),
          catchError((error) => of(UserActions.loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.loginSuccess),
        tap(({ user }) => {
          localStorage.setItem('token', user.token); // Store auth token
          this.router.navigate(['/']); // Navigate to home
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logout),
      mergeMap(() =>
        this.authService.logout().pipe(
          mergeMap(() => [
            UserActions.logoutSuccess(),
            // Could add additional cleanup actions like:
            // clearUserProfile(),
            // clearUserCart(),
          ]),
          catchError((error) => of(UserActions.logoutFailure({ error })))
        )
      )
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.logoutSuccess),
        tap(() => {
          localStorage.removeItem('token'); // Clean up auth token
          this.router.navigate(['/login']); // Navigate to login
        })
      ),
    { dispatch: false }
  );

  checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      mergeMap(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          return of(
            UserActions.loadUserFailure({
              error: { status: 401, statusText: 'No token found' },
            })
          );
        }
        return this.authService.getCurrentUser().pipe(
          map((user) => UserActions.loadUserSuccess({ user })),
          catchError((error) => of(UserActions.loadUserFailure({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
