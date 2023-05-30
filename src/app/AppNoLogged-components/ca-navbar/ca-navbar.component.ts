import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AroundClientService } from '../../service/around-client.service';

@Component({
  selector: 'app-ca-navbar',
  templateUrl: './ca-navbar.component.html',
  styleUrls: ['./ca-navbar.component.css']
})
export class CaNavbarComponent {
  constructor(private router: Router,private service:AroundClientService) { }

  @Input() showLoginButton: boolean = true;
  @Input() showCosaFareButton: boolean = true;
  @Input() showSignInButton: boolean = true;
  @Input() showIntornoAMeButton: boolean = true;
  @Input() showHomeButton: boolean = false;


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
