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

constructor(private service:GoogleMapServiceService,private googleMapsComponent : GoogleMapComponent){}
filtri:any[]=[];
objects: any[] = []; // inizializza objects come un array vuoto
markers:any[]=[];
flagPrezzo :boolean=false;

ngOnInit() {
this.handleWindowResize();
window.addEventListener('resize', this.handleWindowResize.bind(this));

setTimeout(() => {
  this.aggiungiMarker();
}, 300);

}
ngAfterInit() {
  this.handleWindowResize();
  window.addEventListener('resize', this.handleWindowResize.bind(this));
  
  setTimeout(() => {
    this.aggiungiMarker();
  }, 300);
  
  }

onRangeChange() {
console.log("Nuovo valore selezionato: " + this.priceRange);
var index = -1;
var flag=false;

for (var i = 0; i < this.filtri.length; i++) {
var sottogruppo = this.filtri[i];
if (sottogruppo[1]=="prezzo") {
  flag= true;
  index=i
  break;
}
}

if (this.priceRange==0){


this.filtri.splice(index, 1);
var nF = document.getElementById('nessunFiltro');if(nF!= null ){nF.style.display='block'}
} else {


if(index===-1){
this.filtri.push(["Da 0€ a "+this.priceRange+"€","prezzo"]);
}else {
  
    
  this.filtri.splice(index, 1);
  this.filtri.push(["Da 0€ a "+this.priceRange+"€","prezzo"]);
  
}
}

if(this.filtri.length!=0){
var nF = document.getElementById('nessunFiltro');if(nF!= null ){nF.style.display='none'}
} else { var nF = document.getElementById('nessunFiltro');if(nF!= null ){nF.style.display='block'}}
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

var filtro = checkbox.getAttribute("name");

//const index = this.filtri.indexOf(filtro);
var index = -1;
for (var i = 0; i < this.filtri.length; i++) {
  var sottogruppo = this.filtri[i];
  if (sottogruppo[0]==filtro) {
    index= i;
    break;
  }
}


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
      
      }
    }
    else{
      
      this.filtri.splice(index, 1);}
    
}
if(this.filtri.length!=0){
  
var nF = document.getElementById('nessunFiltro');
if(nF!= null ){nF.style.display='none'}
} else { var nF = document.getElementById('nessunFiltro');

if(nF!= null ){nF.style.display='block'}}
this.aggiornaMarker();
}

rimuoviFiltro(filtro: any){


const index = this.filtri.indexOf(filtro); 

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
    this.aggiornaMarker();
}

//ngAfterViewInit() {
//this.aggiungiMarker();
//}


aggiungiMarker(){

this.service.getWhatDoMarkers().subscribe({
next: (response : any) => {this.objects = response.body || [];

  // aspetta che la mappa sia pronta prima di aggiungere i markers
  google.maps.event.addListenerOnce(this.service.map as google.maps.Map, 'tilesloaded', () => {
    // aggiungi i markers per ogni oggetto nella lista
    this.objects.forEach(element => {
      this.markers.push(element);
        
        this.googleMapsComponent.aggiungiMarker(element);
    });
  });},
error: (error) => console.error(error),
complete:() =>{ console.log("FINE")  ;
}

});}

aggiornaMarker(){

this.googleMapsComponent.rimuoviMarkers();
console.log("markers",this.markers)
this.markers.forEach((element)=>
{const trovato = this.filtri.some((arrayInterno) => {
return arrayInterno.includes(element.tipo);
});
console.log("trovato",trovato)
if(trovato||this.filtri.length==0){this.googleMapsComponent.aggiungiMarker(element);}
}

)




}



















}
