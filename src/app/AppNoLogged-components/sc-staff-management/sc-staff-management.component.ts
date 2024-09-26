import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmployeeListModel, EmployeeModel } from 'src/app/sc-models/sc-models';
import { EmployeesServiceService } from 'src/app/service/employees-service.service';

@Component({
  selector: 'app-sc-staff-management',
  templateUrl: './sc-staff-management.component.html',
  styleUrls: ['./sc-staff-management.component.css'],
})
export class ScStaffManagementComponent implements OnInit {
  dataSource: EmployeeListModel = [];
  isLoading = false;

  selectedEmployee: EmployeeModel = {
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

  today: string;

  // Variabili per l'alert di successo
  showAlert = false;
  alertMessage = '';
  alertMessageType = '';

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

    const todayDate = new Date();
    const year = todayDate.getFullYear();
    const month = (todayDate.getMonth() + 1).toString().padStart(2, '0');
    const day = todayDate.getDate().toString().padStart(2, '0');
    this.today = `${year}-${month}-${day}`;
  }

  public getAllEmployee() {
    this.isLoading = true;
    this.employeeService.getAllEmployeeAPI().subscribe({
      next: (response: EmployeeListModel) => {
        const responseData = response;
        this.dataSource = responseData;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
        console.info('complete');
      },
    });
  }

  public addNewEmployee(): void {
    this.isLoading = true;
    const newEmployee: EmployeeModel = this.form.value;
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
        next: (response: string) => {
          this.alertMessageType = "SUCCESS";
          this.onShowAlert("Dipendente aggiunto con succeso");
        },
        error: (error) => {
          this.isLoading = false;
          this.alertMessageType = "ERROR";
          this.onShowAlert(error.error);
        },
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
        next: (response: string) => {
          this.alertMessageType = "SUCCESS";
          this.onShowAlert("Dipendente modificato con succeso");
        },
        error: (error) => {
          this.isLoading = false;
          this.alertMessageType = "ERROR";
          this.onShowAlert(error.error);
        },
        complete: () => {
          this.getAllEmployee();
        },
      });
  }

  public deleteEmployee(id: number): void {
    this.isLoading = true;
    this.employeeService.deleteEmployee(id).subscribe({
      next: (response: string) => {
        this.alertMessageType = "SUCCESS";
        this.onShowAlert("Dipendente eliminato con succeso");
      },
      error: (error) => {
        this.isLoading = false;
        this.alertMessageType = "ERROR";
        console.log(error.error);
        this.onShowAlert(error.error);
      },
      complete: () => {
        this.getAllEmployee();
      },
    });
  }

  openModal(actionType: string, selectedEmployee?: EmployeeModel) {
    this.modalActionType = actionType;
    if (selectedEmployee) this.employeeToDelete = selectedEmployee.id;
    this.isOpen = true;
    this.setModalTitle();
    this.initializeForm(selectedEmployee);
  }

  initializeForm(selectedEmployee?: EmployeeModel) {
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

  onShowAlert(message: string): void {
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }
}
