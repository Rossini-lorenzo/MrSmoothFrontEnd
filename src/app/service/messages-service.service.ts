import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Message } from '../AppNoLogged-components/sc-manage-automatic-message/sc-manage-automatic-message.component';

@Injectable({
  providedIn: 'root'
})
export class MessagesServiceService {

  constructor(private httpClient: HttpClient) {}

  apiUrl = `${environment.apiBaseUrl}/`;

  getAllMessage(): Observable<Message[]> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<Message[]>(
      this.apiUrl + 'userProduct/getAllMessage',
      { headers }
    );
  }

  updateMessage(
    id: number,
    messageName: string,
    messageText: string,
  ): Observable<HttpResponse<Object[]>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().append('Authorization', tokenStr);

    return this.httpClient.post<any>(
      this.apiUrl +
        'userProduct/updateMessage?id=' +
        id +
        '&messageName=' +
        messageName +
        '&messageText=' +
        messageText,
      null,
      { headers: headers, responseType: 'text' as 'json' }
    );
  }

  addMessage(
    messageName: string,
    messageText: string,
  ): Observable<HttpResponse<Object[]>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().append('Authorization', tokenStr);

    return this.httpClient.post<any>(
      this.apiUrl +
        'userProduct/newMessage?messageName=' +
        messageName +
        '&messageText=' +
        messageText,
      null,
      { headers: headers, responseType: 'text' as 'json' }
    );
  }

  deleteMessage(id: number): Observable<HttpResponse<Object[]>> {
    const tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().append('Authorization', tokenStr);

    return this.httpClient.post<any>(
      this.apiUrl + 'userProduct/deleteMessage?id=' + id,
      null,
      { headers: headers, responseType: 'text' as 'json' }
    );
  }
}
