import { Component, OnInit } from '@angular/core';
import { AroundClientService } from 'src/app/service/around-client.service';
import MenuConfig from '../config/menuConfig.json';
import { Router, ActivatedRoute, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { filter } from 'rxjs';
@Component({
selector: 'app-ca-home',
templateUrl: './ca-home.component.html',
styleUrls: ['./ca-home.component.css']
})
export class CaHomeComponent implements OnInit {
  breadcrumbs: string[] = [];
  companyName: any = '';

  menuItems = MenuConfig;
  isOpen: boolean[] = [];
  selectedLink: any = null; // Proprietà per tenere traccia del link selezionato
  isAnimating = false;

  isOpenModal = false;
  modalTitle = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private service: AroundClientService) {}

  ngOnInit() {

 this.companyName = localStorage.getItem('companyName');

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.snapshot.root);
    });
    // Initialize breadcrumbs on component load
    this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.snapshot.root);
  }

  createBreadcrumbs(route: ActivatedRouteSnapshot, url = '', breadcrumbs: string[] = []): string[] {
    const routeConfig = route.routeConfig;
    const label = routeConfig?.data?.['breadcrumb'] || this.capitalize(routeConfig?.path || '');
    // Check if current route is 'smart-control', skip adding it to breadcrumbs
    if (label && label.toLowerCase() !== 'smart-control') {
      breadcrumbs.push(this.capitalize(label));
    }
    if (route.firstChild) {
      return this.createBreadcrumbs(route.firstChild, url, breadcrumbs);
    }
    return breadcrumbs;
  }

  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  toggleAccordion(index: number) {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.isOpen[index] = !this.isOpen[index];
    setTimeout(() => {
      this.isAnimating = false;
    }, 300); // Tempo pari alla durata dell'animazione CSS
  }

  onMouseOver(event: Event) {
    (event.target as HTMLElement).style.cursor = 'pointer';
  }

  onMouseOut(event: Event) {
    (event.target as HTMLElement).style.textDecoration = 'none';
  }

  onFocus(event: Event) {
    (event.target as HTMLElement).style.cursor = 'pointer';
  }

  onBlur(event: Event) {
    (event.target as HTMLElement).style.textDecoration = 'none';
  }

  selectLink(link: any) {
    this.selectedLink = link;
    console.log(link);
  }

  openModal() {
    this.isOpenModal = true;
    this.modalTitle = "Notifiche";
  }

  closeModal() {
    this.isOpenModal = false;
  }
}