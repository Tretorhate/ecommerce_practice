import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Profile } from '../../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/users/profile';


  private readonly profileLoaded$ = new BehaviorSubject<boolean>(false);


  private readonly profile$ = new BehaviorSubject<Profile | null>(null);

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.apiUrl).pipe(
      tap((profile) => {
        this.profile$.next(profile);
        this.profileLoaded$.next(true);
      })
    );
  }

  updateField(field: 'name' | 'email', value: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}`, { [field]: value }).pipe(
      tap(() => {
      
        this.getProfile().subscribe(); 
      })
    );
  }
updatePicture(newPictureUrl: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}`, { picture: newPictureUrl }).pipe(
      tap(() => {
    
        this.getProfile().subscribe();
      })
    );
  }

  getProfileStream(): Observable<Profile | null> {
    return this.profile$.asObservable();
  }

  isProfileLoaded(): Observable<boolean> {
    return this.profileLoaded$.asObservable();
  }
}
