import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AroundClientService } from '../../service/around-client.service';


@Component({
  selector: 'app-ca-navbar-logged',
  templateUrl: './ca-navbar-logged.component.html',
  styleUrls: ['./ca-navbar-logged.component.css']
})
export class CaNavbarLoggedComponent {

  constructor(private router: Router,private service:AroundClientService) { }
  onLogout(){ 
    this.service.logout();
    this.router.navigate(['/']);
  }

}
