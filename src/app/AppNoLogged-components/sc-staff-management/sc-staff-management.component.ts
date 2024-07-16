import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmployeesServiceService } from 'src/app/service/employees-service.service';

interface Employee {
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
  displayedColumns: string[] = ['nome', 'cognome', 'ruolo'];
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
  editItem: any = { name: '', quantity: 0 };
  newItem: any = { name: '', quantity: 0 };
  isOpen = false;

  form: FormGroup;
  submitted = false;

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

  public updateEmployee(): void {
    this.isLoading = true;
    if (!this.selectedEmployee) return;

    this.employeeService
      .updateEmployee(
        this.selectedEmployee.id,
        this.selectedEmployee.nome,
        this.selectedEmployee.cognome,
        this.selectedEmployee.ruolo,
        this.selectedEmployee.cellulare
      )
      .subscribe({
        next: (response: any) => {
          alert(response);
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
        alert(response);
      },
      error: (error) => console.error(error),
      complete: () => {
        this.getAllEmployee();
      },
    });
  }

  openEditModal(selectedEmployee: Employee) {
    this.selectedEmployee = { ...selectedEmployee };
    this.modalTitle = 'Modifica Dipendente';
    if (this.modalTitle.startsWith('Modifica') && this.selectedEmployee) {
      this.form.patchValue({
        nome: this.selectedEmployee.nome,
        cognome: this.selectedEmployee.cognome,
        cellulare: this.selectedEmployee.cellulare,
        email: this.selectedEmployee.email,
        dataAssunzione: this.selectedEmployee.dataAssunzione,
        dataScadenzaContratto: this.selectedEmployee.dataScadenzaContratto,
      });
    }
    this.isOpen = true;
  }

  openAddModal() {
    this.modalTitle = 'Aggiungi Dipendente';
    this.isOpen = true;
  }

  openDeleteModal(selectedEmployee: Employee) {
    this.employeeToDelete = selectedEmployee.id;
    this.modalTitle = 'Conferma Eliminazione Dipendente';
    this.isOpen = true;
  }

  saveChanges() {
    //this.updateEmployee();
    this.onSubmit();
  }

  deleteItem() {
    this.deleteEmployee(this.employeeToDelete);
    this.isOpen = false;
  }

  addItem() {
    this.onSubmit();
  }

  closeModal() {
    this.isOpen = false;
    this.onReset();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    if (this.modalTitle.startsWith('Modifica')) {
      // Logica per aggiornare un dipendente esistente
      this.selectedEmployee = {
        ...this.selectedEmployee,
        ...this.form.value,
      };
      this.updateEmployee();
    } else if (this.modalTitle.startsWith('Aggiungi')) {
      // Logica per aggiungere un nuovo dipendente
      const newEmployee: Employee = this.form.value;
      this.employeeService
        .addEmployee(
          newEmployee.nome,
          newEmployee.cognome,
          newEmployee.ruolo
        )
        .subscribe({
          next: (response: any) => {
            alert(response);
            this.getAllEmployee();
          },
          error: (error) => console.error(error),
        });
    }

    this.isOpen = false;
    this.onReset();
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
}
