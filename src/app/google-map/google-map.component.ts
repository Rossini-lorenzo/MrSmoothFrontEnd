import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Loader } from '@googlemaps/js-api-loader';
import { GoogleMapServiceService } from '../service/google-map-service.service';
import {Chart} from 'chart.js';



@Component({
selector: 'app-google-map',
templateUrl: './google-map.component.html',
styleUrls: ['./google-map.component.css']
})


export class GoogleMapComponent implements OnInit{

constructor(private googleMapService: GoogleMapServiceService){ 
}

ngOnInit() {


let loader = new Loader({
  apiKey: 'AIzaSyD5GMdVpHOwzuDFHMp3BGketZxSJH3BCBM'
});

loader.load().then(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.googleMapService.map = new google.maps.Map(document.getElementById('map')!, {
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
      
      // omino con posizione corrente
      const markerIcon = {
        url: 'http://maps.google.com/mapfiles/kml/shapes/man.png',
        scaledSize: new google.maps.Size(30, 30),
      };
      const markerPositions = [{ lat: latitude, lng: longitude }];
      markerPositions.forEach(position => {
        var marker = new google.maps.Marker({
          position,
          map: this.googleMapService.map,
          icon: markerIcon,
          title: 'Titolo del marker personalizzato',
        });
        this.googleMapService.markers.push(marker);
        
      });
    });
  }
});

}

ngAfterInit(){
let loader = new Loader({
  apiKey: 'AIzaSyD5GMdVpHOwzuDFHMp3BGketZxSJH3BCBM'
});

loader.load().then(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.googleMapService.map = new google.maps.Map(document.getElementById('map')!, {
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
      
      // omino con posizione corrente
      const markerIcon = {
        url: 'http://maps.google.com/mapfiles/kml/shapes/man.png',
        scaledSize: new google.maps.Size(30, 30),
      };
      const markerPositions = [{ lat: latitude, lng: longitude }];
      markerPositions.forEach(position => {
        var marker = new google.maps.Marker({
          position,
          map: this.googleMapService.map,
          icon: markerIcon,
          title: 'Titolo del marker personalizzato',
        });
        this.googleMapService.markers.push(marker);
        
      });
    });
  }
});

}
//public static removeAllMarker():void{this.googleMapService.markers.forEach((marker:any)=>{marker.map=null})}
public  aggiungiMarker(EventPlace:any): void {
console.log("MARKER AGGIUNTO");

const contentString = `
<div class="card" style="max-width: 200px;">
<img src="https://via.placeholder.com/150" class="card-img-top">
<div class="card-body">
  <h5 class="card-title">`+EventPlace.nomeLuogo+`</h5>
  <p class="card-text">`+EventPlace.descrizione+`</p>
</div>
</div>
`;

const newMarkerPosition = { lat: EventPlace.latitudine, lng: EventPlace.longitudine };
const newMarkerIcon = 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png';
const newMarker = new google.maps.Marker({
  position: newMarkerPosition,
  icon: newMarkerIcon,
  title: EventPlace.titolo,
  map:  this.googleMapService.map // aggiunge il marker direttamente alla mappa
});
this.googleMapService.markers.push(newMarker);
const infoWindow = new google.maps.InfoWindow({
  content: contentString
});


// Quando chiudo l'info del marker
infoWindow.addListener('domready', () => {
  const closeButton = document.querySelector('.gm-ui-hover-effect');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      infoWindow.close();
      const container = document.querySelector('.card-container');
if (container) {
container.innerHTML = '';
}
    });
  }
});


// Quando clicco il marker 
newMarker.addListener('click', () => {
  infoWindow.open( this.googleMapService.map, newMarker);
    // Crea la card
const card = document.createElement('div');
card.innerHTML = this.cardMarker(EventPlace);

// Aggiungi la card al contenitore
const container = document.querySelector('.card-container');
if (container) {
container.innerHTML = '';
container.appendChild(card);
}
});

}


