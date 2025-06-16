import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ProfilePictureUploadResponse {
  url: string;
  name: string;
}

export interface UploadProgress {
  progress: number;
  state: 'PENDING' | 'IN_PROGRESS' | 'DONE';
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfilePictureService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://practiceapi.mooo.com/files';

  uploadProfilePicture(userId: string, file: File): Observable<UploadProgress> {
    const formData = new FormData();
    formData.append('files', file, file.name);

    let params = new HttpParams();
    params = params.append('folder', `profile-pictures/${userId}`);

    return this.http.post<ProfilePictureUploadResponse[]>(this.baseUrl, formData, {
      params: params,
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map((event: HttpEvent<ProfilePictureUploadResponse[]>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * (event.loaded / (event.total || 1)));
            return { progress: progress, state: 'IN_PROGRESS' } as UploadProgress;

          case HttpEventType.Response:
            if (event.body && Array.isArray(event.body) && event.body.length > 0) {
              const responseData = event.body[0];
              if (responseData.url) {
                return {
                  progress: 100,
                  state: 'DONE',
                  imageUrl: responseData.url
                } as UploadProgress;
              }
            }
            throw new Error('Invalid server response: no URL found');

          default:
            return { progress: 0, state: 'PENDING' } as UploadProgress;
        }
      })
    );
  }
}