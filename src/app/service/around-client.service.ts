import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AroundClientService {
  constructor(private httpClient: HttpClient) {}

  //backendUrl: string = 'https://mrsmooth-9e8bb3d010e3.herokuapp.com/';
  apiUrl = `${environment.apiBaseUrl}/`;

  public userRegister(request: any) {
    console.log('STO IN USER REG');
    return this.httpClient
      .post<string>(this.apiUrl + 'products/new', request, {
        responseType: 'text' as 'json',
      })
      .pipe(
        catchError((error) => {
          if (error.status === 400) {
            alert('Utente già registrato');
          }
          throw error;
        })
      );
  }
  public promoteRegister(request: any) {
    console.log('STO IN USER REG');
    return this.httpClient
      .post<string>(this.apiUrl + 'products/newPromote', request, {
        responseType: 'text' as 'json',
      })
      .pipe(
        catchError((error) => {
          if (error.status === 400) {
            alert('Utente già registrato');
          }
          throw error;
        })
      );
  }

  public generateToken(request: any) {
    return this.httpClient
      .post<string>(this.apiUrl + 'products/authenticate', request, {
        responseType: 'text' as 'json',
      })
      .pipe(
        catchError((error) => {
          if (error.status === 403) {
            alert('Credenziali non valide');
          }
          throw error;
        })
      );
  }

  public welcome(token: any, role: any, id: any,piva:any,companyName:any,googleAccessToken:any) {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('piva', piva);
    localStorage.setItem('id', id);
    localStorage.setItem('companyName', companyName);
    localStorage.setItem('googleAccessToken',googleAccessToken); 



    console.log(localStorage.getItem("piva"));
    return this.httpClient.get<string>(this.apiUrl + 'products/welcome', {
      headers,
      responseType: 'text' as 'json',
    });
  }

   isLoggedIn ():  boolean {
    // check if token is present in local storage

    const token  = localStorage.getItem('token') ;
    return token!== null&&token!=='';
  }

  logout() {
    // remove token from local storage

    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('piva');
    localStorage.removeItem('id');
    localStorage.removeItem('companyName');
    localStorage.removeItem('googleAccessToken'); // Rimuovi anche il token di Google


  }


  
}
