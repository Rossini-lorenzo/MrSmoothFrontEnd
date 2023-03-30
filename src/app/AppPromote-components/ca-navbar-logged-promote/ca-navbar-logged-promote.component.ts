import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AroundClientService } from 'src/app/service/around-client.service';

@Component({
  selector: 'app-ca-navbar-logged-promote',
  templateUrl: './ca-navbar-logged-promote.component.html',
  styleUrls: ['./ca-navbar-logged-promote.component.css']
})
export class CaNavbarLoggedPromoteComponent {

  constructor(private router: Router,private service:AroundClientService) { }
  onLogout(){ 
    this.service.logout();
    this.router.navigate(['/']);
  }
}
