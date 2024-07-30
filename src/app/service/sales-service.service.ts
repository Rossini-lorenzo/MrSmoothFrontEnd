import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Sale } from '../AppNoLogged-components/ca-chest/ca-chest.component';

@Injectable({
  providedIn: 'root',
})
export class SalesServiceService {
  constructor(private httpClient: HttpClient) {}

  apiUrl = `${environment.apiBaseUrl}/`;

  getTodaySales(): Observable<HttpResponse<Object[]>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<Object[]>(
      this.apiUrl + 'userSale/getTodaySales',
      { headers, observe: 'response' }
    );
  }

  getPaginatedSalesArchive(
    page: number,
    size: number
  ): Observable<HttpResponse<Object[]>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<Object[]>(
      `${this.apiUrl}userSale/getPaginatedSalesArchive?page=${page}&size=${size}`,
      { headers, observe: 'response' }
    );
  }

  addSale(sale: any): Observable<HttpResponse<any>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', tokenStr);

    return this.httpClient.post(this.apiUrl + 'userSale/newSale', sale, {
      headers: headers,
      observe: 'response',
      responseType: 'text' as 'json', // Necessario per evitare conflitti di tipo
    });
  }
}
