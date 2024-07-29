import { Component, HostListener, OnInit } from '@angular/core';
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
import { Customer } from '../sc-customers-management/sc-customers-management.component';
import { CustomersServiceService } from 'src/app/service/customers-service.service';

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
  articleName: string;
  articlePrice: number;
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
  customerList: Customer[] = [];
  filteredSuggestions: Customer[] = [];
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
  isOpen: boolean;
  customerFocused = false; // Variabile per tracciare il focus

  constructor(
    private salesService: SalesServiceService,
    private servicesService: ServicesServiceService,
    private employeeService: EmployeesServiceService,
    private productService: ProductServiceService,
    private customersService: CustomersServiceService,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit() {
    this.form = this.formBuilder.group({
      operator: ['', Validators.required],
      customer: ['', [Validators.required, this.customerValidator.bind(this)]],
      productId: ['', Validators.required],
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productQuantity: [
        '',
        [Validators.required, this.articleQuantityValidator.bind(this)],
      ],
      service: ['', Validators.required],
      serviceId: ['', Validators.required],
      serviceQuantity: ['', Validators.required],
      servicePrice: ['', Validators.required],
      notes: ['', Validators.required],
    });
    try {
      await Promise.all([
        this.getAllCustomers(),
        this.getAllServices(),
        this.getAllEmployee(),
        this.getAllProducts(),
      ]);
    } catch (error) {
      console.error('Error during initialization:', error);
    } finally {
      this.isLoading = false; // Imposta `isLoading` su false quando tutte le chiamate sono complete
    }
  }

  async getAllCustomers(): Promise<void> {
    this.isLoading = true;
    return new Promise<void>((resolve, reject) => {
      this.customersService.getAllCustomer().subscribe({
        next: (response: Customer[]) => {
          this.customerList = response;
        },
        error: (error) => {
          console.error(error);
          reject(error);
        },
        complete: () => {
          resolve();
          console.info('getAllCustomers complete');
        },
      });
    });
  }

  async getAllServices(): Promise<void> {
    this.isLoading = true;
    return new Promise<void>((resolve, reject) => {
      this.servicesService.getAllService().subscribe({
        next: (response: any) => {
          this.serviceList = response.body;
        },
        error: (error) => {
          console.error(error);
          reject(error);
        },
        complete: () => {
          resolve();
          console.info('getAllServices complete');
        },
      });
    });
  }

  async getAllEmployee(): Promise<void> {
    this.isLoading = true;
    return new Promise<void>((resolve, reject) => {
      this.employeeService.getAllEmployee().subscribe({
        next: (response: any) => {
          this.employeeList = response.body;
        },
        error: (error) => {
          console.error(error);
          reject(error);
        },
        complete: () => {
          resolve();
          console.info('getAllEmployee complete');
        },
      });
    });
  }

  async getAllProducts(): Promise<void> {
    this.isLoading = true;
    return new Promise<void>((resolve, reject) => {
      this.productService.getAllProducts().subscribe({
        next: (response: any) => {
          this.productList = response.body;
        },
        error: (error) => {
          console.error(error);
          reject(error);
        },
        complete: () => {
          resolve();
          console.info('getAllProducts complete');
        },
      });
    });
  }

  // onEvent(event: ScannerQRCodeResult[], action: any): void {
  //   const scannedValue = event[0].value;
  //   this.productId = scannedValue;
  // }

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
          articleName: item.article,
          articlePrice: item.articlePrice,
          articleQuantity: item.articleQuantity,
        });
      } else {
        soldServices.push({
          id: item.id,
          articleName: item.article,
          articlePrice: item.articlePrice,
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

  removeArticleFromReceipt(deleteArticleId: number) {
    const index = this.salesReceipt.findIndex(
      (article) => article.id === deleteArticleId
    );
    if (index !== -1) {
      this.salesReceipt.splice(index, 1);
    }
  }

  calculateTotal(): string {
    let total = 0;

    for (const article of this.salesReceipt) {
      total += article.articlePrice * article.articleQuantity;
    }

    return total.toFixed(2);
  }

  // public handle(action: any, fn: string): void {
  //   const playDeviceFacingBack = (devices: any[]): void => {
  //     const device = devices.find((f) =>
  //       /back|rear|environment/gi.test(f.label)
  //     );
  //     action.playDevice(device ? device.deviceId : devices[0].deviceId);
  //   };

  //   if (fn === 'start') {
  //     action[fn](playDeviceFacingBack).subscribe(
  //       (r: any) => console.log(fn, r),
  //       alert
  //     );
  //   } else {
  //     action[fn]().subscribe((r: any) => console.log(fn, r), alert);
  //   }
  // }

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

  checkOperatorAndCustomer(type: string) {
    this.submitted = true;
    const operatorField = this.form.get('operator');
    const customerField = this.form.get('customer');

    // Verifica se ci sono errori per i campi
    const operatorInvalid = operatorField?.invalid;
    const customerInvalid = customerField?.invalid;

    // Verifica se ci sono errori specifici per il campo customer
    const customerRequired = customerField?.hasError('required');
    const customerInvalidCustomer = customerField?.hasError('invalidCustomer');

    // Se ci sono errori specifici per il campo customer
    if (operatorInvalid || customerInvalid) {
      // Mostra errori specifici per il campo customer se è invalid
      if (customerInvalid) {
        if (customerRequired) {
          console.log('Campo obbligatorio');
        } else if (customerInvalidCustomer) {
          console.log('Campo non valido');
        }
      }
      return;
    }

    // Se non ci sono errori, esegui l'azione desiderata
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
      this.form.get('productName')?.reset();
      this.form.get('productPrice')?.reset();
      this.form.get('productQuantity')?.reset();
    } else if (this.articleType === 'SERVICE') {
      this.form.get('service')?.reset();
      this.form.get('serviceId')?.reset();
      this.form.get('serviceQuantity')?.reset();
      this.form.get('servicePrice')?.reset();
    }
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.autocomplete-container')) {
      this.isOpen = false; // Chiude la lista se il clic è fuori dal contenitore
    }
  }

  onInputChange() {
    const filterValue = this.form.value.customer.toLowerCase();
    this.filteredSuggestions = this.customerList.filter((cliente) =>
      `${cliente.nome} ${cliente.cognome}`.toLowerCase().includes(filterValue)
    );
    this.isOpen = this.filteredSuggestions.length > 0; // Mostra la lista solo se ci sono suggerimenti
  }

  selectSuggestion(suggestion: any) {
    if (suggestion && suggestion.nome && suggestion.cognome) {
      const customerDenomination = suggestion.nome + ' ' + suggestion.cognome;
      const customerField = this.form.get('customer');
      if (customerField) {
        customerField.setValue(customerDenomination);
        customerField.markAsTouched(); // Assicurati che il campo sia contrassegnato come toccato
        customerField.updateValueAndValidity(); // Aggiorna la validità del campo
      }
      this.filteredSuggestions = []; // Pulisce la lista dei suggerimenti
      this.isOpen = false; // Chiude la lista dei suggerimenti
    }
  }

  customerValidator(control: AbstractControl) {
    const value = control.value?.toLowerCase();
    if (
      this.customerList.some(
        (cliente) =>
          `${cliente.nome} ${cliente.cognome}`.toLowerCase() === value
      )
    ) {
      return null; // Valido
    }
    return { invalidCustomer: true }; // Non valido
  }

  articleQuantityValidator(control: AbstractControl) {
    const value = control.value;
    // Verifica se il valore è un numero e maggiore di 0
    if (value === null || value === undefined || value <= 0) {
      return { positiveNumber: { value } };
    }
    return null; // Non valido
  }

  onCustomerBlur() {
    this.customerFocused = false;
    const customerField = this.form.get('customer');
    if (customerField) {
      customerField.markAsTouched(); // Contrassegna il campo come toccato
      customerField.updateValueAndValidity(); // Forza l'aggiornamento della validità
    }
  }

  onCustomerFocus() {
    this.customerFocused = true;
  }

  resetChest() {
    this.form.reset();
    this.salesReceipt = [];
    this.articleType = '';
  }
}
