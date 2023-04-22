import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../services/client/session.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private sessionService: SessionService, private route: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const urlBase = environment.urlBase;
    console.log('current path :' + this.route.url);

    if (
      this.route.url === '/' ||
      this.route.url.includes('/product/') ||
      this.route.url.includes('/product-name/') ||
      this.route.url.includes('/category/') ||
      '/admin/login' === this.route.url ||
      '/login' === this.route.url ||
      '/register' === this.route.url
    ) {
      if (urlBase + '/customers/logout' == request.url) {
        console.log('token_customer in interceptor: ');
        const token = this.sessionService.sessionIsExpire(
          'customer_information',
          'login'
        ).token;
        const authInfo = 'Bearer ' + token;
        console.log('token_customer in interceptor: ' + token);
        request = request.clone({
          withCredentials: true,
          headers: request.headers.set('Authorization', authInfo),
        });
        return next.handle(request);
      }
      return next.handle(request);
    }
    if (this.route.url.includes('/admin/')) {
      console.log('token_admin in interceptor: ');
      const token = this.sessionService.sessionIsExpire(
        'admin',
        'admin/login'
      ).token;
      const authInfo = 'Bearer ' + token;
      console.log('token_admin in interceptor: ' + token);
      request = request.clone({
        withCredentials: true,
        headers: request.headers.set('Authorization', authInfo),
      });
    } else if (urlBase + '/customers/login' != request.url) {
      console.log('token_customer in interceptor: ');
      const token = this.sessionService.sessionIsExpire(
        'customer_information',
        'login'
      ).token;
      const authInfo = 'Bearer ' + token;
      console.log('token_customer in interceptor: ' + token);
      request = request.clone({
        withCredentials: true,
        headers: request.headers.set('Authorization', authInfo),
      });
    }

    return next.handle(request);
  }
}
