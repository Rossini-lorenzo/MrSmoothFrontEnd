import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmployeesServiceService } from 'src/app/service/employees-service.service';

export interface Employee {
  id: number;
  nome: string;
  cognome: string;
  ruolo: string;
  cellulare: number;
  email: string;
  dataAssunzione: string;
  dataScadenzaContratto: string;
}

@Component({
  selector: 'app-sc-staff-management',
  templateUrl: './sc-staff-management.component.html',
  styleUrls: ['./sc-staff-management.component.css'],
})
export class ScStaffManagementComponent implements OnInit {
  dataSource: Employee[] = [];
  isLoading = false;

  selectedEmployee: Employee = {
    id: 0,
    nome: '',
    cognome: '',
    ruolo: '',
    cellulare: 0,
    email: '',
    dataAssunzione: '',
    dataScadenzaContratto: '',
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
    private employeeService: EmployeesServiceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllEmployee();
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      cellulare: [
        '',
        [Validators.required, Validators.pattern(/(\+39|0039)?3[0-9]{9}/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      dataAssunzione: ['', Validators.required],
      dataScadenzaContratto: ['', Validators.required],
    });
    // Se è stata selezionata una riga per la modifica, prepopola il form
  }

  public getAllEmployee(): void {
    this.isLoading = true;
    this.employeeService.getAllEmployee().subscribe({
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

  public addNewEmployee(): void {
    this.isLoading = true;
    const newEmployee: Employee = this.form.value;
    this.employeeService
      .addEmployee(
        newEmployee.nome,
        newEmployee.cognome,
        newEmployee.email,
        newEmployee.cellulare,
        newEmployee.dataScadenzaContratto,
        newEmployee.dataAssunzione
      )
      .subscribe({
        next: (response: any) => {
          this.showSuccess(response);
        },
        error: (error) => console.error(error),
        complete: () => {
          this.getAllEmployee();
        },
      });
  }

  public updateEmployee(): void {
    this.isLoading = true;
    this.selectedEmployee = {
      ...this.selectedEmployee,
      ...this.form.value,
    };
    if (!this.selectedEmployee) return;

    this.employeeService
      .updateEmployee(
        this.selectedEmployee.id,
        this.selectedEmployee.nome,
        this.selectedEmployee.cognome,
        this.selectedEmployee.email,
        this.selectedEmployee.cellulare,
        this.selectedEmployee.dataScadenzaContratto,
        this.selectedEmployee.dataAssunzione
      )
      .subscribe({
        next: (response: any) => {
          this.showSuccess(response);
        },
        error: (error) => console.error(error),
        complete: () => {
          this.getAllEmployee();
        },
      });
  }

  public deleteEmployee(id: number): void {
    this.isLoading = true;
    this.employeeService.deleteEmployee(id).subscribe({
      next: (response: any) => {
        this.showSuccess(response);
      },
      error: (error) => console.error(error),
      complete: () => {
        this.getAllEmployee();
      },
    });
  }

  openModal(actionType: string, selectedEmployee?: Employee) {
    this.modalActionType = actionType;
    if (selectedEmployee) this.employeeToDelete = selectedEmployee.id;
    this.isOpen = true;
    this.setModalTitle();
    this.initializeForm(selectedEmployee);
  }

  initializeForm(selectedEmployee?: Employee) {
    switch (this.modalActionType) {
      case 'EDIT':
        if (selectedEmployee) this.selectedEmployee = { ...selectedEmployee };
        this.form.patchValue({
          nome: this.selectedEmployee.nome,
          cognome: this.selectedEmployee.cognome,
          cellulare: this.selectedEmployee.cellulare,
          email: this.selectedEmployee.email,
          dataAssunzione: this.selectedEmployee.dataAssunzione,
          dataScadenzaContratto: this.selectedEmployee.dataScadenzaContratto,
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
        this.modalTitle = 'Modifica Dipendente';
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
        this.updateEmployee();
        break;
      case 'ADD':
        this.addNewEmployee();
        break;
      case 'DELETE':
        this.deleteEmployee(this.employeeToDelete);
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
    }, 3000);
  }

  closeSuccessAlert(): void {
    this.showSuccessAlert = false;
  }
}
