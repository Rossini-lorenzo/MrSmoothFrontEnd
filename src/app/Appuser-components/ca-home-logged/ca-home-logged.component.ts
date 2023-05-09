import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { GoogleMapComponent } from '../../google-map/google-map.component';
import { GoogleMapServiceService } from '../../service/google-map-service.service';

@Component({
  selector: 'app-ca-home-logged',
  templateUrl: './ca-home-logged.component.html',
  styleUrls: ['./ca-home-logged.component.css']
})
export class CaHomeLoggedComponent {
  constructor(private service:GoogleMapServiceService){}

  objects: any[] = []; // inizializza objects come un array vuoto
  
  ngOnInit() {
    this.aggiungiMarker();
  }
  ngAfterViewInit() {
    this.aggiungiMarker();
  }
   
  
  aggiungiMarker(){
    this.service.getWhatDoMarkers().subscribe({
      next: (response : any) => {this.objects = response.body || [];
  
        // aspetta che la mappa sia pronta prima di aggiungere i markers
        google.maps.event.addListenerOnce(GoogleMapComponent.map, 'tilesloaded', () => {
          // aggiungi i markers per ogni oggetto nella lista
          this.objects.forEach(element => {
            console.log(element.nomeLuogo,element.latitudine,element.longitudine,element.descrizione);
            GoogleMapComponent.aggiungiMarker(element.nomeLuogo,element.latitudine,element.longitudine,element.descrizione);
          });
        });},
      error: (error) => console.error(error),
      complete:() =>{ console.log("FINE")  ;
     }
  
  });}
  
}