import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ScannerQRCodeConfig, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { PartialObserver } from 'rxjs';
import { ProductServiceService } from 'src/app/service/product-service.service';

// interface Product {
//   id: string;
//   // altre proprietà del prodotto
// }

@Component({
  selector: 'app-ca-scan',
  templateUrl: './ca-scan.component.html',
  styleUrls: ['./ca-scan.component.css'],
})
export class CaScanComponent implements OnInit {
  constructor(private productService: ProductServiceService) {
    this.productIsPresent = false;
    this.apiCalled = false;
  }

  displayedColumns: string[] = ['id', 'prezzo', 'nomeProdotto', 'quantita'];
  dataSource: any[] = [];
  productIsPresent: boolean;
  apiCalled: boolean;
  productId: string;
  productName: string;
  productPrize: number;
  quantity: number;
  selectedProduct: any = {};
  form: NgForm;

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth,
      },
    },
    // canvasStyles: [
    //   { /* layer */
    //     lineWidth: 1,
    //     fillStyle: '#00950685',
    //     strokeStyle: '#00950685',
    //   },
    //   { /* text */
    //     font: '17px serif',
    //     fillStyle: '#ff0000',
    //     strokeStyle: '#ff0000',
    //   }
    // ],
  };

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getAllProduct();
    console.log(this.productId, this.productName, this.productPrize, this.quantity);
  }

  onEvent(event: ScannerQRCodeResult[], action: any) {
    const scannedValue = event[0].value;
  
    if (!this.apiCalled || this.productId !== scannedValue) {
      this.productId = scannedValue;
      this.apiCalled = false; // Ripristina il flag apiCalled per consentire una nuova chiamata API
      this.onProductIdChange(); // Reimposta gli altri campi di input associati al nuovo prodotto
    }
  
    // Chiamata API per verificare il prodotto
    this.productService.checkProduct(scannedValue).subscribe({
      next: (response: any) => {
        const responseData = response.body;
        this.productIsPresent = responseData.presente;
        console.log(this.productIsPresent);
        // Altri codici di gestione della risposta...
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
  
    this.apiCalled = true;
  }  
  

  public handle(action: any, fn: string): void {
    // Fix issue #27, #29
    const playDeviceFacingBack = (devices: any[]) => {
      // front camera or back camera check here!
      const device = devices.find((f) =>
        /back|rear|environment/gi.test(f.label)
      ); // Default Back Facing Camera
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    };

    if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe(
        (r: any) => console.log(fn, r),
        alert
      );
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
    }
  }

  public addProduct() {
    this.productService
      .addProduct(
        this.productId,
        parseFloat(this.productPrize.toFixed(2)),
        this.quantity,
        this.productName
      )
      .subscribe({
        next: (response: any) => {
          alert(response);

          // La chiamata API è andata a buon fine
          // Svuota i campi productName, productId, productPrize, quantity
          this.productName = '';
          this.productId = '';
          this.productPrize = 0;
          this.quantity = 0;

          // Nascondi i campi productName, productId, productPrize, quantity
          this.apiCalled = false;
          this.productIsPresent = false;

          // Esegui altre azioni o visualizza un messaggio di successo
        },
        error: (error) => console.error(error),
        complete: () => {
          console.info('complete');
          this.getAllProduct();
        },
      });
  }

  public getAllProduct() {
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        const responseData = response.body;
        this.dataSource = responseData;
        console.log(this.dataSource);
        //alert(response);
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
  }

  deleteProduct(id: string) {
    this.productService
      .deleteProduct(
        id
      )
      .subscribe({
        next: (response: any) => {
          alert(response);
        },
        error: (error) => console.error(error),
        complete: () => {
          console.info('complete');
          this.getAllProduct();
        },
      });
  }

  onProductIdChange() {
    // Imposta gli altri campi di input su vuoti
    this.productName = '';
    this.productPrize = 0;
    this.quantity = 0;
  }

  areFieldsFilled(): boolean {
    return (
      this.productId !== undefined &&
      this.productPrize !== undefined &&
      this.quantity !== undefined &&
      this.productName !== undefined &&
      this.productId !== '' &&
      this.productPrize !== 0 &&
      this.quantity !== 0 &&
      this.productName !== ''
    );
  }

  selectProductForEdit(productId: string) {
    this.selectedProduct = this.dataSource.find(item => item.id === productId);
    console.log(this.selectedProduct?.id);
  }
}
