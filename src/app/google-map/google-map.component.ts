import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Loader } from '@googlemaps/js-api-loader';



@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})


export class GoogleMapComponent implements OnInit{
  static map: google.maps.Map; 
  static markers:any[]=[];
  constructor(){  
  }
  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyD5GMdVpHOwzuDFHMp3BGketZxSJH3BCBM'
    });

    loader.load().then(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          GoogleMapComponent.map = new google.maps.Map(document.getElementById('map')!, {
            center: { lat: latitude, lng: longitude },
            zoom: 15,
            disableDefaultUI: true,
            styles: [
              {
                featureType: 'poi',
                stylers: [{ visibility: 'off' }]
              },
              {
                featureType: 'transit',
                stylers: [{ visibility: 'off' }]
              }
            ]
          });
          const markerIcon = 'http://maps.google.com/mapfiles/kml/pal3/icon20.png';
          const markerPositions = [{ lat: latitude, lng: longitude }];
          markerPositions.forEach(position => {
            var marker = new google.maps.Marker({
              position,
              map: GoogleMapComponent.map,
              icon: markerIcon,
              title: 'Titolo del marker personalizzato',
            });
            GoogleMapComponent.markers.push(marker);
            
          });
        });
      }
    });
    
  }
  public static removeAllMarker():void{this.markers.forEach((marker:any)=>{marker.map=null})}
  public static aggiungiMarker(titolo:string,latitudine:number,longitudine:number,descrizione:string): void {
    
    const contentString = `
  <div class="card">
    <img src="https://via.placeholder.com/150" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">`+titolo+`</h5>
      <p class="card-text">`+descrizione+`</p>
    </div>
  </div>
`;

    const newMarkerPosition = { lat: latitudine, lng: longitudine };
    const newMarkerIcon = 'http://maps.google.com/mapfiles/kml/pal3/icon20.png';
    const newMarker = new google.maps.Marker({
      position: newMarkerPosition,
      icon: newMarkerIcon,
      title: titolo,
      map: GoogleMapComponent.map // aggiunge il marker direttamente alla mappa
    });

    const infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

    newMarker.addListener('click', () => {
      infoWindow.open(GoogleMapComponent.map, newMarker);
        // Crea la card
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = '<h4>'+titolo+'</h4><p>'+descrizione+'</p>';

  // Aggiungi la card al contenitore
  const container = document.querySelector('.card-container');
  if (container) {
    container.innerHTML = '';
    container.appendChild(card);
  }
    });

  }

}