import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, Observable, EMPTY, of } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private route: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,

          console.error(
            `Backend returned code ${
              error.status
            }, body was:--- ${JSON.stringify(error.error)}---`
          );
          if (error.status == 0) {
            this.route.navigate(['maintain']);
          } else {
            Swal.fire(JSON.stringify(error.error));
          }
        }
        // If you want to return a new response:
        // return of(
        //   new HttpResponse({
        //     body: {
        //       statusCode: error.status,
        //       message: error.error,
        //     },
        //   })
        // );

        // If you want to return the error on the upper level:
        //return throwError(error);

        // or just return nothing:
        return EMPTY;
      })
    );
  }
}
