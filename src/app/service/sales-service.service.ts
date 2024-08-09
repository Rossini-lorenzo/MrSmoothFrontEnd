import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
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
    const piva = localStorage.getItem('piva');

    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<Object[]>(
      this.apiUrl + 'userSale/getTodaySales?piva='+piva,
      { headers, observe: 'response' }
    );
  }

  getPaginatedSalesArchive(
    page: number,
    size: number,
    date?: string,
    customer?: string,
    operator?: string,
    flValidity?: string
  ): Observable<HttpResponse<Object[]>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');
    const piva = localStorage.getItem('piva');

    const headers = new HttpHeaders().set('Authorization', tokenStr);

    let params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString());

    if (date) {
        params = params.set('date', date);
    }
    if (customer) {
        params = params.set('customer', customer);
    }
    if (operator) {
        params = params.set('operator', operator);
    }
    if (flValidity) {
        params = params.set('flValidity', flValidity);
    }

    return this.httpClient.get<Object[]>(
      `${this.apiUrl}userSale/getPaginatedSalesArchive?piva=`+piva,
      { headers, observe: 'response', params: params }
    );
  }

  addSale(sale: any): Observable<HttpResponse<any>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');
    const piva = localStorage.getItem('piva');

    const headers = new HttpHeaders().set('Authorization', tokenStr);

    return this.httpClient.post(this.apiUrl + 'userSale/newSale?piva='+piva, sale, {
      headers: headers,
      observe: 'response',
      responseType: 'text' as 'json', // Necessario per evitare conflitti di tipo
    });
  }
}
