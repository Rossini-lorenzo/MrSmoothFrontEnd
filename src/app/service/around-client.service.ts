import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AroundClientService {

  constructor(private httpClient:HttpClient) { }


  public userRegister(request: any) {
    console.log("STO IN USER REG");
    return this.httpClient.post<string>("http://localhost:8080/products/new", request, { responseType: 'text' as 'json' })
    .pipe(
      catchError((error) => {
        if (error.status === 400) {
          alert("Utente già registrato");
        }
        throw error;
      })
    );
  }
  public promoteRegister(request: any) {
    console.log("STO IN USER REG");
    return this.httpClient.post<string>("http://localhost:8080/products/newPromote", request, { responseType: 'text' as 'json' })
    .pipe(
      catchError((error) => {
        if (error.status === 400) {
          alert("Utente già registrato");
        }
        throw error;
      })
    );
  }

  public generateToken(request: any) {
    return this.httpClient.post<string>("http://localhost:8080/products/authenticate", request, { responseType: 'text' as 'json' })
      .pipe(
        catchError((error) => {
          if (error.status === 403) {
            alert("Credenziali non valide");
          }
          throw error;
        })
      );
  }



  public welcome(token:any,role:any) {
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization',tokenStr);
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    return this.httpClient.get<string>("http://localhost:8080/products/welcome", {headers, responseType: 'text' as 'json' });
  }


  isLoggedIn() {
    // check if token is present in local storage
    return localStorage.getItem('token') !== null;
  }

  logout() {
    // remove token from local storage
    localStorage.removeItem('token');
  }

}
