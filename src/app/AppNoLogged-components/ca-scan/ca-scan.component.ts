import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ScannerQRCodeConfig, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { ProductServiceService } from 'src/app/service/product-service.service';

interface Product {
  id: string;
  prezzo: number;
  nomeProdotto: string;
  quantita: number;
}

@Component({
  selector: 'app-ca-scan',
  templateUrl: './ca-scan.component.html',
  styleUrls: ['./ca-scan.component.css'],
})
export class CaScanComponent implements OnInit {
  displayedColumns: string[] = ['id', 'prezzo', 'nomeProdotto', 'quantita'];
  dataSource: Product[] = [];
  productIsPresent = false;
  apiCalled = false;
  productId = '';
  productName = '';
  productPrize = 0;
  quantity = 0;
  selectedProduct: Product = {
    id: '',
    prezzo: 0,
    nomeProdotto: '',
    quantita: 0,
  };
  confirmDelete = false;
  isButtonDisabled: boolean = false;
  isEditing: boolean = false;

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth,
      },
    },
  };

  constructor(private productService: ProductServiceService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  onEvent(event: ScannerQRCodeResult[], action: any): void {
    const scannedValue = event[0].value;

    if (!this.apiCalled || this.productId !== scannedValue) {
      this.productId = scannedValue;
      this.apiCalled = false;
      this.onProductIdChange();
    }

    if (!this.apiCalled) {
      this.productService.checkProduct(scannedValue).subscribe({
        next: (response: any) => {
          const responseData = response.body;
          this.productIsPresent = responseData.presente;
        },
        error: (error) => console.error(error),
        complete: () => console.info('complete'),
      });

      this.apiCalled = true;
    }
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

  public addProduct(): void {
    this.productService
      .addProduct(
        this.productId,
        this.productPrize,
        this.quantity,
        this.productName
      )
      .subscribe({
        next: (response: any) => {
          alert(response);

          this.productName = '';
          this.productId = '';
          this.productPrize = 0;
          this.quantity = 0;

          this.apiCalled = false;
          this.productIsPresent = false;
        },
        error: (error) => console.error(error),
        complete: () => {
          console.info('complete');
          this.getAllProducts();
        },
      });

    this.isButtonDisabled = false;
  }

  public getAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        const responseData = response.body;
        this.dataSource = responseData;
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
  }

  public deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe({
      next: (response: any) => {
        alert(response);
      },
      error: (error) => console.error(error),
      complete: () => {
        console.info('complete');
        this.getAllProducts();
      },
    });
  }

  public updateProduct(): void {
    if (!this.selectedProduct) return;

    this.productService
      .updateProduct(
        this.selectedProduct.id,
        this.selectedProduct.prezzo,
        this.selectedProduct.quantita,
        this.selectedProduct.nomeProdotto
      )
      .subscribe({
        next: (response: any) => {
          alert(response);

          this.apiCalled = false;
          //this.productIsPresent = false;
        },
        error: (error) => console.error(error),
        complete: () => {
          console.info('complete');
          this.getAllProducts();
        },
      });
  }

  onProductIdChange(): void {
    this.productName = '';
    this.productPrize = 0;
    this.quantity = 0;
  }

  areFieldsFilled(): boolean {
    if (this.isEditing) {
      return false; // Disabilita il pulsante "Aggiungi" durante l'azione di modifica
    } else if (this.productIsPresent && this.quantity > 0) {
      return true;
    } else {
      return (
        this.productName !== '' &&
        this.productPrize !== 0 &&
        this.quantity !== 0
      );
    }
  }

  selectProductForEdit(productId: string) {
    const product = this.dataSource.find((item) => item.id === productId);
    if (product) {
      this.isEditing = true; // Imposta isEditing su true quando si avvia l'azione di modifica
      this.selectedProduct = { ...product };
      this.productName = this.selectedProduct.nomeProdotto;
      this.productPrize = this.selectedProduct.prezzo;
      this.quantity = this.selectedProduct.quantita;
      this.confirmDelete = false;
    } else {
      this.selectedProduct = {
        id: '',
        prezzo: 0,
        nomeProdotto: '',
        quantita: 0,
      };
      this.isEditing = false; // Imposta isEditing su false se il prodotto non viene trovato
    }
  }

  confirmDeleteProduct(productId: string): void {
    this.selectedProduct = this.dataSource.find(
      (item) => item.id === productId
    ) || { id: '', prezzo: 0, nomeProdotto: '', quantita: 0 };
    this.confirmDelete = true;
  }
}
