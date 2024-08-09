import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { CustomerListModel } from '../sc-models/sc-models';

@Injectable({
  providedIn: 'root',
})
export class CustomersServiceService {
  constructor(private httpClient: HttpClient) {}

  apiUrl = `${environment.apiBaseUrl}/`;

  getAllCustomer(): Observable<CustomerListModel> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');
    const shopId = localStorage.getItem('shopId');

    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<CustomerListModel>(
      this.apiUrl + 'userProduct/getAllCustomer?shopId='+shopId,
      { headers }
    );
  }

  updateCustomer(
    id: number,
    nome: string,
    cognome: string,
    email: string,
    cellulare: number,
    dataDiNascita: string
  ): Observable<string> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');
    const shopId = localStorage.getItem('shopId');

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
        dataDiNascita+'&shopId='+shopId,
      null,
      { headers: headers, responseType: 'text' as 'json' }
    );
  }

  addCustomer(
    nome: string,
    cognome: string,
    email: string,
    cellulare: number,
    dataDiNascita: string
  ): Observable<string> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');
    const shopId = localStorage.getItem('shopId');

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
        dataDiNascita+
        '&shopId='+
        shopId,
      null,
      { headers: headers, responseType: 'text' as 'json' }
    );
  }

  deleteCustomer(id: number): Observable<string> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');
    const shopId = localStorage.getItem('shopId');

    const headers = new HttpHeaders().append('Authorization', tokenStr);

    return this.httpClient.post<any>(
      this.apiUrl + 'userProduct/deleteCustomer?id=' + id+'&shopId='+shopId,
      null,
      { headers: headers, responseType: 'text' as 'json' }
    );
  }
}
