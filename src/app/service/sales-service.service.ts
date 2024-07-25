import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SalesServiceService {
  constructor(private httpClient: HttpClient) {}

  apiUrl = `${environment.apiBaseUrl}/`;

  getAllSale(): Observable<HttpResponse<Object[]>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<Object[]>(
      this.apiUrl + 'userSale/getAllSales',
      { headers, observe: 'response' }
    );
  }

  addSale(sale: any): Observable<HttpResponse<Object>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', tokenStr);

    return this.httpClient.post<Object>(this.apiUrl + 'userSale/newSale', sale, {
      headers: headers,
      observe: 'response',
    });
  }
}
