import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ScannerQRCodeConfig, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { SalesServiceService } from 'src/app/service/sales-service.service';
import { ServicesServiceService } from 'src/app/service/services-service.service';
import { Service } from '../sc-services-management/sc-services-management.component';
import { Employee } from '../sc-staff-management/sc-staff-management.component';
import { EmployeesServiceService } from 'src/app/service/employees-service.service';
import { Product } from '../sc-summary-warehouse/sc-summary-warehouse.component';
import { ProductServiceService } from 'src/app/service/product-service.service';

export interface Sale {
  date: string;
  operator: string;
  flValidity: string;
  soldProducts: SaleArticle[];
  soldServices: SaleArticle[];
  total: number;
  notes: string;
}

interface SalesReceipt {
  id: number;
  article: string;
  articleQuantity: number;
  articlePrice: number;
  type: string;
}

interface SaleArticle {
  id: number;
  articleQuantity: number;
}

@Component({
  selector: 'app-ca-chest',
  templateUrl: './ca-chest.component.html',
  styleUrls: ['./ca-chest.component.css'],
})
export class CaChestComponent implements OnInit {
  salesReceipt: SalesReceipt[] = [];
  serviceList: Service[] = [];
  employeeList: Employee[] = [];
  productList: Product[] = [];
  service = '';
  quantity = 0;
  price = 0;
  productId: string;

  isLoading = false;

  form: FormGroup;
  submitted = false;

  // Variabili per l'alert di successo
  showSuccessAlert = false;
  successMessage = '';

  articleType = '';

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth,
      },
    },
  };

  constructor(
    private salesService: SalesServiceService,
    private servicesService: ServicesServiceService,
    private employeeService: EmployeesServiceService,
    private productService: ProductServiceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      operator: ['', Validators.required],
      productId: ['', Validators.required],
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productQuantity: ['', Validators.required],
      service: ['', Validators.required],
      serviceId: ['', Validators.required],
      serviceQuantity: ['', Validators.required],
      servicePrice: ['', Validators.required],
      notes: ['', Validators.required],
    });
    this.getAllServicess();
    this.getAllEmployee();
    this.getAllProducts();
  }

  public getAllServicess(): void {
    this.isLoading = true;
    this.servicesService.getAllService().subscribe({
      next: (response: any) => {
        const responseData = response.body;
        this.serviceList = responseData;
      },
      error: (error) => console.error(error),
      complete: () => {
        this.isLoading = false;
        console.info('complete');
      },
    });
  }

  public getAllEmployee(): void {
    this.isLoading = true;
    this.employeeService.getAllEmployee().subscribe({
      next: (response: any) => {
        const responseData = response.body;
        this.employeeList = responseData;
      },
      error: (error) => console.error(error),
      complete: () => {
        this.isLoading = false;
        console.info('complete');
      },
    });
  }

  public getAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        const responseData = response.body;
        this.productList = responseData;
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
  }

  onEvent(event: ScannerQRCodeResult[], action: any): void {
    const scannedValue = event[0].value;
    this.productId = scannedValue;
  }

  addArticleInReceipt() {
    if (this.articleType === 'PRODUCT') {
      this.salesReceipt.push({
        id: this.form.value.productId,
        article: this.form.value.productName,
        articleQuantity: this.form.value.productQuantity,
        articlePrice: this.form.value.productPrice,
        type: this.articleType,
      });
    } else {
      this.salesReceipt.push({
        id: this.form.value.serviceId,
        article: this.form.value.service,
        articleQuantity: this.form.value.serviceQuantity,
        articlePrice: this.form.value.servicePrice,
        type: this.articleType,
      });
    }
    this.onReset();
  }

  registerNewSale() {
    const newSale: Sale = this.form.value;
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Formatta la data come YYYY-MM-DD
    const soldProducts: SaleArticle[] = [];
    const soldServices: SaleArticle[] = [];
    this.salesReceipt.forEach((item) => {
      if (item.type === 'PRODUCT') {
        soldProducts.push({
          id: item.id,
          articleQuantity: item.articleQuantity,
        });
      } else {
        soldServices.push({
          id: item.id,
          articleQuantity: item.articleQuantity,
        });
      }
    });
    const dataToSave: Sale = {
      date: formattedDate,
      operator: newSale.operator,
      flValidity: 'Valid',
      soldProducts: soldProducts,
      soldServices: soldServices,
      total: parseFloat(this.calculateTotal()),
      notes: newSale.notes,
    };
    this.salesService.addSale(dataToSave).subscribe({
      next: (response: any) => {
        this.showSuccess(response);
      },
      error: (error) => console.error(error),
      complete: () => {
        console.log('COMPLETE');
      },
    });
  }

  // removeSale(serviceValue: string) {
  //   const index = this.salesList.findIndex(
  //     (sale) => sale.service === serviceValue
  //   );
  //   if (index !== -1) {
  //     this.salesList.splice(index, 1);
  //   }
  // }

  calculateTotal(): string {
    let total = 0;

    for (const article of this.salesReceipt) {
      total += article.articlePrice * article.articleQuantity;
    }

    return total.toFixed(2);
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

  onSubmit() {
    this.submitted = true;
    if (this.articleType === 'PRODUCT') {
      // Se il tipo di articolo è 'PRODUCT', assicurati che solo i campi rilevanti siano validi
      if (this.form.get('productQuantity')?.invalid) {
        return;
      }
    } else if (this.articleType === 'SERVICE') {
      // Se il tipo di articolo è 'SERVICE', assicurati che tutti i campi relativi ai servizi siano validi
      const service = this.form.get('service');
      const servicePrice = this.form.get('servicePrice');
      const serviceQuantity = this.form.get('serviceQuantity');

      if (
        !service ||
        !servicePrice ||
        !serviceQuantity ||
        service.invalid ||
        servicePrice.invalid ||
        serviceQuantity.invalid
      ) {
        return;
      }
    }
    this.addArticleInReceipt();
  }

  checkOperator(type: string) {
    this.submitted = true;
    const campo = this.form.get('operator');
    if (campo && campo.invalid) {
      return;
    }
    this.articleType = type;
    this.submitted = false;
  }

  onServiceChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.selectedIndex;
    const selectedService = this.serviceList[selectedIndex];
    if (selectedService) {
      this.form
        .get('servicePrice')
        ?.setValue(selectedService.servicePrice.toFixed(2).replace(',', '.'));
      this.form.get('serviceId')?.setValue(selectedService.id);
    }
  }

  onProductChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.selectedIndex;
    const selectedService = this.productList[selectedIndex];
    if (selectedService) {
      this.form
        .get('productPrice')
        ?.setValue(selectedService.prezzo.toFixed(2).replace(',', '.'));
      this.form.get('productId')?.setValue(selectedService.id);
    }
  }

  onReset(): void {
    this.submitted = false;
    if (this.articleType === 'PRODUCT') {
      this.form.get('productQuantity')?.reset();
    } else if (this.articleType === 'SERVICE') {
      this.form.get('service')?.reset();
      this.form.get('serviceId')?.reset();
      this.form.get('serviceQuantity')?.reset();
      this.form.get('servicePrice')?.reset();
    }

    // Reset della variabile dell'articolo
    this.articleType = '';
  }

  showSuccess(message: string): void {
    this.successMessage = message;
    this.showSuccessAlert = true;
    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 2500);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
