import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

const prefix = '/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly loggedIn$ = new BehaviorSubject<boolean>(false);

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http
      .post(`${prefix}/login`, credentials, { withCredentials: true })
      .pipe(tap(() => this.loggedIn$.next(true)));
  }

  register(credentials: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http
      .post(`${prefix}/register`, credentials, { withCredentials: true })
      .pipe(tap(() => this.loggedIn$.next(true)));
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/']);
  }

  checkAuth(): Observable<any> {
    return this.http
      .get('/users/profile')
      .pipe(tap(() => this.loggedIn$.next(true)));
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }
}
