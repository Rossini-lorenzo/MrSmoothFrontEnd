import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapServiceService {
  //map: google.maps.Map | null = null;
  //markers: google.maps.Marker[] = [];
  constructor(private http: HttpClient) { }

  getWhatDoMarkers(): Observable<HttpResponse<Object[]>> {
    return this.http.get<Object[]>("http://localhost:8080/products/WhatDoMarkers", { observe: 'response' });
  }
}
