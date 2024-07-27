import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomersServiceService } from 'src/app/service/customers-service.service';

export interface Customer {
  id: number;
  nome: string;
  cognome: string;
  cellulare: number;
  email: string;
  dataNascita: string;
}

@Component({
  selector: 'app-sc-customers-management',
  templateUrl: './sc-customers-management.component.html',
  styleUrl: './sc-customers-management.component.css'
})
export class ScCustomersManagementComponent implements OnInit {
  dataSource: Customer[] = [];
  isLoading = false;

  selectedCustomer: Customer = {
    id: 0,
    nome: '',
    cognome: '',
    cellulare: 0,
    email: '',
    dataNascita: '',
  };

  employeeToDelete = 0;

  modalTitle = '';
  modalActionType = '';
  isOpen = false;

  form: FormGroup;
  submitted = false;

  // Variabili per l'alert di successo
  showSuccessAlert = false;
  successMessage = '';

  constructor(
    private customersService: CustomersServiceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllCustomers();
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      cellulare: [
        '',
        [Validators.required, Validators.pattern(/(\+39|0039)?3[0-9]{9}/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      dataNascita: ['', Validators.required],
      // dataScadenzaContratto: ['', Validators.required],
    });
    // Se è stata selezionata una riga per la modifica, prepopola il form
  }

  public getAllCustomers(): void {
    this.isLoading = true;
    this.customersService.getAllCustomer().subscribe({
      next: (response: any) => {
        const responseData = response.body;
        this.dataSource = responseData;
      },
      error: (error) => console.error(error),
      complete: () => {
        this.isLoading = false;
        console.info('complete');
      },
    });
  }

  public addNewCustomer(): void {
    this.isLoading = true;
    const newCustomer: Customer = this.form.value;
    this.customersService
      .addCustomer(
        newCustomer.nome,
        newCustomer.cognome,
        newCustomer.email,
        newCustomer.cellulare,
        newCustomer.dataNascita,
      )
      .subscribe({
        next: (response: any) => {
          this.showSuccess(response);
        },
        error: (error) => console.error(error),
        complete: () => {
          this.getAllCustomers();
        },
      });
  }

  public updateCustomer(): void {
    this.isLoading = true;
    this.selectedCustomer = {
      ...this.selectedCustomer,
      ...this.form.value,
    };
    if (!this.selectedCustomer) return;

    this.customersService
      .updateCustomer(
        this.selectedCustomer.id,
        this.selectedCustomer.nome,
        this.selectedCustomer.cognome,
        this.selectedCustomer.email,
        this.selectedCustomer.cellulare,
        this.selectedCustomer.dataNascita,
      )
      .subscribe({
        next: (response: any) => {
          this.showSuccess(response);
        },
        error: (error) => console.error(error),
        complete: () => {
          this.getAllCustomers();
        },
      });
  }

  public deleteCustomer(id: number): void {
    this.isLoading = true;
    this.customersService.deleteCustomer(id).subscribe({
      next: (response: any) => {
        this.showSuccess(response);
      },
      error: (error) => console.error(error),
      complete: () => {
        this.getAllCustomers();
      },
    });
  }

  openModal(actionType: string, selectedEmployee?: Customer) {
    this.modalActionType = actionType;
    if (selectedEmployee) this.employeeToDelete = selectedEmployee.id;
    this.isOpen = true;
    this.setModalTitle();
    this.initializeForm(selectedEmployee);
  }

  initializeForm(selectedEmployee?: Customer) {
    switch (this.modalActionType) {
      case 'EDIT':
        if (selectedEmployee) this.selectedCustomer = { ...selectedEmployee };
        this.form.patchValue({
          nome: this.selectedCustomer.nome,
          cognome: this.selectedCustomer.cognome,
          cellulare: this.selectedCustomer.cellulare,
          email: this.selectedCustomer.email,
          dataNascita: this.selectedCustomer.dataNascita,
        });
        break;
      case 'ADD':
        break;
      case 'DELETE':
        break;
      default:
        console.error('Azione non supportata');
    }
  }

  setModalTitle() {
    switch (this.modalActionType) {
      case 'EDIT':
        this.modalTitle = 'Modifica Cliente';
        break;
      case 'ADD':
        this.modalTitle = 'Aggiungi Cliente';
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
        this.updateCustomer();
        break;
      case 'ADD':
        this.addNewCustomer();
        break;
      case 'DELETE':
        this.deleteCustomer(this.employeeToDelete);
        break;
      default:
        console.error('Azione non supportata');
    }
    this.closeModal();
  }

  closeModal() {
    this.isOpen = false;
    this.onReset();
  }

  onSubmit() {
    this.submitted = true;

    if (this.modalActionType === 'EDIT' || this.modalActionType === 'ADD') {
      if (this.form.invalid) {
        return;
      }
    }
    this.performAction();
  }

  convertDate(dateString: string) {
    const parts = dateString.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${day}/${month}/${year}`;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  showSuccess(message: string): void {
    this.successMessage = message;
    this.showSuccessAlert = true;
    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 2500);
  }

  closeSuccessAlert(): void {
    this.showSuccessAlert = false;
  }
}
