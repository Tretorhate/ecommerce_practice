import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export const baseUrl = 'https://practiceapi.mooo.com';
export function baseUrlInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const isAbsolute = req.url.startsWith('http');

  const token = localStorage.getItem('accessToken');

  let modifiedReq = isAbsolute
    ? req.clone()
    : req.clone({ url: `${baseUrl}${req.url}` });

  if (token) {
    modifiedReq = modifiedReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(modifiedReq);
}
