import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  constructor(private httpClient: HttpClient) {}

  apiUrl = `${environment.apiBaseUrl}/`;




// PRODOTTI MAGAZZINO START

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

 // PRODOTTI MAGAZZINO END




  // EVENTI  CALENDARIO GOOGLE START

  getAllEvent(): Observable<HttpResponse<Object[]>> {
    //const tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders();
    return this.httpClient.get<Object[]>(
      this.apiUrl + 'googleCalendar/get-events',
      {  observe: 'response' }
    );
  }

  putCodeAuth(code: string): Observable<HttpResponse<Object[]>> {
    return this.httpClient.get<Object[]>(
      this.apiUrl + 'googleCalendar/login/google?code=' + code,
      {  observe: 'response' }
    );
  }

  createEvent(titolo: any, descrizione: any,idDipendente: any, startDate: any, endDate: any): Observable<HttpResponse<Object[]>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().append('Authorization', tokenStr);
    
    return this.httpClient.post<any>(
      "http://localhost:8080/googleCalendar/create-event?&titolo=" + titolo + "&descrizione=" + descrizione +"&idDipendente="+ idDipendente +"&startDate="+startDate+"&endDate="+endDate,
      null,
      { headers: headers, responseType: 'text' as 'json' } // Aggiunto observe: 'response' per ottenere l'intera risposta HTTP
    );
  }
  

deleteEvent(id:any): Observable<HttpResponse<Object[]>> {
  const tokenStr = 'Bearer ' + localStorage.getItem('token');

  const headers = new HttpHeaders().append('Authorization', tokenStr);

  return this.httpClient.delete<any>("http://localhost:8080/googleCalendar/delete-event?&eventId=" + id ,
   { headers: headers,  responseType: 'text' as 'json' });
}
  // EVENTI  CALENDARIO GOOGLE END


  //START DASHBOARD
    getAllEmployee(): Observable<HttpResponse<Object[]>> {
      const tokenStr = 'Bearer ' + localStorage.getItem('token');
  
      const headers = new HttpHeaders().set('Authorization', tokenStr);
      return this.httpClient.get<Object[]>(
        this.apiUrl + 'dashboard/getAllEmployee',
        { headers, observe: 'response' }
      );
    }

    

    getAllCounters(): Observable<HttpResponse<Object[]>> {
      const tokenStr = 'Bearer ' + localStorage.getItem('token');
  
      const headers = new HttpHeaders().set('Authorization', tokenStr);
      return this.httpClient.get<Object[]>(
        this.apiUrl + 'dashboard/getAllCounter',
        { headers, observe: 'response' }
      );
    }

    getTagliPerDipendente(): Observable<HttpResponse<Object[]>> {
      const tokenStr = 'Bearer ' + localStorage.getItem('token');
  
      const headers = new HttpHeaders().set('Authorization', tokenStr);
      return this.httpClient.get<Object[]>(
        this.apiUrl + 'dashboard/getTagliPerDipendente',
        { headers, observe: 'response' }
      );
    }
    getProdottiVenduti(): Observable<HttpResponse<Object[]>> {
      const tokenStr = 'Bearer ' + localStorage.getItem('token');
  
      const headers = new HttpHeaders().set('Authorization', tokenStr);
      return this.httpClient.get<Object[]>(
        this.apiUrl + 'dashboard/getProdottiVenduti',
        { headers, observe: 'response' }
      );
    }

    getGuadagniMensili(): Observable<HttpResponse<Object[]>> {
      const tokenStr = 'Bearer ' + localStorage.getItem('token');
  
      const headers = new HttpHeaders().set('Authorization', tokenStr);
      return this.httpClient.get<Object[]>(
        this.apiUrl + 'dashboard/getGuadagnimensili',
        { headers, observe: 'response' }
      );
    }
    
  //END DASHBOARD
}
