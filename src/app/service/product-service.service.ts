import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  constructor(private httpClient: HttpClient) {}

  checkProduct(id: string): Observable<HttpResponse<Object[]>> {
    let tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<Object[]>(
      'http://localhost:8080/userProduct/checkProduct?id=' + id,
      { headers, observe: 'response' }
    );
  }

  getAllProducts(): Observable<HttpResponse<Object[]>> {
    let tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<Object[]>(
      'http://localhost:8080/userProduct/getAllProducts',
      { headers, observe: 'response' }
    );
  }

  updateProduct(
    id: string,
    prezzo: number,
    quantita: number
  ): Observable<HttpResponse<Object[]>> {
    let tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().append('Authorization', tokenStr);

    return this.httpClient.post<any>(
      'http://localhost:8080/userProduct/updateProduct?id=' +
        id.toString() +
        '&prezzo=' +
        prezzo +
        '&quantita=' +
        quantita,
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
    let tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().append('Authorization', tokenStr);

    return this.httpClient.post<any>(
      'http://localhost:8080/userProduct/newProduct?id=' +
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
}
