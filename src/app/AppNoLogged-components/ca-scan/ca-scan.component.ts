import { Component } from '@angular/core';
import { ScannerQRCodeConfig, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { ProductServiceService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-ca-scan',
  templateUrl: './ca-scan.component.html',
  styleUrls: ['./ca-scan.component.css']
})
export class CaScanComponent {

  constructor(private productService : ProductServiceService) { }

  public productName: string = '';

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth
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

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    // e && action && action.pause();
    console.log(e);
  }

  // onEvent(event: ScannerQRCodeResult[], action: any) {
  //   const scannedValue = event[0].value;
  //   this.productName = scannedValue;
  
  //   // Altri codici di gestione dell'evento...
  // }
  
  
  

  public handle(action: any, fn: string): void {
    // Fix issue #27, #29
    const playDeviceFacingBack = (devices: any[]) => {
      // front camera or back camera check here!
      const device = devices.find(f => (/back|rear|environment/gi.test(f.label))); // Default Back Facing Camera
      action.playDevice(device ? device.deviceId : devices[0].deviceId);

      

    }

    if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe((r: any) => console.log(fn, r), alert);
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
    }
  }


public addProduct(id: string, prezzo: number, quantita: number,nomeProdotto:string){



  this.productService.addProduct(id, prezzo, quantita,nomeProdotto).subscribe
    ({
      next: (response : any) => {
        alert(response);
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete') });
  }
}


