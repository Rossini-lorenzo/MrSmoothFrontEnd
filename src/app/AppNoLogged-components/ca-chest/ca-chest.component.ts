import { Component, OnInit } from '@angular/core';
import { ScannerQRCodeConfig, ScannerQRCodeResult } from 'ngx-scanner-qrcode';

export interface Sale {
  service: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-ca-chest',
  templateUrl: './ca-chest.component.html',
  styleUrls: ['./ca-chest.component.css'],
})
export class CaChestComponent implements OnInit {
  displayedColumns: string[] = ['service', 'quantity', 'price'];
  salesList: Sale[] = [];
  service = '';
  quantity = 0;
  price = 0;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
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

  addSale() {
    this.salesList.push({
      service: this.service,
      quantity: this.quantity,
      price: this.price,
    });
    this.service = '';
    this.quantity = 0;
    this.price = 0;
  }

  removeSale(serviceValue: string) {
    const index = this.salesList.findIndex(
      (sale) => sale.service === serviceValue
    );
    if (index !== -1) {
      this.salesList.splice(index, 1);
    }
  }

  calculateTotal(): number {
    let total = 0;
  
    for (const sale of this.salesList) {
      // Supponendo che la proprietà "price" e "quantity" esistano nell'oggetto Sale.
      total += sale.price * sale.quantity;
    }
  
    return total;
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
