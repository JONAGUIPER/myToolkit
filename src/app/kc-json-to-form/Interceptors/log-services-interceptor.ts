import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { retry, catchError, map, finalize, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class LogServicesInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const startTime = Date.now();
    let status: string;
    return next.handle(request)
      .pipe(
        retry(1),
        tap(
          event => {
            status = '';
            if (event instanceof HttpResponse) {
              status = 'correcto';
            }
          },
          error => status = 'fallo'
        ),
        catchError((error: HttpErrorResponse) => {
          return this.logError(error);
        }),
        finalize(() => {
          const elapsedTime = Date.now() - startTime;
          const message = request.method + ' ' + request.urlWithParams + ' ' + status
            + ' en ' + elapsedTime + 'ms';

          this.logDetails(message);
        })
      );
  }
  private logDetails(msg: string) {
    console.log(msg);
  }
  private logError(error: HttpErrorResponse) {
    let errorMessage = 'hhhhh';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
