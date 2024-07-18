import { Component, OnInit } from '@angular/core';
import { AroundClientService } from 'src/app/service/around-client.service';
import MenuConfig from '../config/menuConfig.json';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-ca-home',
  templateUrl: './ca-home.component.html',
  styleUrls: ['./ca-home.component.css'],
})
export class CaHomeComponent implements OnInit {
  breadcrumbs: string[] = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: AroundClientService
  ) {}
  menuItems = MenuConfig;
  isOpen: boolean[] = [];

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(
          this.activatedRoute.snapshot.root
        );
      });

    // Initialize breadcrumbs on component load
    this.breadcrumbs = this.createBreadcrumbs(
      this.activatedRoute.snapshot.root
    );
  }

  createBreadcrumbs(
    route: ActivatedRouteSnapshot,
    url = '',
    breadcrumbs: string[] = []
  ): string[] {
    const routeConfig = route.routeConfig;
    const label =
      routeConfig?.data?.['breadcrumb'] ||
      this.capitalize(routeConfig?.path || '');

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



  

  isAnimating: boolean = false;

  toggleAccordion(index: number) {
    if (this.isAnimating) return;
    this.isAnimating = true;
  
    this.isOpen[index] = !this.isOpen[index];
  
    setTimeout(() => {
      this.isAnimating = false;
    }, 300); // Tempo pari alla durata dell'animazione CSS
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

  logOut() {
    this.service.logout();
  }
}
