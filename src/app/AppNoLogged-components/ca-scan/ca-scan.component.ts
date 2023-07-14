import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ScannerQRCodeConfig, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { PartialObserver } from 'rxjs';
import { ProductServiceService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-ca-scan',
  templateUrl: './ca-scan.component.html',
  styleUrls: ['./ca-scan.component.css'],
})
export class CaScanComponent {
  
  constructor(private productService: ProductServiceService) {
    this.productIsPresent = false;
    this.apiCalled = false;
  }
  productIsPresent: boolean;
  apiCalled: boolean;
  public productId: string;
  productName: string;
  productPrize: string;
  quantity: number;
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

  // public onEvent(e: ScannerQRCodeResult[], action?: any): void {
  //   // e && action && action.pause();
  //   console.log(e);
  // }

  // onEvent(event: ScannerQRCodeResult[], action: any) {
  //   const scannedValue = event[0].value;
  //   this.productId = scannedValue;

  //   // Altri codici di gestione dell'evento...
  // }

  onEvent(event: ScannerQRCodeResult[], action: any) {
    if (!this.apiCalled) {
      const scannedValue = event[0].value;
      this.productId = scannedValue;
  
      // const observer: PartialObserver<HttpResponse<Object[]>> = {
      //   next: (response: HttpResponse<Object[]>) => {
      //     // Qui puoi gestire la risposta dell'API come desideri
      //     const responseData = response.body;
      //     // Esegui le operazioni necessarie con la risposta
  
      //     // Ad esempio, puoi assegnare la risposta a una variabile o utilizzarla in altre logiche
      //     this.productResponse = responseData;
  
      //     // Altri codici di gestione della risposta...
      //   },
      //   error: (error) => {
      //     // Gestisci eventuali errori nella chiamata API
      //   }
      // };
  
      this.productService.checkProduct(scannedValue).subscribe({
        next: (response: any) => {
          const responseData = response.body;
          this.productIsPresent = responseData.presente;
          console.log(this.productIsPresent);
          //alert(response);
        },
        error: (error) => console.error(error),
        complete: () => console.info('complete'),
      });
  
      this.apiCalled = true;
    }
  
    // Altri codici di gestione dell'evento...
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
      .addProduct(this.productId, parseFloat(this.productPrize), this.quantity, this.productName)
      .subscribe({
        next: (response: any) => {
          alert(response);
        },
        error: (error) => console.error(error),
        complete: () => console.info('complete'),
      });
  }
}
