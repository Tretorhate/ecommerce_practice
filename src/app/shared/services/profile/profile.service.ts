import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../../models/profile.model';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

 private apiUrl = '/users/profile'; 

  constructor(private http: HttpClient) {}
  
    getProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.apiUrl);
  }

  updateName(name: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}`, { name });
  }

  updateEmail(email: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}`, { email });
  }
}
