import { Component, HostListener, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import {
  CustomerListModel,
  CustomerModel,
  EmployeeListModel,
  SaleListModel,
} from 'src/app/sc-models/sc-models';
import { CustomersServiceService } from 'src/app/service/customers-service.service';
import { EmployeesServiceService } from 'src/app/service/employees-service.service';
import { SalesServiceService } from 'src/app/service/sales-service.service';

export interface SoldProducts {
  id: number;
  saleProductId: number;
  saleProductName: string;
  saleProductPrice: number;
  saleProductQuantity: number;
}

export interface SoldServices {
  id: number;
  saleServiceId: number;
  saleServiceName: string;
  saleServicePrice: number;
  saleServiceQuantity: number;
}
export interface Sale {
  id: number;
  date: string;
  operator: string;
  customer: string;
  flValidity: string;
  soldProducts: SoldProducts[];
  soldServices: SoldServices[];
  total: number;
  notes: string;
}

@Component({
  selector: 'app-sc-sales-archive',
  templateUrl: './sc-sales-archive.component.html',
  styleUrl: './sc-sales-archive.component.css',
})
export class ScSalesArchiveComponent implements OnInit {
  saleList: Sale[] = [];
  employeeList: EmployeeListModel = [];
  customerList: CustomerListModel = [];
  validityList = [
    {
      validityCode: 'VALID',
      validityName: 'Valida',
    },
    {
      validityCode: 'NOT_VALID',
      validityName: 'Non valida',
    },
    {
      validityCode: 'EDITED',
      validityName: 'Modificata',
    },
  ];
  isLoading = false;
  expandedItem: number | null = null;
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;
  pages: number[] = [];
  filteredSuggestions: CustomerListModel = [];
  filtersForm: FormGroup;

  isFiltersVisible = false;

  saleToDelete = 0;

  modalTitle = '';
  modalActionType = '';
  isOpenModal = false;

  isOpen: boolean;
  customerFocused = false; // Variabile per tracciare il focus
  selectedCustomerId: number;

  toggleDetails(index: number): void {
    this.expandedItem = this.expandedItem === index ? null : index;
  }

  constructor(
    private salesService: SalesServiceService,
    private customersService: CustomersServiceService,
    private employeeService: EmployeesServiceService,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit() {
    this.filtersForm = this.formBuilder.group({
      date: [''],
      operator: [''],
      customer: ['', this.customerValidator.bind(this)],
      flValidity: [''],
    });
    try {
      await Promise.all([
        this.getAllCustomers(),
        this.getAllEmployee(),
        this.getPaginatedSalesArchive(),
      ]);
    } catch (error) {
      console.error('Error during initialization:', error);
    } finally {
      this.isLoading = false; // Imposta `isLoading` su false quando tutte le chiamate sono complete
    }
  }

  async getPaginatedSalesArchive(
    date?: string,
    customer?: string,
    operator?: string,
    flValidity?: string
  ): Promise<void> {
    this.isLoading = true;
    return new Promise<void>((resolve, reject) => {
      this.salesService
        .getPaginatedSalesArchive(
          this.currentPage - 1,
          this.pageSize,
          date,
          customer,
          operator,
          flValidity
        )
        .subscribe({
          next: (response: any) => {
            const responseData = response.body; // Se 'observe: response' è impostato nel servizio
            if (responseData) {
              this.saleList = responseData.content;
              this.totalPages = responseData.totalPages;
              this.totalElements = responseData.totalElements;
              this.pages = Array.from(
                { length: this.totalPages },
                (_, i) => i + 1
              );
            } else {
              console.error(
                "Formato della risposta non corretto o 'content' non presente."
              );
            }
          },
          error: (error) => {
            console.error(error);
            reject(error);
          },
          complete: () => {
            this.isLoading = false;
            resolve();
            console.info('complete');
          },
        });
    });
  }

  async getAllCustomers(): Promise<void> {
    this.isLoading = true;
    return new Promise<void>((resolve, reject) => {
      this.customersService.getAllCustomer().subscribe({
        next: (response: CustomerListModel) => {
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

  async getAllEmployee(): Promise<void> {
    this.isLoading = true;
    return new Promise<void>((resolve, reject) => {
      this.employeeService.getAllEmployeeAPI().subscribe({
        next: (response: EmployeeListModel) => {
          this.employeeList = response;
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

  public deleteSale(id: number): void {
    this.isLoading = true;
    this.salesService.deleteSale(id).subscribe({
      next: (response: string) => {
        // this.alertMessageType = "SUCCESS";
        // this.onShowAlert("Vendita eliminata con succeso");
      },
      error: (error) => {
        this.isLoading = false;
        //this.alertMessageType = "ERROR";
        console.log(error.error);
        //this.onShowAlert(error.error);
      },
      complete: () => {
        this.getPaginatedSalesArchive();
      },
    });
  }

  convertDate(dateString: string) {
    const parts = dateString.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${day}/${month}/${year}`;
  }

  navigateToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const { date, customer, operator, flValidity } = this.filtersForm.value;
    const selectedOperator = this.employeeList.find(
      (emp) => emp.id === operator
    );
    const operatorName = selectedOperator
      ? `${selectedOperator.nome} ${selectedOperator.cognome}`
      : undefined;
    this.getPaginatedSalesArchive(date, customer, operatorName, flValidity);
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.autocomplete-container')) {
      this.isOpen = false; // Chiude la lista se il clic è fuori dal contenitore
    }
  }

  onInputChange() {
    const filterValue = this.filtersForm.value.customer.toLowerCase();
    this.filteredSuggestions = this.customerList.filter((cliente) =>
      `${cliente.nome} ${cliente.cognome}`.toLowerCase().includes(filterValue)
    );
    this.isOpen = this.filteredSuggestions.length > 0; // Mostra la lista solo se ci sono suggerimenti
  }

  selectSuggestion(suggestion: CustomerModel) {
    if (suggestion && suggestion.nome && suggestion.cognome) {
      const customerDenomination = suggestion.nome + ' ' + suggestion.cognome;
      const customerField = this.filtersForm.get('customer');
      if (customerField) {
        customerField.setValue(customerDenomination);
        customerField.markAsTouched(); // Assicurati che il campo sia contrassegnato come toccato
        customerField.updateValueAndValidity(); // Aggiorna la validità del campo
      }
      this.filteredSuggestions = []; // Pulisce la lista dei suggerimenti
      this.selectedCustomerId = suggestion.id;
      this.isOpen = false; // Chiude la lista dei suggerimenti
    }
  }

  onSubmit() {
    //logica di ricerca per filtri
    const date = this.filtersForm.get('date')?.value ?? null;
    const operator = parseInt(this.filtersForm.get('operator')?.value ?? null);
    const customer = this.filtersForm.get('customer')?.value ?? null;
    const validity = this.filtersForm.get('flValidity')?.value ?? null;

    // Trova il nome e il cognome dell'operatore dalla lista se necessario
    const selectedOperator = this.employeeList.find(
      (emp) => emp.id === operator
    );

    const operatorName = selectedOperator
      ? `${selectedOperator.nome} ${selectedOperator.cognome}`
      : undefined;

    console.log(date, customer, operatorName, validity);
    this.currentPage = 1;
    this.getPaginatedSalesArchive(date, customer, operatorName, validity);
  }

  onResetFilters() {
    this.filtersForm.get('date')?.reset();
    this.filtersForm.get('operator')?.reset();
    this.filtersForm.get('customer')?.reset();
    this.filtersForm.get('flValidity')?.reset();

    this.getPaginatedSalesArchive();
  }

  openModal(actionType: string, selectedSale?: Sale) {
    this.modalActionType = actionType;
    if (selectedSale) this.saleToDelete = selectedSale.id;
    this.isOpenModal = true;
    this.setModalTitle();
    //this.initializeForm(selectedSale);
  }

  // initializeForm(selectedEmployee?: EmployeeModel) {
  //   switch (this.modalActionType) {
  //     case 'EDIT':
  //       if (selectedEmployee) this.selectedEmployee = { ...selectedEmployee };
  //       this.form.patchValue({
  //         nome: this.selectedEmployee.nome,
  //         cognome: this.selectedEmployee.cognome,
  //         cellulare: this.selectedEmployee.cellulare,
  //         email: this.selectedEmployee.email,
  //         dataAssunzione: this.selectedEmployee.dataAssunzione,
  //         dataScadenzaContratto: this.selectedEmployee.dataScadenzaContratto,
  //       });
  //       break;
  //     case 'ADD':
  //       break;
  //     case 'DELETE':
  //       break;
  //     default:
  //       console.error('Azione non supportata');
  //   }
  // }

  setModalTitle() {
    switch (this.modalActionType) {
      case 'EDIT':
        this.modalTitle = 'Modifica Vendita';
        break;
      case 'ADD':
        this.modalTitle = 'Aggiungi Dipendente';
        break;
      case 'DELETE':
        this.modalTitle = 'Conferma Eliminazione';
        break;
      default:
        this.modalTitle = '';
    }
  }

  performAction() {
    // Esegui azioni in base al tipo di azione
    switch (this.modalActionType) {
      case 'EDIT':
        //this.updateEmployee();
        break;
      case 'ADD':
        //this.addNewEmployee();
        break;
      case 'DELETE':
        this.deleteSale(this.saleToDelete);
        break;
      default:
        console.error('Azione non supportata');
    }
    this.closeModal();
  }

  closeModal() {
    this.isOpenModal = false;
    //this.onReset();
  }

  // onSubmit() {
  //   this.submitted = true;

  //   if (this.modalActionType === 'EDIT' || this.modalActionType === 'ADD') {
  //     if (this.form.invalid) {
  //       return;
  //     }
  //   }
  //   this.performAction();
  // }
}
