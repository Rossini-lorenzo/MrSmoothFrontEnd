import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  constructor(private httpClient: HttpClient) {}

  apiUrl = `${environment.apiBaseUrl}/`;

  checkProduct(id: string): Observable<HttpResponse<Object[]>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<Object[]>(
      this.apiUrl + 'userProduct/checkProduct?id=' + id,
      { headers, observe: 'response' }
    );
  }

  getAllProducts(): Observable<HttpResponse<Object[]>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<Object[]>(
      this.apiUrl + 'userProduct/getAllProducts',
      { headers, observe: 'response' }
    );
  }

  updateProduct(
    id: string,
    prezzo: number,
    quantita: number,
    nomeProdotto: string
  ): Observable<HttpResponse<Object[]>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().append('Authorization', tokenStr);

    return this.httpClient.post<any>(
      this.apiUrl +
        'userProduct/updateProduct?id=' +
        id +
        '&prezzo=' +
        prezzo +
        '&quantita=' +
        quantita +
        '&nomeProdotto=' +
        nomeProdotto,
      null,
      { headers: headers, responseType: 'text' as 'json' }
    );
  }

  addProduct(
    id: string,
    prezzo: number,
    quantita: number,
    nomeProdotto: string
  ): Observable<HttpResponse<Object[]>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().append('Authorization', tokenStr);

    return this.httpClient.post<any>(
      this.apiUrl +
        'userProduct/newProduct?id=' +
        id.toString() +
        '&prezzo=' +
        prezzo +
        '&quantita=' +
        quantita +
        '&nomeProdotto=' +
        nomeProdotto,
      null,
      { headers: headers, responseType: 'text' as 'json' }
    );
  }

  deleteProduct(id: string): Observable<HttpResponse<Object[]>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().append('Authorization', tokenStr);

    return this.httpClient.post<any>(
      this.apiUrl + 'userProduct/deleteProduct?id=' + id,
      null,
      { headers: headers, responseType: 'text' as 'json' }
    );
  }
}
