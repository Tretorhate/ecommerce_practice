import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, shareReplay } from 'rxjs';
import { Profile } from '../../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/users/profile';

  private readonly profileLoaded$ = new BehaviorSubject<boolean>(false);
  private readonly profile$ = new BehaviorSubject<Profile | null>(null);

  // Cache the profile request to avoid multiple API calls
  private profileRequest$: Observable<Profile> | null = null;

  getProfile(): Observable<Profile> {
    // If we don't have a cached request, create one
    if (!this.profileRequest$) {
      this.profileRequest$ = this.http.get<Profile>(this.apiUrl).pipe(
        tap((profile) => {
          this.profile$.next(profile);
          this.profileLoaded$.next(true);
        }),
        shareReplay(1) // Cache the result and share it with multiple subscribers
      );
    }

    return this.profileRequest$;
  }

  // Force refresh the profile data
  refreshProfile(): Observable<Profile> {
    this.profileRequest$ = null; // Clear cache
    return this.getProfile();
  }

  updateField(field: 'name' | 'email', value: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}`, { [field]: value }).pipe(
      tap(() => {
        // Refresh profile after update
        this.refreshProfile().subscribe();
      })
    );
  }

  updatePicture(newPictureUrl: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}`, { picture: newPictureUrl }).pipe(
      tap(() => {
        // Refresh profile after update
        this.refreshProfile().subscribe();
      })
    );
  }

  getProfileStream(): Observable<Profile | null> {
    return this.profile$.asObservable();
  }

  isProfileLoaded(): Observable<boolean> {
    return this.profileLoaded$.asObservable();
  }

  // Get current profile value (synchronous)
  getCurrentProfile(): Profile | null {
    return this.profile$.value;
  }

  // Clear cache (useful for logout)
  clearCache(): void {
    this.profileRequest$ = null;
    this.profile$.next(null);
    this.profileLoaded$.next(false);
  }
}
