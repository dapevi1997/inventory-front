import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(request.url === environment.authUrl +  "api/v1/auth/login"){
      return next.handle(request);
    }

    const modifiedRequest = request.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + this.getToken()
      }
    });

    return next.handle(modifiedRequest);
  }

  private getToken(): string | null{
    return localStorage.getItem("token");
  }
}
