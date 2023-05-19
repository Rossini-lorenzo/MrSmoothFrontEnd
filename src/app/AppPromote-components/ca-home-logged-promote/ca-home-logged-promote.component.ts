import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { GoogleMapComponent } from 'src/app/google-map/google-map.component';
import { GoogleMapServiceService } from 'src/app/service/google-map-service.service';

@Component({
  selector: 'app-ca-home-logged-promote',
  templateUrl: './ca-home-logged-promote.component.html',
  styleUrls: ['./ca-home-logged-promote.component.css']
})
export class CaHomeLoggedPromoteComponent {

  constructor(private service:GoogleMapServiceService,private googleMapsComponent : GoogleMapComponent){}

  objects: any[] = []; // inizializza objects come un array vuoto
  
  ngOnInit() {
    setTimeout(() => {
      this.aggiungiMarker();
    }, 500);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.aggiungiMarker();
    }, 500);
  }
   
  
  aggiungiMarker(){
    this.service.getWhatDoMarkers().subscribe({
      next: (response : any) => {this.objects = response.body || [];
  
        // aspetta che la mappa sia pronta prima di aggiungere i markers
        google.maps.event.addListenerOnce(this.service.map as google.maps.Map, 'tilesloaded', () => {
          // aggiungi i markers per ogni oggetto nella lista
          this.objects.forEach(element => {
            console.log(element.nomeLuogo,element.latitudine,element.longitudine,element.descrizione);
            this.googleMapsComponent.aggiungiMarker(element);
          });
        });},
      error: (error) => console.error(error),
      complete:() =>{ console.log("FINE")  ;
     }
  
  });}
  
}
