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

  constructor(private service:GoogleMapServiceService){}

  objects: any[] = []; // inizializza objects come un array vuoto
  
  ngOnInit() {
    this.aggiungiMarker();
  }
  ngAfterViewInit() {
    this.aggiungiMarker();
  }
   
  
  aggiungiMarker(){
    this.service.getWhatDoMarkers().subscribe(
      (response: HttpResponse<any>) => {
        this.objects = response.body || [];
  
        // aspetta che la mappa sia pronta prima di aggiungere i markers
        google.maps.event.addListenerOnce(GoogleMapComponent.map, 'tilesloaded', () => {
          // aggiungi i markers per ogni oggetto nella lista
          this.objects.forEach(element => {
            console.log(element.nomeLuogo,element.latitudine,element.longitudine);
            GoogleMapComponent.aggiungiMarker(element.titolo,element.latitudine,element.longitudine);
          });
        });
  
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
}
