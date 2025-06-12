import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

 private apiUrl = '/profile'; 

  constructor(private http: HttpClient) {}
  
    getProfile(): Observable<{name: string, email:string, profilePic: string}> {
    return this.http.get<{name: string, email:string, profilePic: string}>(this.apiUrl);
  }

  updateName(name: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}`, { name });
  }

  updateEmail(email: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}`, { email });
  }
}
