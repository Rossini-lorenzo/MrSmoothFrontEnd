import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesServiceService {

  constructor(private httpClient: HttpClient) {}

  apiUrl = `${environment.apiBaseUrl}/`;

  getAllService(): Observable<HttpResponse<Object[]>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<Object[]>(
      this.apiUrl + 'userProduct/getAllService',
      { headers, observe: 'response' }
    );
  }

  updateService(
    id: number,
    serviceName: string,
    servicePrice: number,
  ): Observable<HttpResponse<Object[]>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().append('Authorization', tokenStr);

    return this.httpClient.post<any>(
      this.apiUrl +
        'userProduct/updateService?id=' +
        id +
        '&serviceName=' +
        serviceName +
        '&servicePrice=' +
        servicePrice,
      null,
      { headers: headers, responseType: 'text' as 'json' }
    );
  }

  addService(
    serviceName: string,
    servicePrice: number,
  ): Observable<HttpResponse<Object[]>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().append('Authorization', tokenStr);

    return this.httpClient.post<any>(
      this.apiUrl +
        'userProduct/newService?serviceName=' +
        serviceName +
        '&servicePrice=' +
        servicePrice,
      null,
      { headers: headers, responseType: 'text' as 'json' }
    );
  }

  deleteService(id: number): Observable<HttpResponse<Object[]>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().append('Authorization', tokenStr);

    return this.httpClient.post<any>(
      this.apiUrl + 'userProduct/deleteService?id=' + id,
      null,
      { headers: headers, responseType: 'text' as 'json' }
    );
  }
}
