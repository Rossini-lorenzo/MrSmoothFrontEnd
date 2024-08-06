import { Component, Inject, OnInit } from '@angular/core';
import { AroundClientService } from '../../service/around-client.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ca-login',
  templateUrl: './ca-login.component.html',
  styleUrls: ['./ca-login.component.css'],
})
export class CaLoginComponent implements OnInit {
  response: any;
model: any;

  ngOnInit(): void {localStorage.setItem('googleAuthCode', "")}
  constructor(private service: AroundClientService, private router: Router) {}

  username: string;
  password: string;
  authRequest: any;
  role: any;

  onSubmit(form: NgForm) {
    
    this.authRequest = {
      username: form.value.username,
      password: form.value.password,
    };
    this.getAccessToken(this.authRequest);
    console.log(this.service.isLoggedIn());
  }

  public getAccessToken(authRequest: any) {
    const resp = this.service.generateToken(authRequest);
    resp.subscribe((data) => {
      console.log('DATA LOGIN ', data);
      this.accessApi(JSON.parse(data));
    });
  }

  public accessApi(payload: any) {
    const resp = this.service.welcome(payload.token, payload.role, payload.id,payload.piva,payload.companyName);
    resp.subscribe((data) => {
      this.response = data;
      if (payload.role == 'ROLE_PROMOTE') {
        this.router.navigate(['/smart-control']);
        console.log('promote');
      } else {
        this.router.navigate(['/smart-control']);
        console.log('user');
      }
    });
  }
  onHome() {
    this.router.navigate(['/']);
  }
  annulla() {
    this.username = ''; // Resetta il campo username
    this.password = ''; // Resetta il campo password
  }
  
}

// modifiare il login che se è promoto apre pagina promote altrimenti user
