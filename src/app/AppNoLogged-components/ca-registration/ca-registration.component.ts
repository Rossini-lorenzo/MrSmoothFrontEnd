import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AroundClientService } from '../../service/around-client.service';

@Component({
  selector: 'app-ca-registration',
  templateUrl: './ca-registration.component.html',
  styleUrls: ['./ca-registration.component.css']
})
export class CaRegistrationComponent {
  constructor(private service:AroundClientService,private router: Router) { }

   nome : string;
   cognome:string;
   email:string;
   password:string;
   r_password:string;
   appUser:string;
   dataNascita:Date;
   telefono:string;
   sesso:string;

   registerRequest:any;

  onSubmit(form: NgForm) {
    this.registerRequest = {
      "nome": form.value.nome,
      "cognome": form.value.cognome,
      "email": form.value.email,
      "password": form.value.password,
      "appUser": form.value.appUser,
      "dataNascita": form.value.dataNascita,
      "telefono": form.value.telefono,
      "sesso": form.value.sesso
    };
    console.log(this.registerRequest);
    let resp= this.service.userRegister(this.registerRequest);
    
    resp.subscribe(data=>{ this.router.navigate(['/']);alert("Utente registrato correttamente");});
    
    
  }
  onHome(){
    this.router.navigate(['/'])
  }
}
