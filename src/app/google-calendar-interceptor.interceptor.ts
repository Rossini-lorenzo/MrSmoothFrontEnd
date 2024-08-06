import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class GoogleCalendarInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Intercetta solo le richieste che vanno verso il controller di Google Calendar
    if (req.url.startsWith('/googleCalendar')) {
      // Puoi aggiungere logica specifica qui se necessario
      console.log('Intercepted request to Google Calendar:', req.url);

      // Esegui la richiesta senza modifiche
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          this.handleError(error);
          return throwError(error);
        })
      );
    }

    // Passa la richiesta senza modifiche se non è diretta al controller di Google Calendar
    return next.handle(req);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      // Gestisci l'errore 401, ad esempio reindirizzando l'utente al login
      this.router.navigate(['/login']);
    } else if (error.status === 403) {
      // Gestisci l'errore 403 se necessario
      console.error('Access forbidden:', error.message);
    }
    // Altri codici di errore possono essere gestiti qui
  }
}
