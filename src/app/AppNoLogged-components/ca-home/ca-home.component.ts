import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { GoogleMapComponent } from '../../google-map/google-map.component';
import { GoogleMapServiceService } from '../../service/google-map-service.service';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-ca-home',
  templateUrl: './ca-home.component.html',
  styleUrls: ['./ca-home.component.css']
})
export class CaHomeComponent {

  priceRange: number = 0;

constructor(private service:GoogleMapServiceService){}
filtri:any[]=[];
objects: any[] = []; // inizializza objects come un array vuoto
markes:any[]=[];



onRangeChange() {
  console.log("Nuovo valore selezionato: " + this.priceRange);
  const index = this.filtri.indexOf("prezzo");
  if (this.priceRange==0){
    this.filtri.splice(index, 1);
    var nF = document.getElementById('nessunFiltro');if(nF!= null ){nF.style.display='block'}
  } else {
    
    if(index!==-1){
    this.filtri.push(["Da 0€ a "+this.priceRange+"€","prezzo"]);
    }else{
      this.filtri.splice(index, 1);
      this.filtri.push(["Da 0€ a "+this.priceRange+"€","prezzo"]);
    }
  }

  if(this.filtri.length!=0){
    var nF = document.getElementById('nessunFiltro');if(nF!= null ){nF.style.display='none'}
    } else { var nF = document.getElementById('nessunFiltro');if(nF!= null ){nF.style.display='block'}}
}

ngOnInit() {
  this.handleWindowResize();
  window.addEventListener('resize', this.handleWindowResize.bind(this));
 
  
  this.aggiungiMarker();
}
handleWindowResize() {
  var mapHeight=0;
  var mapElement = document.getElementById('map');
   
   if (mapElement != null) {
     mapHeight = mapElement.offsetHeight;
  }
  var scrollbarElement = document.getElementById('sidebar');
  if (scrollbarElement != null) {
  scrollbarElement.style.height = mapHeight + 'px';

  }
}
aggiungiRimuoviFiltro(event: Event) {
  
  const checkbox = event.target as HTMLInputElement;
  console.log(checkbox.id);
  this.filtri;
    const filtro = checkbox.name;
    const index = this.filtri.indexOf(filtro);
    if (checkbox.checked) {
        this.filtri.push([filtro,checkbox.id]);
        this.aggiungiMarker();
    } else {
       var target : any = event.target;
       
        if (checkbox.name ==undefined){
          if (checkbox.classList.contains('active')){
            checkbox.classList.remove('active');
            this.filtri.splice(index, 1);
          }else {
          this.filtri.push([target.id,target.id]);
          checkbox.classList.add('active');
          this.aggiornaMarker();
          
          }
        }
        else{this.filtri.splice(index, 1);}
        
    }
    if(this.filtri.length!=0){
    var nF = document.getElementById('nessunFiltro');if(nF!= null ){nF.style.display='none'}
    } else { var nF = document.getElementById('nessunFiltro');if(nF!= null ){nF.style.display='block'}}
  
}

rimuoviFiltro(filtro: any){
  console.log(filtro);

    const index = this.filtri.indexOf(filtro); 
    console.log(this.filtri[index][1]);
    if(this.filtri[index][1]!='prezzo'){
    if (index !== -1) {
       
        const checkbox = document.getElementById(this.filtri[index][1]) as HTMLInputElement;
        this.filtri.splice(index, 1);
         checkbox.checked = false;
         checkbox.classList.remove('active');
      }

      } else {
        this.filtri.splice(index, 1);
        this.priceRange=0;
      }

      if(this.filtri.length!=0){
        var nF = document.getElementById('nessunFiltro');if(nF!= null ){nF.style.display='none'}
        } else { var nF = document.getElementById('nessunFiltro');if(nF!= null ){nF.style.display='block'}}

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
          this.markes.push(element);
        
           GoogleMapComponent.aggiungiMarker(element.nomeLuogo,element.latitudine,element.longitudine,element.descrizione);
           console.log("ciao");
          
        });
      });},
    error: (error) => console.error(error),
    complete:() =>{ console.log("FINE")  ;
   }

});}

aggiornaMarker(){
  this.markes.forEach((element)=>
  {const trovato = this.filtri.some((arrayInterno) => {
    return arrayInterno.includes(element.tipo);
  });
  GoogleMapComponent.removeAllMarker();
  if(trovato){GoogleMapComponent.aggiungiMarker(element.nomeLuogo,element.latitudine,element.longitudine,element.descrizione);}
   }
  
  )
  

  
  
}











  





  
  
}
