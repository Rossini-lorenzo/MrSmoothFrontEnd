import { Component, OnInit } from '@angular/core';
import { AroundClientService } from 'src/app/service/around-client.service';
import MenuConfig from '../config/menuConfig.json';


@Component({
selector: 'app-ca-home',
templateUrl: './ca-home.component.html',
styleUrls: ['./ca-home.component.css']
})
export class CaHomeComponent implements OnInit {
  constructor(private service : AroundClientService){
    
  }
  menuItems = MenuConfig;
  isOpen: boolean[] = [];

  ngOnInit() {
    this.isOpen = new Array(this.menuItems.length).fill(false);
  }

  toggleAccordion(index: number) {
    this.isOpen[index] = !this.isOpen[index];
  }

  onMouseOver(event: Event) {
    (event.target as HTMLElement).style.textDecoration = 'underline';
  }

  onMouseOut(event: Event) {
    (event.target as HTMLElement).style.textDecoration = 'none';
  }

  onFocus(event: Event) {
    (event.target as HTMLElement).style.textDecoration = 'underline';
  }

  onBlur(event: Event) {
    (event.target as HTMLElement).style.textDecoration = 'none';
  }
}