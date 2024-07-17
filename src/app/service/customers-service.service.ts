import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomersServiceService {
  constructor(private httpClient: HttpClient) {}

  apiUrl = `${environment.apiBaseUrl}/`;

  getAllCustomer(): Observable<HttpResponse<Object[]>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<Object[]>(
      this.apiUrl + 'userProduct/getAllCustomer',
      { headers, observe: 'response' }
    );
  }

  updateCustomer(
    id: number,
    nome: string,
    cognome: string,
    email: string,
    cellulare: number,
    dataDiNascita: string,
  ): Observable<HttpResponse<Object[]>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().append('Authorization', tokenStr);

    return this.httpClient.post<any>(
      this.apiUrl +
        'userProduct/updateCustomer?id=' +
        id +
        '&nome=' +
        nome +
        '&cognome=' +
        cognome +
        '&email=' +
        email +
        '&cellulare=' +
        cellulare +
        '&dataNascita=' +
        dataDiNascita,
      null,
      { headers: headers, responseType: 'text' as 'json' }
    );
  }

  addCustomer(
    nome: string,
    cognome: string,
    email: string,
    cellulare: number,
    dataDiNascita: string,
  ): Observable<HttpResponse<Object[]>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().append('Authorization', tokenStr);

    return this.httpClient.post<any>(
      this.apiUrl +
        'userProduct/newCustomer?nome=' +
        nome +
        '&cognome=' +
        cognome +
        '&email=' +
        email +
        '&cellulare=' +
        cellulare +
        '&dataNascita=' +
        dataDiNascita,
      null,
      { headers: headers, responseType: 'text' as 'json' }
    );
  }

  deleteCustomer(id: number): Observable<HttpResponse<Object[]>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().append('Authorization', tokenStr);

    return this.httpClient.post<any>(
      this.apiUrl + 'userProduct/deleteCustomer?id=' + id,
      null,
      { headers: headers, responseType: 'text' as 'json' }
    );
  }
}
