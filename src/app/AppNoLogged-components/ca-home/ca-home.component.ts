import { Component, OnInit } from '@angular/core';
import { AroundClientService } from 'src/app/service/around-client.service';
import MenuConfig from '../config/menuConfig.json';
import { Router, ActivatedRoute, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { filter } from 'rxjs';
import { ProductServiceService } from 'src/app/service/product-service.service';
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


  selectedShop: any;
  shops: any= []; 

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private service: AroundClientService,
    private productService: ProductServiceService
  ) {}

  ngOnInit() {





    // IMPORTO TUTTI I NEGOZI PER LA SELECT DEI NEGOZI
    this.productService.getUser(localStorage.getItem("id")).subscribe({
      next: (response: any) => {
        
        const responseData = response.body; // Accesso al corpo della risposta
        console.log("Response data:", responseData); // Logga i dati ricevuti
        
          for (const sh of responseData.shops) {
            const shop = {
              shopId: sh.shopId,
              shopName: sh.shopName,
            };
            this.shops.push(shop);
          }

          if (this.shops.length > 0 && localStorage.getItem("shopId")==null) {
            this.selectedShop = this.shops[0].shopId;
            localStorage.setItem('shopId', this.shops[0].shopId);
          }else{
            this.selectedShop=localStorage.getItem("shopId")
          }

        
       
      },
      error: (error) => console.error(error),
      complete: () => {console.info('complete');console.log(this.shops)},
    });
  

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

  onShopChange(selectedShopId: string): void {
    localStorage.setItem('shopId', selectedShopId);
    console.log('Shop ID changed:', selectedShopId); // Per debug, opzionale
     // Ottieni l'URL corrente
     const currentUrl = this.router.url;
     console.log('Current URL:', currentUrl); // Per debug, opzionale
     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  

  }
  
}