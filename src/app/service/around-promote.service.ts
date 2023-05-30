import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AroundPromoteService {

  constructor(private httpClient:HttpClient) { }


  getPlace(id : string ) : Observable<HttpResponse<Object[]>>{
    let tokenStr = 'Bearer ' + localStorage.getItem('token');
   
    const headers = new HttpHeaders().set('Authorization',tokenStr);
    return this.httpClient.get<Object[]>("http://localhost:8080/promote/placeGetter?idPromote="+id, {headers, observe: 'response' });
  }

  modifyPlace(nomeLuogo: string, descrizione: string, posti: string,outfit:string,prezzo:string,tipo:string,eta:string,target:string,idPlace : string): Observable<HttpResponse<Object[]>> {
    let tokenStr = 'Bearer ' + localStorage.getItem('token');

    const headers = new HttpHeaders().append('Authorization', tokenStr);
    console.log(idPlace);
    return this.httpClient.post<any>("http://localhost:8080/promote/modifyPlace?&nomeLuogo=" + nomeLuogo + "&descrizione=" + descrizione + "&posti=" + posti+ "&idPlace=" + idPlace
    + "&outfit=" + outfit+ "&prezzo=" + prezzo+ "&tipo=" + tipo+ "&eta=" +eta + "&target=" + target, null,
     { headers: headers,  responseType: 'text' as 'json' });
}

}
