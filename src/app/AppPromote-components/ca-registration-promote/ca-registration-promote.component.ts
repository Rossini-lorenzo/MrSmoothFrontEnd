import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { AroundClientService } from '../../service/around-client.service';

@Component({
  selector: 'app-registration-promote',
  templateUrl: './ca-registration-promote.component.html',
  styleUrls: ['./ca-registration-promote.component.css']
})
export class CaRegistrationPromoteComponent implements OnInit {
  constructor(private service:AroundClientService,private router: Router) { }

  @ViewChild('indirizzoInput', {static: false}) indirizzoInput: ElementRef;

  nome: string;
  cognome: string;
  email: string;
  password: string;
  r_password: string;
  appUser: string;
  dataNascita: Date;
  indirizzo: string;
  sesso: string;
  latitude : any;
  longitude : any;
  telefono:string;
 
  registerRequest: any;
  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyA3LYff6CRq_XZHKV6acQ143DjYtSwNWF0'
    });
    
    loader.load().then(() => {
      const input = document.getElementById('indirizzo') as HTMLInputElement;
      const autocomplete = new google.maps.places.Autocomplete(input, {
        fields: ['address_components', 'geometry', 'name']
      });
      
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and pressed the Enter key, or the Place Details request failed.
          window.alert("Selezionare un'opzione dall'autocomplete.");
          input.value = '';
          return;
        }
        const location = place.geometry.location;
        this.latitude = location!.lat();
        this.longitude = location!.lng();
        console.log(`Latitude: ${this.latitude}, Longitude: ${this.longitude}`);
      });
      
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !autocomplete.getPlace().geometry) {
          // User pressed the Enter key, but no suggestion was selected. Let's prevent submission of the form.
          event.preventDefault();
          window.alert("Selezionare un'opzione dall'autocomplete.");
        }
      });
      
    });
  }

 

  onSubmit(form: NgForm) {
    this.registerRequest = {
      "nome": form.value.nome,
      "cognome": form.value.cognome,
      "email": form.value.email,
      "password": form.value.password,
      "appUser": form.value.appUser,
      "dataNascita": form.value.dataNascita,
      "indirizzo": form.value.indirizzo,
      "telefono": form.value.telefono,
      "sesso": form.value.sesso,
      "latitudine": this.latitude,
      "longitudine": this.longitude
    };
    console.log(this.registerRequest);
    let resp= this.service.promoteRegister(this.registerRequest);
    
    resp.subscribe(data=>{ alert("Utente registrato correttamente");this.router.navigate(['/']);});
    
    
  }
}
