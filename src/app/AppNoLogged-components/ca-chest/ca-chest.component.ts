import { Component } from '@angular/core';
import { ScannerQRCodeConfig, ScannerQRCodeResult } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-ca-chest',
  templateUrl: './ca-chest.component.html',
  styleUrls: ['./ca-chest.component.css']
})
export class CaChestComponent {

  productId: string;

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth,
      },
    },
  };

  onEvent(event: ScannerQRCodeResult[], action: any): void {
    const scannedValue = event[0].value;
    this.productId = scannedValue;
  
  //   if (!this.apiCalled || this.productId !== scannedValue) {
  //     this.productId = scannedValue;
  //     this.apiCalled = false;
  //     this.onProductIdChange();
  //   }
  
  //   if (!this.apiCalled) {
  //     this.productService.checkProduct(scannedValue).subscribe({
  //       next: (response: any) => {
  //         const responseData = response.body;
  //         this.productIsPresent = responseData.presente;
  //       },
  //       error: (error) => console.error(error),
  //       complete: () => console.info('complete'),
  //     });
  
  //     this.apiCalled = true;
  //   }
  } 

  public handle(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: any[]): void => {
      const device = devices.find((f) =>
        /back|rear|environment/gi.test(f.label)
      );
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

}
