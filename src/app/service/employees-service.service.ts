import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesServiceService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = `${environment.apiBaseUrl}/`;

  getAllEmployee(): Observable<HttpResponse<Object[]>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');
    const piva = localStorage.getItem('piva');

    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<Object[]>(
      this.apiUrl + 'userProduct/getAllEmployee?piva='+piva,
      { headers, observe: 'response' }
    );
  }

  updateEmployee(
    id: number,
    nome: string,
    cognome: string,
    email: string,
    cellulare: number,
    dataScadenzaContratto: string,
    dataAssunzione: string,
  ): Observable<HttpResponse<Object[]>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().append('Authorization', tokenStr);

    return this.httpClient.post<any>(
      this.apiUrl +
        'userProduct/updateEmployee?id=' +
        id +
        '&nome=' +
        nome +
        '&cognome=' +
        cognome + 
        '&email=' +
        email + 
        '&cellulare=' +
        cellulare + 
        '&dataScadenzaContratto=' +
        dataScadenzaContratto + 
        '&dataAssunzione=' +
        dataAssunzione,
      null,
      { headers: headers, responseType: 'text' as 'json' }
    );
  }

  addEmployee(
    nome: string,
    cognome: string,
    email: string,
    cellulare: number,
    dataScadenzaContratto: string,
    dataAssunzione: string
  ): Observable<HttpResponse<Object[]>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');
    const piva = localStorage.getItem('piva');

    const headers = new HttpHeaders().append('Authorization', tokenStr);

    return this.httpClient.post<any>(
      this.apiUrl +
        'userProduct/newEmployee?nome=' +
        nome +
        '&cognome=' +
        cognome + 
        '&email=' +
        email + 
        '&cellulare=' +
        cellulare + 
        '&dataScadenzaContratto=' +
        dataScadenzaContratto + 
        '&dataAssunzione=' +
        dataAssunzione+
        '&piva='+piva,
      null,
      { headers: headers, responseType: 'text' as 'json' }
    );
  }

  deleteEmployee(id: number): Observable<HttpResponse<Object[]>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().append('Authorization', tokenStr);

    return this.httpClient.post<any>(
      this.apiUrl + 'userProduct/deleteEmployee?id=' + id,
      null,
      { headers: headers, responseType: 'text' as 'json' }
    );
  }
}
