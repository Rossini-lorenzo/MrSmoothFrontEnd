import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  if (token && authService.isTokenExpired(token)) {
    authService.logout();
    router.navigate(['/login']);
    const alertElement = document.getElementById('expiredAlert');
    if (alertElement) {
      alertElement.style.display = 'block'; // Rende l'elemento visibile
      alertElement.style.opacity = '1'; // Assicurati che l'elemento sia completamente visibile

    }  
  }

  const authReq = token ? req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  }) : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
        const alertElement = document.getElementById('expiredAlert');

        if (alertElement) {
          alertElement.style.display = 'block'; // Rende l'elemento visibile
          alertElement.style.opacity = '1'; // Assicurati che l'elemento sia completamente visibile
    
        }      }
      return throwError(error);
    })
  );
};
