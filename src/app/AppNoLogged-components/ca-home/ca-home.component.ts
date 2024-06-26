import { Component, OnInit } from '@angular/core';
import { AroundClientService } from 'src/app/service/around-client.service';


@Component({
selector: 'app-ca-home',
templateUrl: './ca-home.component.html',
styleUrls: ['./ca-home.component.css']
})
export class CaHomeComponent implements OnInit {
  constructor(private service : AroundClientService){
    
  }
  logOut(){
    this.service.logout();
  }
  ngOnInit(): void {
    
  }
}




