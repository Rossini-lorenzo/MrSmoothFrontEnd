import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AroundClientService } from '../../service/around-client.service';

@Component({
  selector: 'app-ca-navbar',
  templateUrl: './ca-navbar.component.html',
  styleUrls: ['./ca-navbar.component.css']
})
export class CaNavbarComponent {
  constructor(private router: Router,private service:AroundClientService) { }

  onInit(){
    
  }
  
  onRegister(){
    this.router.navigate(['/registrazione']);
  }
  onLogin() {
    this.router.navigate(['/login']);
    console.log("TOKEN"+ this.service.isLoggedIn()+"  "+  localStorage.getItem('token'))
  }
  
}
