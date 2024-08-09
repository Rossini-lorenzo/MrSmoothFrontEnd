import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ServiceListModel } from '../sc-models/sc-models';

@Injectable({
  providedIn: 'root'
})
export class ServicesServiceService {

  constructor(private httpClient: HttpClient) {}

  apiUrl = `${environment.apiBaseUrl}/`;

  getAllService(): Observable<ServiceListModel> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');
    const shopId = localStorage.getItem('shopId');

    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<ServiceListModel>(
      this.apiUrl + 'userProduct/getAllService?shopId='+shopId,
      { headers }
    );
  }

  updateService(
    id: number,
    serviceName: string,
    servicePrice: number,
  ): Observable<string> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');
    const shopId = localStorage.getItem('shopId');

    const headers = new HttpHeaders().append('Authorization', tokenStr);

    return this.httpClient.post<any>(
      this.apiUrl +
        'userProduct/updateService?id=' +
        id +
        '&serviceName=' +
        serviceName +
        '&servicePrice=' +
        servicePrice+'&shopId='+shopId,
      null,
      { headers: headers, responseType: 'text' as 'json' }
    );
  }

  addService(
    serviceName: string,
    servicePrice: number,
  ): Observable<string> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');
    const shopId = localStorage.getItem('shopId');

    const headers = new HttpHeaders().append('Authorization', tokenStr);

    return this.httpClient.post<any>(
      this.apiUrl +
        'userProduct/newService?serviceName=' +
        serviceName +
        '&servicePrice=' +
        servicePrice+
        '&shopId='+
        shopId,
      null,
      { headers: headers, responseType: 'text' as 'json' }
    );
  }

  deleteService(id: number): Observable<string> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');
    const shopId = localStorage.getItem('shopId');

    const headers = new HttpHeaders().append('Authorization', tokenStr);

    return this.httpClient.post<any>(
      this.apiUrl + 'userProduct/deleteService?id=' + id+'&shopId='+shopId,
      null,
      { headers: headers, responseType: 'text' as 'json' }
    );
  }
}
