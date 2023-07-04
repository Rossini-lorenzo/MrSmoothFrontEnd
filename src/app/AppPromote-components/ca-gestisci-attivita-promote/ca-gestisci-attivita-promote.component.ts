import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AroundPromoteService } from 'src/app/service/around-promote.service';

@Component({
selector: 'app-ca-gestisci-attivita-promote',
templateUrl: './ca-gestisci-attivita-promote.component.html',
styleUrls: ['./ca-gestisci-attivita-promote.component.css']
})
export class CaGestisciAttivitaPromoteComponent {
eventi : any[] =[];
id :string;
indirizzo:string;
nomeLuogo:string;
posti:number;
descrizione:string;
outfit:string;
prezzo:string;
tipo:string;
eta:string;
target:string;

showTextAreaNomeLuogo = false;
showTextAreaPosti = false;
showTextAreaDescrizione = false;
showTextAreaIndirizzo = false;
showTextAreaOutfit = false;
showTextAreaPrezzo = false;
showTextAreaTipo = false;
showTextAreaEta = false;
showTextAreaTarget = false;
idPlace : string;

textAreaNomeLuogo = '';
textAreaPosti = '';
textAreaDescrizione = '';
textAreaIndirizzo = '';
textAreaOutfit = '';
textAreaPrezzo = '';
textAreaTipo = '';
textAreaEta = '';
textAreaTarget = '';

constructor(private service:AroundPromoteService,private router: Router){}
ngOnInit() {
  var id : any = localStorage.getItem('id');
  this.service.getPlace(id).subscribe({
  next: (response : any) => {
        console.log(response);
        this.nomeLuogo=response.body.nomeLuogo;
        this.indirizzo= response.body.indirizzo;
        this.posti=response.body.posti;
        this.descrizione=response.body.descrizione;
        this.idPlace=response.body.id;
        this.outfit=response.body.outfit;
        this.prezzo=response.body.prezzo;
        this.tipo=response.body.tipo;
        this.eta=response.body.eta;
        this.target=response.body.target;
        
        if (response.body.eventi.lenght != 0 ){
          response.body.eventi.forEach((element: any)  => {
            console.log(element);
            this.eventi.push(element);
          });
          
        }
        
  },
  error: (error) => console.error(error),
  complete: () => console.info('complete') });
  
}
modifica(textArea : any ) {
if (textArea=="indirizzo"){
    if (this.showTextAreaIndirizzo==false){
    this.showTextAreaIndirizzo = true;
    this.textAreaIndirizzo= this.indirizzo;
    }
    else this.showTextAreaIndirizzo=false;
}else if (textArea=="nomeLuogo"){
    if (this.showTextAreaNomeLuogo==false){
      this.showTextAreaNomeLuogo = true;
      this.textAreaNomeLuogo=this.nomeLuogo;
    }
    else this.showTextAreaNomeLuogo=false;
}else if (textArea=="posti"){
    if (this.showTextAreaPosti==false){
      this.showTextAreaPosti = true;
      this.textAreaPosti=this.posti.toString();
    }
    else this.showTextAreaPosti=false;
}else if (textArea=="descrizione"){
      if (this.showTextAreaDescrizione==false){
        this.showTextAreaDescrizione = true;
        this.textAreaDescrizione=this.descrizione;
      }
    else this.showTextAreaDescrizione=false;
    //this.textAreaNomeLuogo=this.nomeLuogo;
}else if (textArea=="outfit"){
      if (this.showTextAreaOutfit==false){
        this.showTextAreaOutfit = true;
        this.textAreaOutfit=this.outfit;
      }
      else this.showTextAreaOutfit=false;
      //this.textAreaNomeLuogo=this.nomeLuogo;
}else  if (textArea=="prezzo"){
      if (this.showTextAreaPrezzo==false){
      this.showTextAreaPrezzo = true;
      this.textAreaPrezzo= this.prezzo;
      }
      else this.showTextAreaPrezzo=false;
}else  if (textArea=="tipo"){
      if (this.showTextAreaTipo==false){
      this.showTextAreaTipo = true;
      this.textAreaTipo= this.tipo;
      }
      else this.showTextAreaTipo=false;
}else  if (textArea=="eta"){
      if (this.showTextAreaEta==false){
      this.showTextAreaEta = true;
      this.textAreaEta= this.eta;
      }
      else this.showTextAreaEta=false;
}else  if (textArea=="target"){
      if (this.showTextAreaTarget==false){
      this.showTextAreaTarget = true;
      this.textAreaTarget= this.target;
      }
      else this.showTextAreaTarget=false;
}

}




salvaModifiche() {
console.log("SI",this.textAreaTarget);
//qui puoi salvare il testo modificato nel backend tramite una chiamata API
// this.nomeLuogo = this.testoModificato; //aggiorna il valore mostrato nel template
//this.showTextArea = false; //nascondi il textarea
this.service.modifyPlace(this.textAreaNomeLuogo,this.textAreaDescrizione,this.textAreaPosti,
  this.textAreaOutfit,this.textAreaPrezzo,this.textAreaTipo,this.textAreaEta,this.textAreaTarget,this.idPlace,).subscribe
  ({
    next: (response : any) => {
      alert(response);
      location.reload(); 
    },
    error: (error) => console.error(error),
    complete: () => console.info('complete') });
}

}
