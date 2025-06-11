import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function BaseUrlInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const baseUrl = 'http://164.90.177.76:5000/api';
  const isAbsolute = req.url.startsWith('http');
  const apiReq = isAbsolute ? req : req.clone({ url: `${baseUrl}${req.url}` });
  return next(apiReq);
}