public  rimuoviMarkers(): void {
// Rimuovi i marker dalla mappa
for (let i = 0; i < this.googleMapService.markers.length; i++) {
  this.googleMapService.markers[i].setMap(null);
}

// Svuota l'array dei marker
this.googleMapService.markers = [];

  // omino con posizione corrente
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  const markerIcon = {
  url: 'http://maps.google.com/mapfiles/kml/shapes/man.png',
  scaledSize: new google.maps.Size(30, 30),
};
const markerPositions = [{ lat: latitude, lng: longitude }];
markerPositions.forEach(position => {
  var marker = new google.maps.Marker({
    position,
    map: this.googleMapService.map,
    icon: markerIcon,
    title: 'Titolo del marker personalizzato',
  });
  
  this.googleMapService.markers.push(marker);
  
});
})}

}
public  cardMarker(EventPlace:any): string {


return`
<div class="card"  style="border-radius: 0px;" >
<img src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp" style="height:200px;border-top-left-radius: 0px;border-top-right-radius: 0px;" class="card-img-top"
  alt="Hollywood Sign on The Hill" />
<div class="card-body">
  <h5 class="card-title"  style="text-align: center;background-color: #fef7e0;"><b> `+EventPlace.nomeLuogo+ `</b></h5>
  <hr>
  <div style="font-size: 0.9rem;">
  <p class="card-text"   style="text-align: center;">
  `+EventPlace.descrizione+ `
  </p>
  <hr>
  
<div class="row">
<div class="col-md-4" style="text-align: left;">
<div class="text-sm inline"><div><i class="fa fa-user" aria-hidden="true"></i> <b>Posti :</b> `+EventPlace.posti+ `</div></div>
</div>
<div class="col-md-4" style="text-align: left;">
<div class="text-sm inline"> <div><i class="fa fa-mars" aria-hidden="true"></i> <b>Target :</b></div></div>
</div>
<div class="col-md-4" style="text-align: left;">
<div class="text-sm inline">  <div><i class="fa fa-calendar" aria-hidden="true"></i><b>  Eta' :</b></div></div>
</div>
</div>

<div class="row">
<div class="col-md-4" style="text-align: left;">
<div><i class="fa fa-eur" aria-hidden="true"></i> <b>Prezzo :</b></div>
</div>
<div class="col-md-4" style="text-align: left;">
<div><i class="fa fa-shopping-bag" aria-hidden="true"></i><b> OutFit :</b></div>
</div>
<div class="col-md-4" style="text-align: left;">
<div><i class="fa fa-beer" aria-hidden="true"></i><b> Tipo :</b></div>
</div>
</div>

<hr>

<div class="row">
<div class="col-md-12" style="text-align: center;">
<div class="form-inline">
  <label class="tick">
    <span class="fas fa-star"></span>
    <span class="fas fa-star"></span>
    <span class="fas fa-star"></span>
    <span class="fas fa-star"></span>
    <span class="fas fa-star"></span>
  </label>
</div>
</div>
</div>
</div>

<hr>

<i class="fa fa-arrow-right" aria-hidden="true"></i>
<b> Prossimi eventi : </b>
<div class="card-slider" style="overflow-x: scroll; white-space: nowrap;">
  <div class="card" style="display: inline-block; width: 150px; margin-right: 10px;border-radius:0px; margin-bottom: 10px;margin-top: 10px;">
    <div class="card-body">
      <h6 class="card-title">Apertura Opus</h6>
      <p class="card-text">23-05-2023 </p>
    </div>
  </div>
  <div class="card" style="display: inline-block; width: 150px; margin-right: 10px;border-radius:0px; margin-bottom: 10px;margin-top: 10px;;">
    <div class="card-body">
      <h6 class="card-title">Opus</h6>
      <p class="card-text">24-05-2023 </p>
    </div>
  </div>
  <div class="card" style="display: inline-block; width: 150px; margin-right: 10px;border-radius:0px;margin-bottom: 10px;margin-top: 10px;">
    <div class="card-body">
      <h6 class="card-title">Opus</h6>
      <p class="card-text">25-05-2023 </p>
    </div>
  </div>
</div>

<hr>

<div class="row">
<div class="col-md-12" style="text-align: center;">
<button style="background-color: #8acc9c; border: none; color: white; padding: 10px 20px;  font-size: 16px; border-radius: 4px; cursor: pointer;"><i class="fa fa-info-circle" aria-hidden="true"></i> Dettagli</button>
</div>
</div>

<hr>
<script src="https://cdn.anychart.com/js/8.0.1/anychart-core.min.js"></script>
<script src="https://cdn.anychart.com/js/8.0.1/anychart-pie.min.js"></script>

<div id="container"></div>


</div>
</div>

<style>
.card-slider::-webkit-scrollbar {
height: 8px;
}

.card-slider::-webkit-scrollbar-track {
background: #f1f1f1;
}

.card-slider::-webkit-scrollbar-thumb {
background: #888;
border-radius: 4px;
}

.card-slider::-webkit-scrollbar-thumb:hover {
background: #555;
}
</style>

`;
}
}










//newMarker.addListener('mouseout', () => {
//infoWindow.close();
//const container = document.querySelector('.card-container');
//if (container) {
// container.innerHTML = '';
//}

//console.log("STO IN CLOSE");
  //})