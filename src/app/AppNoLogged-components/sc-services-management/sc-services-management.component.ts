import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ServiceListModel, ServiceModel } from 'src/app/sc-models/sc-models';
import { ServicesServiceService } from 'src/app/service/services-service.service';

@Component({
  selector: 'app-sc-services-management',
  templateUrl: './sc-services-management.component.html',
  styleUrl: './sc-services-management.component.css'
})
export class ScServicesManagementComponent implements OnInit {
  dataSource: ServiceListModel = [];
  isLoading = false;

  selectedCustomer: ServiceModel = {
    id: 0,
    serviceName: '',
    servicePrice: 0,
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
    private servicesService: ServicesServiceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllServicess();
    this.form = this.formBuilder.group({
      serviceName: ['', Validators.required],
      servicePrice: ['', Validators.required],
    });
    // Se è stata selezionata una riga per la modifica, prepopola il form
  }

  public getAllServicess(): void {
    this.isLoading = true;
    this.servicesService.getAllService().subscribe({
      next: (response: ServiceListModel) => {
        const responseData = response;
        this.dataSource = responseData;
      },
      error: (error) => console.error(error),
      complete: () => {
        this.isLoading = false;
        console.info('complete');
      },
    });
  }

  public addNewService(): void {
    this.isLoading = true;
    const newCustomer: ServiceModel = this.form.value;
    this.servicesService
      .addService(
        newCustomer.serviceName,
        newCustomer.servicePrice,
      )
      .subscribe({
        next: (response: string) => {
          this.showSuccess(response);
        },
        error: (error) => console.error(error),
        complete: () => {
          this.getAllServicess();
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

    this.servicesService
      .updateService(
        this.selectedCustomer.id,
        this.selectedCustomer.serviceName,
        this.selectedCustomer.servicePrice,
      )
      .subscribe({
        next: (response: string) => {
          this.showSuccess(response);
        },
        error: (error) => console.error(error),
        complete: () => {
          this.getAllServicess();
        },
      });
  }

  public deleteService(id: number): void {
    this.isLoading = true;
    this.servicesService.deleteService(id).subscribe({
      next: (response: string) => {
        this.showSuccess(response);
      },
      error: (error) => console.error(error),
      complete: () => {
        this.getAllServicess();
      },
    });
  }

  openModal(actionType: string, selectedEmployee?: ServiceModel) {
    this.modalActionType = actionType;
    if (selectedEmployee) this.employeeToDelete = selectedEmployee.id;
    this.isOpen = true;
    this.setModalTitle();
    this.initializeForm(selectedEmployee);
  }

  initializeForm(selectedEmployee?: ServiceModel) {
    switch (this.modalActionType) {
      case 'EDIT':
        if (selectedEmployee) this.selectedCustomer = { ...selectedEmployee };
        this.form.patchValue({
          serviceName: this.selectedCustomer.serviceName,
          servicePrice: this.selectedCustomer.servicePrice.toFixed(2),
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
        this.modalTitle = 'Modifica Servizio';
        break;
      case 'ADD':
        this.modalTitle = 'Aggiungi Servizio';
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
        this.addNewService();
        break;
      case 'DELETE':
        this.deleteService(this.employeeToDelete);
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
