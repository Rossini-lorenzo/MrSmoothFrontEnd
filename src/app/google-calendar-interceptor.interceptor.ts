import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const googleCalendarInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const router = inject(Router);

  if (req.url.includes('/googleCalendar')) {
    console.log('Intercepted request to Google Calendar:', req.url);

    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Controlla se l'errore è un errore 401 all'interno del corpo dell'errore
        if (error.status === 500 && error.error && error.error.includes('401 Unauthorized')) {
          console.log('Unauthorized request detected in error body. Redirecting to login.');
          localStorage.removeItem('googleAuthCode');
          router.navigate(['/smart-control/appointment-calendar']);
        } else if (error.status === 401) {
          // Se l'errore è direttamente 401, gestiscilo
           localStorage.removeItem('googleAuthCode');
          console.log('Unauthorized request. Redirecting to login.');
          router.navigate(['/smart-control/appointment-calendar']);
        } else if (error.status === 403) {
          localStorage.removeItem('googleAuthCode');
          console.error('Access forbidden:', error.message);
          router.navigate(['/smart-control/appointment-calendar']);

        }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};
